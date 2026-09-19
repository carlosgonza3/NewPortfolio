import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { FreelanceGrid } from "@/components/home/FreelanceGrid";
import { HomeExperience } from "@/components/home/HomeExperience";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { approachCapabilities } from "@/data/profile";
import { freelanceProjects } from "@/data/freelance-projects";
import { featuredProjects } from "@/data/projects";
import { assetPath } from "@/lib/asset-path";

const heroStars = Array.from({ length: 58 }, (_, index) => ({
	x: (index * 47 + (index % 7) * 13) % 100,
	y: (index * 31 + (index % 5) * 17) % 92,
	size: 1 + (index % 4) * 0.45,
	duration: 4.8 + (index % 9) * 0.73,
	delay: -((index * 1.37) % 9),
	peak: 0.34 + (index % 6) * 0.085,
	driftX: ((index % 5) - 2) * 0.55,
	driftY: ((index % 7) - 3) * 0.38,
	depth: 0.65 + (index % 5) * 0.22,
}));

const freelanceStars = Array.from({ length: 48 }, (_, index) => ({
	x: (index * 71 + (index % 9) * 17 + 11) % 100,
	y: (index * 53 + (index % 4) * 29 + 7) % 94,
	size: 1 + (index % 3) * 0.55,
	duration: 5.2 + (index % 8) * 0.81,
	delay: -((index * 1.73) % 10),
	peak: 0.32 + (index % 5) * 0.1,
	driftX: ((index % 7) - 3) * 0.46,
	driftY: ((index % 5) - 2) * 0.52,
}));

const heroRain = Array.from({ length: 46 }, (_, index) => ({
	x: (index * 43 + (index % 6) * 19) % 100,
	length: 10 + (index % 6) * 3.5,
	duration: 4.2 + (index % 8) * 0.58,
	delay: -((index * 1.63) % 8.4),
	opacity: 0.16 + (index % 5) * 0.045,
	drift: ((index % 7) - 3) * 3.2,
}));

const forestLeafColors = ["#8fa477", "#667c58", "#9b7653", "#71523c", "#a08c5d"];

const heroLeaves = Array.from({ length: 27 }, (_, index) => {
	const sway = ((index % 7) - 3) * 11;
	const spin = 130 + (index % 6) * 47;

	return {
		x: (index * 41 + (index % 5) * 23) % 100,
		size: 7 + (index % 5) * 1.7,
		height: (7 + (index % 5) * 1.7) * 0.62,
		duration: 9.5 + (index % 8) * 1.25,
		delay: -((index * 2.17) % 14),
		opacity: 0.2 + (index % 4) * 0.055,
		sway,
		swayEnd: sway * -0.4,
		spin,
		spinMid: spin * 0.46,
		color: forestLeafColors[index % forestLeafColors.length],
	};
});

