"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AboutSectionEyebrow } from "@/components/about/AboutSectionEyebrow";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type AboutStoryPanelsProps = {
	principle: {
		body: string;
		quote: string;
	};
	spark: {
		body: string;
		eyebrow?: string;
		title: string;
	};
};

export function AboutStoryPanels({ principle, spark }: AboutStoryPanelsProps) {
	const section = useRef<HTMLElement>(null);
	const stage = useRef<HTMLDivElement>(null);
	const sparkBody = useRef<HTMLParagraphElement>(null);
	const principleBody = useRef<HTMLParagraphElement>(null);

	useGSAP(() => {
		const media = gsap.matchMedia();

		media.add("(min-width: 981px) and (prefers-reduced-motion: no-preference)", () => {
			gsap.set([sparkBody.current, principleBody.current], {
				transformOrigin: "left top",
				willChange: "transform",
			});

			gsap.timeline({
				scrollTrigger: {
					trigger: section.current,
					start: "top top",
					end: "bottom bottom",
					invalidateOnRefresh: true,
					scrub: 1.2,
				},
			})
				.to(stage.current, {
					duration: 1,
					ease: "none",
					gridTemplateColumns: "42fr 58fr",
				}, 0)
				.to(sparkBody.current, {
					duration: 1,
					ease: "none",
					scale: 0.86,
				}, 0)
				.fromTo(principleBody.current, {
					scale: 0.82,
				}, {
					duration: 1,
					ease: "none",
					scale: 1,
				}, 0);
		});

		return () => media.revert();
	}, { scope: section });

	return (
		<section className="about-story" ref={section}>
			<div className="about-story__stage" ref={stage}>
				<article className="about-story__spark">
					<div className="about-story__scratch-blocks" aria-hidden="true">
						<span>when clicked</span>
						<span>forever</span>
						<span>create something</span>
					</div>
					<div>
						{spark.eyebrow ? <AboutSectionEyebrow>{spark.eyebrow}</AboutSectionEyebrow> : null}
						<h2>{spark.title}</h2>
						<p ref={sparkBody}>{spark.body}</p>
					</div>
				</article>

				<aside className="about-story__principle">
					<p className="section-index">A principle I carry</p>
					<blockquote>“{principle.quote}”</blockquote>
					<p ref={principleBody}>{principle.body}</p>
				</aside>
			</div>
		</section>
	);
}
