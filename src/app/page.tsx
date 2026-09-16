import Link from "next/link";
import type { CSSProperties } from "react";
import { HomeExperience } from "@/components/home/HomeExperience";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { approachCapabilities } from "@/data/profile";
import { featuredProjects } from "@/data/projects";

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
					<span data-phase-dot="knowledge">Knowledge</span>
					<span data-phase-dot="about">About</span>
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
					<div className="hero-grid-depth" aria-hidden="true" />
					<div className="hero-copy">
						<h1>
							<span className="hero-line" data-hero-headline>I turn technical ideas.</span>
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
						<p data-approach-detail>
							My best work starts with understanding the problem and the workflow around it, then shaping the product with care for the interface people actually use.
						</p>
						<div className="thesis-range" data-approach-detail aria-hidden="true">
							<span>Requirements</span><i><b data-approach-progress /></i><span>Release</span>
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
							className="project-story scroll-scene"
							data-phase-group="work"
							data-scroll-scene="project"
							key={project.id}
							style={{ "--project-accent": project.accent } as CSSProperties}
						>
							<div className="project-story__copy">
								<p className="eyebrow" data-project-copy>{project.kicker}</p>
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

				{/*Knowledge System -> Later the freelancing websites*/}
				<section className="knowledge-teaser scroll-scene" data-phase-group="knowledge" data-scroll-scene="knowledge">
					<div className="phase-edge" aria-hidden="true"><span>Phase 03</span><i /></div>
					<div className="knowledge-teaser__grid" aria-hidden="true">
						{Array.from({ length: 56 }, (_, index) => <span key={index} />)}
					</div>
					<div className="knowledge-teaser__content section-shell">
						<div>
							<p className="section-index" data-knowledge-copy>03 / Knowledge system</p>
							<p className="eyebrow" data-knowledge-copy>Beyond a list of skills</p>
							<h2 data-knowledge-copy>See how the ideas connect.</h2>
						</div>
						<div className="knowledge-teaser__statement">
							<p data-knowledge-copy>Courses become concepts. Concepts shape technical decisions. Projects become proof.</p>
							<div data-knowledge-copy><ArrowLink href="/knowledge" inverse>Explore the knowledge graph</ArrowLink></div>
						</div>
						<div className="mini-graph" data-knowledge-graph aria-hidden="true">
							<svg viewBox="0 0 900 360" role="presentation">
								<path d="M112 176L315 92L478 179L694 75M478 179L713 278M315 92L252 292M478 179L252 292" />
								{[[112,176],[315,92],[478,179],[694,75],[713,278],[252,292]].map(([x,y], index) => <circle key={index} cx={x} cy={y} r={index === 2 ? 16 : 8} />)}
							</svg>
							<span className="mini-label mini-label--course">Course</span>
							<span className="mini-label mini-label--concept">Concept</span>
							<span className="mini-label mini-label--project">Project</span>
						</div>
					</div>
				</section>

				{/* About Me */}
				<section className="about section-shell scroll-scene" id="about" data-phase-group="about" data-scroll-scene="about">
					<div className="phase-edge" aria-hidden="true"><span>Phase 04</span><i /></div>
					<p className="section-index" data-about-copy>04 / About</p>
					<div className="about-heading">
						<p className="eyebrow" data-about-copy>Engineer · collaborator · perpetual student</p>
						<h2 data-about-copy>I care about the invisible decisions that make software feel obvious.</h2>
					</div>
					<div className="about-body">
						<p data-about-detail>
							My work moves between frontend craft, backend architecture, and intelligent systems. I like understanding how a system works all the way down—then making that understanding useful to someone else.
						</p>
						<div className="about-meta" data-about-detail>
							<div><span>Based in</span><strong>Toronto, Canada</strong></div>
							<div><span>Focused on</span><strong>Software engineering</strong></div>
							<div><span>Current mode</span><strong>Building & learning</strong></div>
						</div>
					</div>
				</section>

			</main>
		</HomeExperience>
	);
}
