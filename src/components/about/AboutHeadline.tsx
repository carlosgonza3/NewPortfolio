"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

type AboutHeadlineProps = {
	title: string;
};

export function AboutHeadline({ title }: AboutHeadlineProps) {
	const headline = useRef<HTMLHeadingElement>(null);
	const curiousWord = useRef<HTMLSpanElement>(null);
	const curiousText = useRef<HTMLSpanElement>(null);
	const typingCaret = useRef<HTMLElement>(null);
	const intentionalText = useRef<HTMLSpanElement>(null);
	const words = title.split(" ");
	const curious = words[0] ?? "";
	const optimistic = words[1] ?? "";
	const intentional = words.slice(2).join(" ");

	useGSAP(() => {
		const optimisticLetters = gsap.utils.toArray<HTMLElement>(".about-hero__optimistic-letter");
		const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		if (reducedMotion) {
			gsap.set(curiousText.current, { clearProps: "clipPath" });
			gsap.set(typingCaret.current, { display: "none" });
			gsap.set(optimisticLetters, { clearProps: "transform" });
			gsap.set(intentionalText.current, { clearProps: "backgroundPosition" });
			return;
		}

		const typingDuration = 1.05;
		const timeline = gsap.timeline({
			repeat: -1,
			repeatDelay: 0.9,
		});

		timeline
			.set(curiousText.current, { clipPath: "inset(0 0% 0 0)" })
			.set(typingCaret.current, { display: "none", opacity: 0, x: 0 })
			.set(optimisticLetters, { yPercent: 0 })
			.set(intentionalText.current, { backgroundPosition: "100% 50%" })
			.to(optimisticLetters, {
				duration: 0.4,
				ease: "power2.out",
				stagger: 0.045,
				yPercent: -11,
			})
			.to(optimisticLetters, {
				duration: 0.62,
				ease: "elastic.out(1, 0.45)",
				stagger: 0.035,
				yPercent: 0,
			}, "-=0.18")
			.to({}, { duration: 0.35 })
			.set(typingCaret.current, {
				display: "block",
				opacity: 1,
				x: curiousWord.current?.offsetWidth ?? 0,
			})
			.to(curiousText.current, {
				clipPath: "inset(0 100% 0 0)",
				duration: 0.62,
				ease: `steps(${Math.max(curious.length, 1)})`,
			})
			.to(typingCaret.current, {
				duration: 0.62,
				ease: `steps(${Math.max(curious.length, 1)})`,
				x: 0,
			}, "<")
			.to({}, { duration: 0.15 })
			.to(curiousText.current, {
				clipPath: "inset(0 0% 0 0)",
				duration: typingDuration,
				ease: `steps(${Math.max(curious.length, 1)})`,
			})
			.to(typingCaret.current, {
				duration: typingDuration,
				ease: `steps(${Math.max(curious.length, 1)})`,
				x: curiousWord.current?.offsetWidth ?? 0,
			}, "<")
			.to(typingCaret.current, { duration: 0.22, opacity: 0 })
			.to({}, { duration: 0.4 })
			.to(intentionalText.current, {
				backgroundPosition: "0% 50%",
				duration: 1.9,
				ease: "sine.inOut",
			})
			.to({}, { duration: 0.65 })
			.to(intentionalText.current, {
				backgroundPosition: "100% 50%",
				duration: 1.9,
				ease: "sine.inOut",
			})
			.to({}, { duration: 1 });
	}, { scope: headline, dependencies: [title], revertOnUpdate: true });

	return (
		<h1 aria-label={title} ref={headline}>
			<span className="about-hero__headline-word about-hero__headline-word--curious" ref={curiousWord} aria-hidden="true">
				<span className="about-hero__curious-text" ref={curiousText}>{curious}</span>
				<i className="about-hero__typing-caret" ref={typingCaret} />
			</span>
			<span className="about-hero__headline-word about-hero__headline-word--optimistic" aria-hidden="true">
				{Array.from(optimistic).map((letter, index) => (
					<span className="about-hero__optimistic-letter" key={`${letter}-${index}`}>{letter}</span>
				))}
			</span>
			<span className="about-hero__headline-word about-hero__headline-word--intentional" aria-hidden="true">
				<span className="about-hero__intentional-text" ref={intentionalText}>{intentional}</span>
			</span>
		</h1>
	);
}
