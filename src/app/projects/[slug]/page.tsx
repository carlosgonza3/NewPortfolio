import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { projects } from "@/data/projects";

export function generateStaticParams() {
	return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const { slug } = await params;
	const project = projects.find((item) => item.slug === slug);
	return project ? { title: project.name, description: project.summary } : {};
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const project = projects.find((item) => item.slug === slug);
	if (!project) notFound();

	return (
		<main className="case-study" id="main-content" style={{ "--project-accent": project.accent } as React.CSSProperties}>
			<header className="case-hero">
				<div className="case-hero__top"><p className="eyebrow">{project.kicker}</p><span>{project.status} · {project.year}</span></div>
				<h1>{project.name}</h1>
				<p className="case-hero__summary">{project.summary}</p>
				<div className="case-meta">
					<div><span>Role</span><strong>{project.role}</strong></div>
					<div><span>Year</span><strong>{project.year}</strong></div>
					<div><span>Focus</span><strong>{project.technologies.slice(0, 2).join(" + ")}</strong></div>
				</div>
			</header>

			<div className="case-visual"><ProjectVisual project={project} /></div>

			<section className="case-section case-overview">
				<p className="section-index">01 / Overview</p>
				<div><h2>Building the bridge between information and understanding.</h2><p>{project.description}</p></div>
			</section>

			<section className="case-dark">
				<div className="case-section">
					<p className="section-index">02 / Technical thinking</p>
					<div>
						<p className="eyebrow">Concepts applied</p>
						<h2>The theory behind the decisions.</h2>
						<div className="concept-cards">
							{project.concepts.map((concept, index) => (
								<Link href={`/knowledge?concept=${encodeURIComponent(concept)}`} key={concept}>
									<span>0{index + 1}</span><strong>{concept}</strong><i aria-hidden="true">↗</i>
								</Link>
							))}
						</div>
					</div>
				</div>
			</section>

			<section className="case-section case-stack">
				<p className="section-index">03 / Technology</p>
				<div><p className="eyebrow">Built with</p>{project.technologies.map((technology) => <h2 key={technology}>{technology}</h2>)}</div>
			</section>

			<nav className="next-project" aria-label="More projects">
				<p className="eyebrow">Continue exploring</p>
				<Link href="/#work">All selected work <span aria-hidden="true">↗</span></Link>
			</nav>
		</main>
	);
}
