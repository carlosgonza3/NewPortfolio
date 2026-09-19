import { KnowledgeGraph } from "@/components/knowledge/KnowledgeGraph";

export function KnowledgePage() {
	return (
		<main className="knowledge-page" id="main-content">
			<header className="knowledge-page__intro">
				<div>
					<p className="section-index">03 / Knowledge system</p>
					<p className="eyebrow">Beyond a list of skills</p>
					<h1>See how the ideas<br /><span>connect.</span></h1>
				</div>
				<div className="knowledge-page__statement">
					<p>Courses become concepts. Concepts shape technical decisions. Projects become proof.</p>
					<a href="#knowledge-graph">Explore the knowledge graph <span aria-hidden="true">↗</span></a>
				</div>
			</header>
			<div id="knowledge-graph"><KnowledgeGraph /></div>
		</main>
	);
}
