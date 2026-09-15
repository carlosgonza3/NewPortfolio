import Link from "next/link";
import { HomeExperience } from "@/components/home/HomeExperience";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { featuredProjects } from "@/data/projects";

const disciplines = [
	["01", "Product engineering"],
	["02", "Intelligent systems"],
	["03", "Interaction design"],
];

export default function Home() {
	return (
		<HomeExperience>
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

			<main className="continuous-flow" id="main-content">
				<section
					className="hero scroll-scene"
					data-phase-group="hero"
					data-scroll-scene="hero"
				>
					<div className="hero-orb" aria-hidden="true" />
					<div className="hero-grid-depth" aria-hidden="true" />
					<div className="hero-copy">
						<h1>
							<span className="hero-line" data-hero-headline>Technical ideas.</span>
							<span className="hero-line hero-line--light" data-hero-headline>Working products.</span>
						</h1>
						<p className="hero-intro" data-hero-intro>
							Hey I’m Carlos, a full-stack developer who enjoys turning ideas into products highly detailed, optimized and actually useful.
						</p>
						<div className="hero-actions" data-hero-actions>
							<a className="button button--dark" href="#work">View selected work <span aria-hidden="true">↓</span></a>
							<Link className="text-link" href="/knowledge">Explore the knowledge <span aria-hidden="true">↗</span></Link>
						</div>
					</div>
				</section>

				<section className="thesis section-shell scroll-scene" data-phase-group="approach" data-scroll-scene="approach">
					<div className="phase-edge" aria-hidden="true"><span>Phase 01</span><i /></div>
					<p className="section-index" data-approach-primary>01 / Approach</p>
					<div className="thesis-copy">
						<p className="eyebrow" data-approach-primary>From understanding to implementation</p>
						<h2 data-approach-primary>What I learn becomes what I build.</h2>
						<p data-approach-detail>
							Theory matters when it changes the way a product is designed. My work connects computer science foundations to real interfaces, services, and decisions.
						</p>
					</div>
					<div className="discipline-list">
						{disciplines.map(([index, label]) => (
							<div data-approach-detail key={label}><span>{index}</span><p>{label}</p><i aria-hidden="true">↗</i></div>
						))}
					</div>
				</section>

				<section className="work" id="work" data-phase-group="work">
					<div className="work-intro scroll-scene" data-scroll-scene="work-intro">
						<div className="phase-edge" aria-hidden="true"><span>Phase 02</span><i /></div>
						<div className="section-heading section-shell">
							<div>
								<p className="section-index" data-work-intro>02 / Selected work</p>
								<p className="eyebrow" data-work-intro>Projects as evidence</p>
							</div>
							<h2 data-work-intro>Built with intent.<br />Proven in use.</h2>
						</div>
						<p className="work-intro__counter" data-work-intro aria-hidden="true">03 projects / Keep scrolling</p>
					</div>

					{featuredProjects.map((project, index) => (
						<article
							className="project-story scroll-scene"
							data-phase-group="work"
							data-scroll-scene="project"
							key={project.id}
							style={{ "--project-accent": project.accent } as React.CSSProperties}
						>
							<div className="phase-edge" aria-hidden="true"><span>Project 0{index + 1}</span><i /></div>
							<div className="project-story__copy">
								<div className="project-number" data-project-copy><span>0{index + 1}</span><span>{project.year}</span></div>
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
