<nav class="top-nav">
	<a class="brand" href="https://popupbits.com"> PopupBits </a>
	<ul>
		<li>
			<a href="/">Home</a>
		</li>
		<li>
			<a href="/about">About</a>
		</li>
		<li>
			<a href="/projects">Projects</a>
		</li>
		<li>
			<a href="/contact">Contact</a>
		</li>
	</ul>
</nav>

<style lang="scss">
    nav {
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
        }
        ul {
            list-style: none;
            margin: 0;
            padding: 0;
            li {
                display: inline-block;
                a {
                    display: inline-block;
                    padding: 8px 16px;
                }
            }
        }
    }
</style>
