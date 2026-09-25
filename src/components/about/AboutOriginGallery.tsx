"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import type { AboutOriginPhoto } from "@/data/profile";
import { assetPath } from "@/lib/asset-path";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type AboutOriginGalleryProps = {
	photos: ReadonlyArray<AboutOriginPhoto>;
};

export function AboutOriginGallery({ photos }: AboutOriginGalleryProps) {
	const gallery = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
				return;
			}

			const cards = gsap.utils.toArray<HTMLElement>(".about-origin__photo", gallery.current);
			const travelDistance = () => window.innerWidth <= 720 ? 34 : 76;
			const timeline = gsap.timeline({
				scrollTrigger: {
					trigger: gallery.current,
					start: "clamp(top bottom)",
					end: "clamp(bottom top)",
					scrub: 0.8,
					invalidateOnRefresh: true,
				},
			});

			gsap.set(cards, { willChange: "transform" });

			cards.forEach((card, index) => {
				const startsLower = index % 2 === 1;

				timeline.fromTo(
					card,
					{ y: () => startsLower ? travelDistance() : -travelDistance() },
					{ y: () => startsLower ? -travelDistance() : travelDistance(), ease: "none" },
					0,
				);
			});
		},
		{ dependencies: [photos.length], revertOnUpdate: true, scope: gallery },
	);

	return (
		<div className="about-origin__journal" data-about-reveal-content aria-label="Scenes from El Salvador" ref={gallery}>
			{photos.map((photo) => (
				<figure className="about-origin__photo" data-tone={photo.tone} key={photo.label}>
					<div className="about-origin__artwork">
						{photo.image ? (
							<Image
								alt={photo.imageAlt}
								className="about-origin__image"
								fill
								sizes="(max-width: 720px) 82vw, (max-width: 980px) 50vw, 34vw"
								src={assetPath(photo.image)}
							/>
						) : (
							<div className="about-origin__placeholder" aria-label="Image coming soon">
								<span className="about-origin__sun" />
								<span className="about-origin__land" />
								<span className="about-origin__water" />
							</div>
						)}
					</div>
					<figcaption>
						<strong>{photo.label}</strong>
						<span>{photo.note}</span>
					</figcaption>
				</figure>
			))}
		</div>
	);
}
