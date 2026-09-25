"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type AboutOriginCopyProps = {
	paragraphs: ReadonlyArray<string>;
};

export function AboutOriginCopy({ paragraphs }: AboutOriginCopyProps) {
	const copy = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

		const paragraphElements = gsap.utils.toArray<HTMLParagraphElement>("p", copy.current);
		const travelDistance = () => window.innerWidth <= 720 ? 18 : 36;
		const timeline = gsap.timeline({
			scrollTrigger: {
				trigger: copy.current,
				start: "clamp(top 90%)",
				end: "clamp(bottom 20%)",
				invalidateOnRefresh: true,
				scrub: 0.7,
			},
		});

		paragraphElements.forEach((paragraph, index) => {
			const movesDown = index % 2 === 0;

			timeline.fromTo(
				paragraph,
				{ y: () => movesDown ? -travelDistance() : travelDistance() },
				{ y: () => movesDown ? travelDistance() : -travelDistance(), ease: "none" },
				0,
			);
		});
	}, { dependencies: [paragraphs.length], revertOnUpdate: true, scope: copy });

	return (
		<div className="about-origin__copy" data-about-reveal-content ref={copy}>
			{paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
		</div>
	);
}
