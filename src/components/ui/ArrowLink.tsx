import Link from "next/link";

interface ArrowLinkProps {
	href: string;
	children: React.ReactNode;
	inverse?: boolean;
}

export function ArrowLink({ href, children, inverse = false }: ArrowLinkProps) {
	return (
		<Link className={`arrow-link${inverse ? " arrow-link--inverse" : ""}`} href={href}>
			<span>{children}</span>
			<span className="arrow-link__icon" aria-hidden="true">↗</span>
		</Link>
	);
}
