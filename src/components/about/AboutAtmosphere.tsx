"use client";

import { useRef, type CSSProperties } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

const createRandom = (seed: number) => {
	let state = seed >>> 0;

	return () => {
		state = (state * 1664525 + 1013904223) >>> 0;
		return state / 4294967296;
	};
};

const starRandom = createRandom(61987);
const stars = Array.from({ length: 58 }, () => ({
	depth: 0.6 + starRandom() * 1.4,
	driftX: (starRandom() - 0.5) * 3.2,
	driftY: (starRandom() - 0.5) * 2.4,
	x: starRandom() * 100,
	y: 4 + starRandom() * 88,
	size: 0.8 + starRandom() * 1.75,
	duration: 4.6 + starRandom() * 7.2,
	delay: -(starRandom() * 11),
	peak: 0.25 + starRandom() * 0.42,
}));

const rainRandom = createRandom(38117);
const rain = Array.from({ length: 43 }, () => ({
	x: rainRandom() * 100,
	length: 8 + rainRandom() * 23,
	duration: 3.5 + rainRandom() * 4.8,
	delay: -(rainRandom() * 9.5),
	opacity: 0.12 + rainRandom() * 0.26,
	drift: (rainRandom() - 0.5) * 25,
}));

const leafColors = ["#8fa477", "#667c58", "#9b7653", "#71523c", "#a08c5d"];
const leafRandom = createRandom(72569);
const leaves = Array.from({ length: 24 }, () => {
	const size = 6 + leafRandom() * 10;
	const sway = (leafRandom() - 0.5) * 86;
	const spin = 110 + leafRandom() * 320;

	return {
		x: leafRandom() * 100,
		size,
		height: size * (0.48 + leafRandom() * 0.3),
		duration: 8.8 + leafRandom() * 9.7,
		delay: -(leafRandom() * 17),
		opacity: 0.16 + leafRandom() * 0.26,
		sway,
		swayEnd: sway * (-0.25 - leafRandom() * 0.55),
		spin,
		spinMid: spin * (0.36 + leafRandom() * 0.22),
		color: leafColors[Math.floor(leafRandom() * leafColors.length)],
	};
});

