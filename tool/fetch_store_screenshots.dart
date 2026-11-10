// Refreshes the store screenshots shown on /products/<slug>.
//
// Store screenshot URLs are content hashes that change whenever a listing's
// images are replaced, so the site keeps its own copies under
// static/products/<slug>/ and this script re-downloads them from the current
// listings. Run it after updating an app's store screenshots, then check the
// counts it prints against the alt-text lists in src/lib/data/product-pages.ts.
//
//   dart run tool/fetch_store_screenshots.dart            # every product
//   dart run tool/fetch_store_screenshots.dart photoready # one or more slugs
//
// Which apps to fetch comes from the Google Play and App Store links in
// src/lib/data/products.ts, so there is nothing to keep in sync here.
// Images are written as play-NN.webp and appstore-NN.webp, in listing order,
// scaled to 1600 px tall (portrait) or 1200 px wide (landscape). Scaling uses
// cwebp when it is on the PATH; without it the stores' own renditions are
// saved, which are larger files.
import 'dart:convert';
import 'dart:io';

const productsFile = 'src/lib/data/products.ts';
const staticDir = 'static/products';
const userAgent =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';

class App {
  final String slug;
  String? playId;
  String? appStoreId;
  String appStoreCountry = 'us';
  App(this.slug);
}

/// Reads each product's slug and store ids from products.ts.
List<App> readApps(String source) {
  final apps = <App>[];
  App? current;
  for (final line in source.split('\n')) {
    final slug = RegExp(r"^\s*slug: '([^']+)'").firstMatch(line);
    if (slug != null) {
      current = App(slug.group(1)!);
      apps.add(current);
      continue;
    }
    if (current == null) continue;
    final play = RegExp(r'play\.google\.com/store/apps/details\?id=([\w.]+)').firstMatch(line);
    if (play != null) current.playId = play.group(1);
    final apple = RegExp(r'apps\.apple\.com/(\w\w)/app/[^/]+/id(\d+)').firstMatch(line);
    if (apple != null) {
      current.appStoreCountry = apple.group(1)!;
      current.appStoreId = apple.group(2);
    }
  }
  return apps.where((a) => a.playId != null || a.appStoreId != null).toList();
}

final client = HttpClient()..userAgent = userAgent;

Future<HttpClientResponse> get(String url) async {
  final request = await client.getUrl(Uri.parse(url));
  return request.close();
}

Future<String?> getText(String url) async {
  final response = await get(url);
  if (response.statusCode != 200) {
    await response.drain<void>();
    return null;
  }
  return response.transform(utf8.decoder).join();
}

Future<bool> saveImage(String url, File to) async {
  final response = await get(url);
  if (response.statusCode != 200) {
    await response.drain<void>();
    stderr.writeln('  ! ${response.statusCode} for $url');
    return false;
  }
  await to.parent.create(recursive: true);
  await response.pipe(to.openWrite());
  return true;
}

bool? _haveCwebp;
Future<bool> haveCwebp() async {
  if (_haveCwebp != null) return _haveCwebp!;
  try {
    final result = await Process.run('cwebp', ['-version']);
    _haveCwebp = result.exitCode == 0;
  } on ProcessException {
    _haveCwebp = false;
  }
  if (!_haveCwebp!) {
    stderr.writeln('cwebp not found: saving the stores\' own renditions, which are larger.');
  }
  return _haveCwebp!;
}

/// Scales a downloaded image in place: portrait to 1600 px tall, landscape to
/// 1200 px wide. Portrait is decided from the file name's source rendition,
/// so the caller passes whether the image is portrait.
Future<void> scale(File file, {required bool portrait}) async {
  if (!await haveCwebp()) return;
  final tmp = File('${file.path}.tmp');
  final args = ['-quiet', '-q', '82', '-resize', ...(portrait ? ['0', '1600'] : ['1200', '0'])];
  final result = await Process.run('cwebp', [...args, file.path, '-o', tmp.path]);
  if (result.exitCode != 0) {
    stderr.writeln('  ! cwebp failed for ${file.path}: ${result.stderr}');
    if (tmp.existsSync()) tmp.deleteSync();
    return;
  }
  tmp.renameSync(file.path);
}

