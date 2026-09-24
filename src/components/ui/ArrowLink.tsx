import Link from "next/link";
import styles from "./ArrowLink.module.css";

interface ArrowLinkProps {
	href: string;
	children: React.ReactNode;
	inverse?: boolean;
}

export function ArrowLink({ href, children, inverse = false }: ArrowLinkProps) {
	return (
		<Link className={`${styles.link}${inverse ? ` ${styles.inverse}` : ""}`} href={href}>
			<span>{children}</span>
			<span className={styles.icon} aria-hidden="true">↗</span>
		</Link>
	);
}
