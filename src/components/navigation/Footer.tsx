import Link from "next/link";

export function Footer() {
	return (
		<footer className="site-footer">
			<div>
				<p className="eyebrow">Have a problem worth solving?</p>
				<a className="footer-cta" href="mailto:hello@carlosgonzalez.dev">
					Let&apos;s build something <span aria-hidden="true">↗</span>
				</a>
			</div>
			<div className="footer-bottom">
				<p>© {new Date().getFullYear()} Carlos Gonzalez</p>
				<div>
					<a href="https://github.com" rel="noreferrer" target="_blank">GitHub</a>
					<a href="https://linkedin.com" rel="noreferrer" target="_blank">LinkedIn</a>
					<Link href="/knowledge">Knowledge system</Link>
				</div>
			</div>
		</footer>
	);
}
