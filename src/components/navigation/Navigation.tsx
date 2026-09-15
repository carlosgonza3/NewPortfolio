import Link from "next/link";
import { ThemeToggle } from "@/components/navigation/ThemeToggle";

export function Navigation() {
	return (
		<header className="site-nav">
			<Link className="wordmark" href="/" aria-label="Carlos Gonzalez, home">
				CG<span>.</span>
			</Link>
			<nav aria-label="Main navigation">
				<Link href="/#work">Work</Link>
				<Link href="/knowledge">Knowledge</Link>
				<Link href="/#about">About</Link>
			</nav>
			<div className="nav-tools">
				<a className="nav-contact" href="mailto:hello@carlosgonzalez.dev">
					Let&apos;s talk <span aria-hidden="true">↗</span>
				</a>
				<ThemeToggle />
			</div>
		</header>
	);
}
