"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ThemeToggle } from "@/components/navigation/ThemeToggle";

export function Navigation() {
	const navigationRef = useRef<HTMLElement>(null);

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
	}, []);

	return (
		<header className="site-nav" ref={navigationRef}>
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
