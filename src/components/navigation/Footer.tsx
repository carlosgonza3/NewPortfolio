import Link from "next/link";
import styles from "./Footer.module.css";

export function Footer() {
	return (
		<footer className={styles.footer}>
			<div>
				<p className="eyebrow">Have a problem worth solving?</p>
				<a className={styles.cta} href="mailto:hello@carlosgonzalez.dev">
					Let&apos;s build something <span aria-hidden="true">↗</span>
				</a>
			</div>
			<div className={styles.bottom}>
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