export function AboutAtmosphere() {
	const effects = useRef<HTMLDivElement>(null);

	useGSAP(
		(_context, contextSafe) => {
			const surface = effects.current?.closest<HTMLElement>("[data-about-atmosphere-surface]");
			if (!surface || !contextSafe) {
				return;
			}

			const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
			const finePointer = window.matchMedia("(pointer: fine)");
			const starElements = Array.from(effects.current?.querySelectorAll<HTMLElement>(".hero-stars span") ?? []);

			gsap.set(starElements, {
				"--star-cursor-glow": 0,
				"--star-parallax-x": "0px",
				"--star-parallax-y": "0px",
			});

			const trackPointer = contextSafe((event: PointerEvent) => {
				if (motionPreference.matches || !finePointer.matches) {
					return;
				}

				const bounds = surface.getBoundingClientRect();
				const x = gsap.utils.clamp(0, 1, (event.clientX - bounds.left) / bounds.width);
				const y = gsap.utils.clamp(0, 1, (event.clientY - bounds.top) / bounds.height);
				const normalizedX = x - 0.5;
				const normalizedY = y - 0.5;

				surface.style.setProperty("--orb-x", `${72 + normalizedX * 14}%`);
				surface.style.setProperty("--orb-y", `${38 + normalizedY * 10}%`);
				surface.style.setProperty("--cloud-near-x", `${normalizedX * 34}px`);
				surface.style.setProperty("--cloud-near-y", `${normalizedY * 22}px`);
				surface.style.setProperty("--cloud-far-x", `${normalizedX * -18}px`);
				surface.style.setProperty("--cloud-far-y", `${normalizedY * -12}px`);

				starElements.forEach((star, index) => {
					const starData = stars[index];
					const distance = Math.hypot((x - starData.x / 100) * 1.45, y - starData.y / 100);
					const proximity = Math.max(0, 1 - distance / 0.24);

					star.style.setProperty("--star-cursor-glow", (proximity * 0.72).toFixed(3));
					star.style.setProperty("--star-peak", Math.min(0.96, starData.peak + proximity * 0.36).toFixed(3));
					star.style.setProperty("--star-parallax-x", `${normalizedX * starData.depth * 2.6}px`);
					star.style.setProperty("--star-parallax-y", `${normalizedY * starData.depth * 2}px`);
				});
			});

			const resetEffects = contextSafe(() => {
				surface.style.setProperty("--orb-x", "72%");
				surface.style.setProperty("--orb-y", "38%");
				surface.style.setProperty("--cloud-near-x", "0px");
				surface.style.setProperty("--cloud-near-y", "0px");
				surface.style.setProperty("--cloud-far-x", "0px");
				surface.style.setProperty("--cloud-far-y", "0px");

				starElements.forEach((star, index) => {
					star.style.setProperty("--star-cursor-glow", "0");
					star.style.setProperty("--star-peak", `${stars[index].peak}`);
					star.style.setProperty("--star-parallax-x", "0px");
					star.style.setProperty("--star-parallax-y", "0px");
				});
			});

			surface.addEventListener("pointermove", trackPointer, { passive: true });
			surface.addEventListener("pointerleave", resetEffects);
			motionPreference.addEventListener("change", resetEffects);
			finePointer.addEventListener("change", resetEffects);

			return () => {
				surface.removeEventListener("pointermove", trackPointer);
				surface.removeEventListener("pointerleave", resetEffects);
				motionPreference.removeEventListener("change", resetEffects);
				finePointer.removeEventListener("change", resetEffects);
			};
		},
		{ scope: effects },
	);

	return (
		<div className="about-hero__atmosphere" aria-hidden="true" ref={effects}>
			<div className="hero-orb" />
			<div className="hero-daylight">
				<span className="hero-daylight__wash hero-daylight__wash--sky" />
				<span className="hero-daylight__wash hero-daylight__wash--pearl" />
				<i className="hero-daylight__accent hero-daylight__accent--one" />
				<i className="hero-daylight__accent hero-daylight__accent--two" />
				<i className="hero-daylight__accent hero-daylight__accent--three" />
			</div>
			<div className="hero-stars about-hero__stars">
				{stars.map((star, index) => (
					<span
						key={index}
						style={{
							"--star-x": `${star.x}%`,
							"--star-y": `${star.y}%`,
							"--star-size": `${star.size}px`,
							"--star-duration": `${star.duration}s`,
							"--star-delay": `${star.delay}s`,
							"--star-peak": star.peak,
							"--star-drift-x": `${star.driftX}px`,
							"--star-drift-y": `${star.driftY}px`,
							"--star-cursor-glow": 0,
							"--star-parallax-x": "0px",
							"--star-parallax-y": "0px",
						} as CSSProperties}
					/>
				))}
			</div>
			<div className="hero-sundown">
				<span className="hero-sundown__wash hero-sundown__wash--amber" />
				<span className="hero-sundown__wash hero-sundown__wash--rose" />
				<span className="hero-sundown__wash hero-sundown__wash--violet" />
				<span className="hero-sundown__cloud hero-sundown__cloud--near" />
				<span className="hero-sundown__cloud hero-sundown__cloud--far" />
			</div>
			<div className="hero-rain">
				{rain.map((drop, index) => (
					<span
						key={index}
						style={{
							"--rain-x": `${drop.x}%`,
							"--rain-length": `${drop.length}px`,
							"--rain-duration": `${drop.duration}s`,
							"--rain-delay": `${drop.delay}s`,
							"--rain-opacity": drop.opacity,
							"--rain-drift": `${drop.drift}px`,
						} as CSSProperties}
					/>
				))}
			</div>
			<div className="hero-forest">
				<i className="hero-forest__wash hero-forest__wash--earth" />
				<i className="hero-forest__wash hero-forest__wash--canopy" />
				{leaves.map((leaf, index) => (
					<span
						key={index}
						style={{
							"--leaf-x": `${leaf.x}%`,
							"--leaf-size": `${leaf.size}px`,
							"--leaf-height": `${leaf.height}px`,
							"--leaf-duration": `${leaf.duration}s`,
							"--leaf-delay": `${leaf.delay}s`,
							"--leaf-opacity": leaf.opacity,
							"--leaf-sway": `${leaf.sway}px`,
							"--leaf-sway-end": `${leaf.swayEnd}px`,
							"--leaf-spin": `${leaf.spin}deg`,
							"--leaf-spin-mid": `${leaf.spinMid}deg`,
							"--leaf-color": leaf.color,
						} as CSSProperties}
					/>
				))}
			</div>
		</div>
	);
}
