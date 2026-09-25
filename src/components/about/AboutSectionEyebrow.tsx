"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type AboutSectionEyebrowProps = {
	children: string;
};

export function AboutSectionEyebrow({ children }: AboutSectionEyebrowProps) {
	const eyebrow = useRef<HTMLParagraphElement>(null);
	const text = useRef<HTMLSpanElement>(null);
	const caret = useRef<HTMLElement>(null);

	useGSAP(() => {
		const section = eyebrow.current?.closest<HTMLElement>("[data-about-reveal-section]");
		if (!section) return;

		const content = gsap.utils.toArray<HTMLElement>(section.querySelectorAll("[data-about-reveal-content]"));
		const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		if (reducedMotion) {
			gsap.set(text.current, { clipPath: "none" });
			gsap.set(caret.current, { display: "none" });
			gsap.set(content, { autoAlpha: 1, y: 0 });
			return;
		}

		const characterCount = Math.max(children.length, 1);
		const writingDuration = gsap.utils.clamp(0.42, 0.72, characterCount * 0.035);
		const timeline = gsap.timeline({
			scrollTrigger: {
				trigger: section,
				start: "clamp(top 78%)",
				invalidateOnRefresh: true,
				once: true,
			},
		});

		timeline
			.set(text.current, { clipPath: "inset(0 100% 0 0)" })
			.set(caret.current, { display: "block", opacity: 1, x: 0 })
			.set(content, { autoAlpha: 0, y: 16 })
			.to(text.current, {
				clipPath: "inset(0 0% 0 0)",
				duration: writingDuration,
				ease: `steps(${characterCount})`,
			})
			.to(caret.current, {
				duration: writingDuration,
				ease: `steps(${characterCount})`,
				x: () => text.current?.offsetWidth ?? 0,
			}, "<")
			.to(caret.current, { duration: 0.12, opacity: 0 })
			.to(content, {
				autoAlpha: 1,
				duration: 0.48,
				ease: "power2.out",
				stagger: 0.055,
				y: 0,
			}, "-=0.02");
	}, { dependencies: [children], revertOnUpdate: true, scope: eyebrow });

	return (
		<p className="eyebrow about-section-eyebrow" ref={eyebrow}>
			<span className="about-section-eyebrow__text" ref={text}>{children}</span>
			<i className="about-section-eyebrow__caret" ref={caret} aria-hidden="true" />
		</p>
	);
}