/// Reads the pixel size of a WebP file's header (VP8, VP8L or VP8X).
({int width, int height})? webpSize(File file) {
  final b = file.readAsBytesSync();
  if (b.length < 30 || String.fromCharCodes(b.sublist(8, 12)) != 'WEBP') return null;
  final chunk = String.fromCharCodes(b.sublist(12, 16));
  if (chunk == 'VP8X') {
    return (
      width: 1 + (b[24] | b[25] << 8 | b[26] << 16),
      height: 1 + (b[27] | b[28] << 8 | b[29] << 16)
    );
  }
  if (chunk == 'VP8 ') {
    return (width: (b[26] | b[27] << 8) & 0x3fff, height: (b[28] | b[29] << 8) & 0x3fff);
  }
  if (chunk == 'VP8L') {
    final bits = b[21] | b[22] << 8 | b[23] << 16 | b[24] << 24;
    return (width: 1 + (bits & 0x3fff), height: 1 + ((bits >> 14) & 0x3fff));
  }
  return null;
}

Future<void> clearOld(Directory dir, String prefix) async {
  if (!dir.existsSync()) return;
  for (final f in dir.listSync().whereType<File>()) {
    final name = f.uri.pathSegments.last;
    if (name.startsWith('$prefix-') && name.endsWith('.webp')) f.deleteSync();
  }
}

Future<int> fetchPlay(App app, Directory dir) async {
  final html = await getText(
      'https://play.google.com/store/apps/details?id=${app.playId}&hl=en&gl=US');
  if (html == null) {
    stdout.writeln('  play: listing not found (not published yet?)');
    return 0;
  }
  // The listing's screenshot carousel renders each image at w526-h296; the
  // bare URL before "=" is the image, which any size can be requested from.
  final bases = <String>[];
  for (final m in RegExp(r'https://play-lh\.googleusercontent\.com/[\w-]+=w526-h296-rw')
      .allMatches(html)) {
    final base = m.group(0)!.split('=').first;
    if (!bases.contains(base)) bases.add(base);
  }
  await clearOld(dir, 'play');
  var n = 0;
  for (final base in bases) {
    n++;
    final file = File('${dir.path}/play-${n.toString().padLeft(2, '0')}.webp');
    if (!await saveImage('$base=w1080-h2400-rw', file)) continue;
    final size = webpSize(file);
    await scale(file, portrait: size == null || size.height > size.width);
  }
  return n;
}

Future<int> fetchAppStore(App app, Directory dir) async {
  final json = await getText(
      'https://itunes.apple.com/lookup?id=${app.appStoreId}&country=${app.appStoreCountry}');
  final results = json == null ? const [] : (jsonDecode(json)['results'] as List);
  if (results.isEmpty) {
    stdout.writeln('  appstore: lookup returned nothing for id ${app.appStoreId} '
        '(${app.appStoreCountry} storefront)');
    return 0;
  }
  final urls = (results.first['screenshotUrls'] as List).cast<String>();
  // The lookup lists every display size; the file name before the size is the
  // same image, so keep the first of each.
  final seen = <String>{};
  await clearOld(dir, 'appstore');
  var n = 0;
  for (final url in urls) {
    final parts = url.split('/');
    final name = parts[parts.length - 2];
    if (!seen.add(name)) continue;
    n++;
    final base = parts.sublist(0, parts.length - 1).join('/');
    final file = File('${dir.path}/appstore-${n.toString().padLeft(2, '0')}.webp');
    if (!await saveImage('$base/1284x2778bb.webp', file)) continue;
    final size = webpSize(file);
    await scale(file, portrait: size == null || size.height > size.width);
  }
  return n;
}

Future<void> main(List<String> args) async {
  final products = File(productsFile);
  if (!products.existsSync()) {
    stderr.writeln('Run from the repository root: $productsFile not found.');
    exit(2);
  }
  var apps = readApps(products.readAsStringSync());
  if (args.isNotEmpty) {
    apps = apps.where((a) => args.contains(a.slug)).toList();
    final unknown = args.where((s) => !apps.any((a) => a.slug == s));
    if (unknown.isNotEmpty) stderr.writeln('No store links for: ${unknown.join(', ')}');
  }
  final summary = <String>[];
  for (final app in apps) {
    stdout.writeln('== ${app.slug}');
    final dir = Directory('$staticDir/${app.slug}');
    if (app.playId != null) {
      final n = await fetchPlay(app, dir);
      if (n > 0) summary.add('${app.slug} play $n');
      stdout.writeln('  play: $n screenshots');
    }
    if (app.appStoreId != null) {
      final n = await fetchAppStore(app, dir);
      if (n > 0) summary.add('${app.slug} appstore $n');
      stdout.writeln('  appstore: $n screenshots');
    }
  }
  client.close();
  stdout
    ..writeln()
    ..writeln('Sets written (slug, store, count). Check each against the alt-text list')
    ..writeln('for that set in src/lib/data/product-pages.ts:');
  summary.forEach(stdout.writeln);
}
