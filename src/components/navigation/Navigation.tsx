"use client";

import Link from "next/link";
import { IdCard } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import type { MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/navigation/ThemeToggle";

type ActiveNavigation = "work" | "knowledge" | "about";

export function Navigation() {
	const navigationRef = useRef<HTMLElement>(null);
	const returnTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const pathname = usePathname();
	const router = useRouter();
	const [activeNavigation, setActiveNavigation] = useState<ActiveNavigation>(pathname === "/knowledge" ? "knowledge" : "work");

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

			if (pathname === "/knowledge") {
				setActiveNavigation("knowledge");
			} else if (pathname === "/") {
				const about = document.querySelector<HTMLElement>("#about");
				setActiveNavigation(about && about.getBoundingClientRect().top <= window.innerHeight * 0.45 ? "about" : "work");
			} else {
				setActiveNavigation("work");
			}

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
			if (returnTimerRef.current) clearTimeout(returnTimerRef.current);
		};
	}, [pathname]);

	const handleWordmarkClick = (event: MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault();
		const wordmark = event.currentTarget;
		wordmark.classList.remove("is-returning-home");
		void wordmark.offsetWidth;
		wordmark.classList.add("is-returning-home");

		if (returnTimerRef.current) clearTimeout(returnTimerRef.current);
		const reloadDelay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 260;
		returnTimerRef.current = setTimeout(() => {
			if (pathname === "/") {
				window.location.reload();
				return;
			}

			router.push("/", { scroll: true });
		}, reloadDelay);
	};

	return (
		<header className="site-nav" ref={navigationRef}>
			<Link
				className="wordmark"
				href="/"
				aria-label={pathname === "/" ? "Reload the homepage" : "Go to the homepage"}
				onClick={handleWordmarkClick}
			>
				<span className="wordmark__mark">CG<span>.</span></span>
			</Link>
			<nav className="nav-pill" aria-label="Main navigation">
				<Link href="/#work" aria-current={activeNavigation === "work" ? "page" : undefined}>Work</Link>
				<Link href="/knowledge" aria-current={activeNavigation === "knowledge" ? "page" : undefined}>Knowledge</Link>
				<Link href="/#about" aria-current={activeNavigation === "about" ? "page" : undefined}>About</Link>
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