export default function Home() {
	return (
		<HomeExperience>

			{/*Page Progress*/}
			<div className="phase-rail" aria-hidden="true">
				<span className="phase-rail__track"><i /></span>
				<div className="phase-rail__labels">
					<span data-phase-dot="hero">Origin</span>
					<span data-phase-dot="approach">Approach</span>
					<span data-phase-dot="work">Work</span>
					<span data-phase-dot="freelance">Websites</span>
				</div>
			</div>

			{/* Main Content*/}
			<main className="continuous-flow" id="main-content">
				<section
					className="hero scroll-scene"
					data-phase-group="hero"
					data-scroll-scene="hero"
				>
					{/* Hero Effects*/}
					<div className="hero-orb" aria-hidden="true" />
					<div className="hero-daylight" aria-hidden="true">
						<span className="hero-daylight__wash hero-daylight__wash--sky" />
						<span className="hero-daylight__wash hero-daylight__wash--pearl" />
						<i className="hero-daylight__accent hero-daylight__accent--one" />
						<i className="hero-daylight__accent hero-daylight__accent--two" />
						<i className="hero-daylight__accent hero-daylight__accent--three" />
					</div>
					<div className="hero-stars" aria-hidden="true">
						{heroStars.map((star, index) => (
							<span
								data-star-x={star.x / 100}
								data-star-y={star.y / 100}
								data-star-depth={star.depth}
								data-star-peak={star.peak}
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
						{heroRain.map((drop, index) => (
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
						{heroLeaves.map((leaf, index) => (
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

					{/* Hero Section */}
					<div className="hero-grid-depth" aria-hidden="true">
						<canvas className="hero-grid-canvas" />
					</div>
					<div className="hero-copy">
						<h1>
							<span className="hero-line" data-hero-headline>I turn technical ideas</span>
							<span className="hero-line hero-line--light" data-hero-headline>Into working products.</span>
						</h1>
						<p className="hero-intro" data-hero-intro>
							Hey I’m Carlos, a full-stack developer who enjoys turning ideas into products highly detailed, optimized and actually useful.
						</p>
						<div className="hero-actions" data-hero-actions>
							<a className="button button--dark" href="#work"><span className="button__label">View selected work</span></a>
							<Link className="text-link" href="/knowledge">Explore more...</Link>
						</div>
					</div>
				</section>

				{/* How I work */}
				<section className="thesis section-shell scroll-scene" data-phase-group="approach" data-scroll-scene="approach" id="approach">
					<div className="thesis-copy">
						<h2 data-approach-primary>
							I work from the <span className="thesis-emphasis" data-approach-emphasis="problem">problem</span> all the way to the <span className="thesis-emphasis" data-approach-emphasis="product">product</span>.
						</h2>
						{/*<p data-approach-detail>*/}
						{/*	My best work starts with understanding the problem and the workflow around it, then shaping the product with care for the interface people actually use.*/}
						{/*</p>*/}
						<div className="thesis-range" data-approach-detail aria-hidden="true">
							<span></span><i><b data-approach-progress /></i><span></span>
						</div>
					</div>
					<ol className="capability-stack" data-approach-detail aria-label="How I work across a product">
						{approachCapabilities.map((capability) => {
							const CapabilityIcon = capability.icon;
							return (
								<li className="capability-card" data-approach-card key={capability.title}>
									<button
										aria-label={`Show ${capability.title}`}
										aria-pressed="false"
										className="capability-card__select"
										data-approach-card-select
										type="button"
									/>
									<div className="capability-card__surface" data-approach-card-surface>
										<div className="capability-card__heading">
											{CapabilityIcon ? (
												<CapabilityIcon aria-hidden="true" size={24} strokeWidth={1.75} />
											) : null}
											<h3>{capability.title}</h3>
										</div>
										<div className="capability-card__body" data-approach-card-body>
											<div className="capability-card__body-inner">
												<p>{capability.description}</p>
											</div>
										</div>
									</div>
								</li>
							);
						})}
					</ol>
				</section>

				{/*Projects featured*/}
				<section className="work" id="work" data-phase-group="work">
					{featuredProjects.map((project, index) => (
						<article
							className={`project-story scroll-scene${index % 2 === 1 ? " project-story--reverse" : ""}`}
							data-phase-group="work"
							data-scroll-scene="project"
							key={project.id}
							style={{ "--project-accent": project.accent } as CSSProperties}
						>
							<div className="project-story__copy">
								<div className="project-story__meta" data-project-copy>
									{project.logo ? (
										<div
											className="project-logo"
											role="img"
											aria-label={`${project.name} logo`}
											style={{ "--project-logo-scale": project.logo.scale ?? 1 } as CSSProperties}
										>
											<Image
												alt=""
												aria-hidden="true"
												className="project-logo__asset project-logo__asset--light-surface"
												height={60}
												src={assetPath(project.logo.lightSurface)}
												width={200}
											/>
											<Image
												alt=""
												aria-hidden="true"
												className="project-logo__asset project-logo__asset--dark-surface"
												height={60}
												src={assetPath(project.logo.darkSurface)}
												width={200}
											/>
										</div>
									) : (
										<p className="eyebrow">{project.kicker}</p>
									)}
									{project.status === "active" ? (
										<span className="project-status"><i aria-hidden="true" />In active development</span>
									) : null}
								</div>
								<h3 data-project-copy>{project.name}</h3>
								<p className="project-summary" data-project-copy>{project.summary}</p>
								<ul className="tag-list" data-project-copy aria-label="Technologies">
									{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
								</ul>
								<div data-project-copy><ArrowLink href={`/projects/${project.slug}`}>View case study</ArrowLink></div>
							</div>
							<div className="project-story__media" data-project-media><ProjectVisual project={project} /></div>
						</article>
					))}
				</section>

				{/* Freelance websites */}
				<section className="freelance-showcase scroll-scene" data-phase-group="freelance" data-scroll-scene="freelance">
					<div className="hero-orb" aria-hidden="true" />
					<div className="hero-daylight" aria-hidden="true">
						<span className="hero-daylight__wash hero-daylight__wash--sky" />
						<span className="hero-daylight__wash hero-daylight__wash--pearl" />
						<i className="hero-daylight__accent hero-daylight__accent--one" />
						<i className="hero-daylight__accent hero-daylight__accent--two" />
						<i className="hero-daylight__accent hero-daylight__accent--three" />
					</div>
					<div className="freelance-stars" aria-hidden="true">
						{freelanceStars.map((star, index) => (
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
						{heroRain.map((drop, index) => (
							<span key={index} style={{
								"--rain-x": `${drop.x}%`,
								"--rain-length": `${drop.length}px`,
								"--rain-duration": `${drop.duration}s`,
								"--rain-delay": `${drop.delay}s`,
								"--rain-opacity": drop.opacity,
								"--rain-drift": `${drop.drift}px`,
							} as CSSProperties} />
						))}
					</div>
					<div className="hero-forest" aria-hidden="true">
						<i className="hero-forest__wash hero-forest__wash--earth" />
						<i className="hero-forest__wash hero-forest__wash--canopy" />
						{heroLeaves.map((leaf, index) => (
							<span key={index} style={{
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
							} as CSSProperties} />
						))}
					</div>

					<div className="freelance-showcase__content section-shell">
						<header className="freelance-showcase__heading" data-freelance-copy>
							<h2>Built closely. Delivered thoughtfully.</h2>
						</header>
						<FreelanceGrid projects={freelanceProjects} />
					</div>
				</section>
			</main>
		</HomeExperience>
	);
}
