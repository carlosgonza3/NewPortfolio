import type { CSSProperties } from "react";
import { AmbientTiltGrid } from "@/components/ui/AmbientTiltGrid";
import { knowledgeComingSoon } from "@/data/knowledge-coming-soon";

const createRandom = (seed: number) => {
	let state = seed >>> 0;

	return () => {
		state = (state * 1664525 + 1013904223) >>> 0;
		return state / 4294967296;
	};
};

const starRandom = createRandom(94731);
const comingSoonStars = Array.from({ length: 52 }, () => ({
	x: starRandom() * 100,
	y: 4 + starRandom() * 88,
	size: 0.8 + starRandom() * 1.75,
	duration: 4.6 + starRandom() * 7.2,
	delay: -(starRandom() * 11),
	peak: 0.25 + starRandom() * 0.42,
	driftX: (starRandom() - 0.5) * 3.2,
	driftY: (starRandom() - 0.5) * 2.4,
}));

const rainRandom = createRandom(38117);
const comingSoonRain = Array.from({ length: 43 }, () => ({
	x: rainRandom() * 100,
	length: 8 + rainRandom() * 23,
	duration: 3.5 + rainRandom() * 4.8,
	delay: -(rainRandom() * 9.5),
	opacity: 0.12 + rainRandom() * 0.26,
	drift: (rainRandom() - 0.5) * 25,
}));

const leafColors = ["#8fa477", "#667c58", "#9b7653", "#71523c", "#a08c5d"];
const leafRandom = createRandom(72569);
const comingSoonLeaves = Array.from({ length: 24 }, () => {
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

const comingSoonWords = knowledgeComingSoon.title.split(" ");
const soonLetters = comingSoonWords.at(-1)?.split("") ?? [];

export function KnowledgeComingSoon() {
	return (
		<main className="coming-soon" data-ambient-tilt-surface id="main-content">
			<div className="hero-orb" aria-hidden="true" />
			<div className="hero-daylight" aria-hidden="true">
				<span className="hero-daylight__wash hero-daylight__wash--sky" />
				<span className="hero-daylight__wash hero-daylight__wash--pearl" />
				<i className="hero-daylight__accent hero-daylight__accent--one" />
				<i className="hero-daylight__accent hero-daylight__accent--two" />
				<i className="hero-daylight__accent hero-daylight__accent--three" />
			</div>
			<div className="hero-stars coming-soon__stars" aria-hidden="true">
				{comingSoonStars.map((star, index) => (
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
			<div className="hero-sundown" aria-hidden="true">
				<span className="hero-sundown__wash hero-sundown__wash--amber" />
				<span className="hero-sundown__wash hero-sundown__wash--rose" />
				<span className="hero-sundown__wash hero-sundown__wash--violet" />
				<span className="hero-sundown__cloud hero-sundown__cloud--near" />
				<span className="hero-sundown__cloud hero-sundown__cloud--far" />
			</div>
			<div className="hero-rain" aria-hidden="true">
				{comingSoonRain.map((drop, index) => (
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
			<div className="hero-forest" aria-hidden="true">
				<i className="hero-forest__wash hero-forest__wash--earth" />
				<i className="hero-forest__wash hero-forest__wash--canopy" />
				{comingSoonLeaves.map((leaf, index) => (
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
			<AmbientTiltGrid />

			<section className="coming-soon__content" aria-labelledby="coming-soon-title">
				{/*<p className="coming-soon__eyebrow">{knowledgeComingSoon.eyebrow}</p>*/}
				<div className="coming-soon__headline">
					<h1 aria-label={`${knowledgeComingSoon.title}...`} id="coming-soon-title">
						<span aria-hidden="true" className="coming-soon__word">{comingSoonWords[0]}</span>{" "}
						<span aria-hidden="true" className="coming-soon__word coming-soon__word--soon">
							{soonLetters.map((letter, index) => (
								<span key={`${letter}-${index}`}>{letter}</span>
							))}
						</span>
						<span aria-hidden="true" className="coming-soon__dots">
							<span>.</span><span>.</span><span>.</span>
						</span>
					</h1>
				</div>
				{/*<p className="coming-soon__description">{knowledgeComingSoon.description}</p>*/}
				{/*<div className="coming-soon__status" aria-label={knowledgeComingSoon.status}>*/}
				{/*	<span aria-hidden="true" />*/}
				{/*	<p>{knowledgeComingSoon.status}</p>*/}
				{/*</div>*/}
				{/*<Link className="coming-soon__link" href={knowledgeComingSoon.action.href}>*/}
				{/*	{knowledgeComingSoon.action.label}<span aria-hidden="true">↗</span>*/}
				{/*</Link>*/}
			</section>
		</main>
	);
}
