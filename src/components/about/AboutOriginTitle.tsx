"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type AboutOriginTitleProps = {
	title: string;
};

export function AboutOriginTitle({ title }: AboutOriginTitleProps) {
	const heading = useRef<HTMLHeadingElement>(null);
	const openingPhrase = useRef<HTMLSpanElement>(null);
	const emphasisPhrase = useRef<HTMLSpanElement>(null);
	const sentences = title.match(/[^.!?]+[.!?]?/g)?.map((sentence) => sentence.trim()).filter(Boolean) ?? [title];
	const [firstSentence = "", secondSentence = ""] = sentences;
	const [firstWord = "", ...firstRemainder] = firstSentence.split(/\s+/);
	const [secondWord = "", ...secondRemainder] = secondSentence.split(/\s+/);

	useGSAP(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

		const timeline = gsap.timeline({
			scrollTrigger: {
				trigger: heading.current,
				start: "clamp(top 90%)",
				end: "clamp(bottom 20%)",
				invalidateOnRefresh: true,
				scrub: 0.7,
			},
		});

		const animatedPhrases = [openingPhrase.current, emphasisPhrase.current].filter(
			(phrase): phrase is HTMLSpanElement => phrase !== null,
		);
		const travelDistance = () => window.innerWidth <= 720 ? 6 : 10;

		gsap.set(animatedPhrases, { willChange: "transform" });

		if (openingPhrase.current) {
			timeline.fromTo(
				openingPhrase.current,
				{ x: () => -travelDistance() },
				{ x: () => travelDistance(), ease: "none" },
			);
		}

		if (emphasisPhrase.current) {
			timeline.fromTo(
				emphasisPhrase.current,
				{ x: () => travelDistance() },
				{ x: () => -travelDistance(), ease: "none" },
			);
		}
	}, { dependencies: [title], revertOnUpdate: true, scope: heading });

	return (
		<h2 className="about-origin__title" data-about-reveal-content aria-label={title} ref={heading}>
			<span className="about-origin__title-line" aria-hidden="true">
				<span className="about-origin__title-motion" ref={openingPhrase}>
					<span className="about-origin__title-word about-origin__title-word--opening">{firstWord}</span>
					<span className="about-origin__title-word">{firstRemainder.join(" ")}</span>
				</span>
			</span>
			{secondSentence ? (
				<span className="about-origin__title-line about-origin__title-line--emphasis" aria-hidden="true">
					<span className="about-origin__title-motion" ref={emphasisPhrase}>
						<span className="about-origin__title-word about-origin__title-word--emphasis">{secondWord}</span>
						<span className="about-origin__title-word">{secondRemainder.join(" ")}</span>
					</span>
				</span>
			) : null}
		</h2>
	);
}
