<script lang="ts">
    import { page } from '$app/stores';
	import { beforeUpdate } from 'svelte';
    let path: string = '';

    beforeUpdate(()=>{
        path = $page.url.pathname;
    })
</script>
<nav class="top-nav">
	<a class="brand" href="https://popupbits.com"> PopupBits </a>
	<ul>
		<li>
			<a href="/" class:active={path == '/'}>Home</a>
		</li>
		<li>
			<a href="/about" class:active={path == '/about'}>About</a>
		</li>
		<li>
			<a href="/projects" class:active={path.includes('/projects')}>Projects</a>
		</li>
		<li>
			<a href="/contact" class:active={path == '/contact'}>Contact</a>
		</li>
	</ul>
</nav>

<style lang="scss">
    nav {
        font-family: 'Montserrat', sans-serif;
        font-size: 0.8rem;
        font-weight: 600;
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: 48px;
        padding-left: 24px;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background-color: var(--paper);
        
        .brand {
            color: var(--primary);
            font-weight: bold;
            font-size: 18px;
        }
        a {
            text-decoration: none;
            color: var(--secondary);
            &:hover {
                color: var(--ink);
                text-decoration: underline;
            }
            &.active {
                color: var(--inkdark);
            }
        }
        ul {
            list-style: none;
            margin: 0;
            padding: 0;
            li {
                text-transform: uppercase;
                display: inline-block;
                a {
                    display: inline-block;
                    padding: 8px 16px;
                }
            }
        }
    }
</style>
