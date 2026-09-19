"use client";

import Link from "next/link";
import { IdCard } from "lucide-react";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/navigation/ThemeToggle";

export function Navigation() {
	const navigationRef = useRef<HTMLElement>(null);
	const wordmarkMenuRef = useRef<HTMLDivElement>(null);
	const pathname = usePathname();
	const [isWordmarkMenuOpen, setIsWordmarkMenuOpen] = useState(false);
	const activeNavigation = pathname === "/knowledge" ? "knowledge" : pathname === "/" ? "work" : null;

	useEffect(() => {
		const navigation = navigationRef.current;
		if (!navigation) return;

		let previousScrollY = Math.max(0, window.scrollY);
		let animationFrame: number | null = null;

		const updateNavigation = () => {
			const currentScrollY = Math.max(0, window.scrollY);
			const scrollDelta = currentScrollY - previousScrollY;
			const isNearTop = currentScrollY <= 24;

			navigation.classList.toggle("is-scrolled", !isNearTop);
			if (isNearTop || scrollDelta < -2) navigation.classList.remove("is-hidden");
			if (!isNearTop && scrollDelta > 3) navigation.classList.add("is-hidden");

			previousScrollY = currentScrollY;
			animationFrame = null;
		};

		const handleScroll = () => {
			if (animationFrame !== null) return;
			animationFrame = window.requestAnimationFrame(updateNavigation);
		};

		updateNavigation();
		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => {
			window.removeEventListener("scroll", handleScroll);
			if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
		};
	}, [pathname]);

	useEffect(() => {
		if (!isWordmarkMenuOpen) return;

		const closeOnOutsidePress = (event: PointerEvent) => {
			if (!wordmarkMenuRef.current?.contains(event.target as Node)) setIsWordmarkMenuOpen(false);
		};
		const closeOnEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") setIsWordmarkMenuOpen(false);
		};

		document.addEventListener("pointerdown", closeOnOutsidePress);
		window.addEventListener("keydown", closeOnEscape);
		return () => {
			document.removeEventListener("pointerdown", closeOnOutsidePress);
			window.removeEventListener("keydown", closeOnEscape);
		};
	}, [isWordmarkMenuOpen]);

	const handleHomeClick = (event: MouseEvent<HTMLAnchorElement>) => {
		setIsWordmarkMenuOpen(false);
		if (pathname !== "/") return;

		event.preventDefault();
		window.scrollTo({
			behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
			top: 0,
		});
	};

	const handlePrimaryNavigation = () => {
		setIsWordmarkMenuOpen(false);
	};

	return (
		<header className={`site-nav${isWordmarkMenuOpen ? " has-open-wordmark" : ""}`} ref={navigationRef}>
			<div className={`wordmark-menu${isWordmarkMenuOpen ? " is-open" : ""}`} ref={wordmarkMenuRef}>
				<button
					aria-controls="wordmark-site-menu"
					aria-expanded={isWordmarkMenuOpen}
					aria-label={isWordmarkMenuOpen ? "Close site menu" : "Open site menu"}
					className="wordmark"
					onClick={() => setIsWordmarkMenuOpen((current) => !current)}
					type="button"
				>
					<span className="wordmark__mark">CG<span>.</span></span>
				</button>
				<nav className={`wordmark-menu__panel${isWordmarkMenuOpen ? " is-open" : ""}`} id="wordmark-site-menu" aria-label="Site menu">
					<Link className="wordmark-menu__desktop-link" href="/" onClick={handleHomeClick}>Home</Link>
					<Link className="wordmark-menu__mobile-link" href="/" onClick={handleHomeClick}>Work</Link>
					<Link
						aria-current={pathname === "/knowledge" ? "page" : undefined}
						className="wordmark-menu__mobile-link"
						href="/knowledge"
						onClick={handlePrimaryNavigation}
						scroll={false}
					>
						Knowledge
					</Link>
					<Link href="/about" aria-current={pathname === "/about" ? "page" : undefined} onClick={handlePrimaryNavigation}>About</Link>
				</nav>
			</div>
			<nav className="nav-pill" aria-label="Main navigation">
				<Link href="/" aria-current={activeNavigation === "work" ? "page" : undefined} onClick={handleHomeClick} scroll>Work</Link>
				<Link href="/knowledge" aria-current={activeNavigation === "knowledge" ? "page" : undefined} onClick={handlePrimaryNavigation} scroll={false}>Knowledge</Link>
			</nav>
			<div className="nav-tools">
				<a className="nav-contact" href="mailto:hello@carlosgonzalez.dev" aria-label="Let's talk">
					<span className="nav-contact__label nav-contact__label--idle" aria-hidden="true">Questions?</span>
					<span className="nav-contact__label nav-contact__label--active" aria-hidden="true">Let&apos;s talk</span>
					<span className="nav-contact__icon" aria-hidden="true"><IdCard size={20} strokeWidth={1.7} /></span>
				</a>
				<ThemeToggle />
			</div>
		</header>
	);
}
