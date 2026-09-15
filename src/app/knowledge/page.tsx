import type { Metadata } from "next";
import { KnowledgeGraph } from "@/components/knowledge/KnowledgeGraph";

export const metadata: Metadata = {
	title: "Knowledge System",
	description: "Explore the courses, concepts, technologies, and projects behind Carlos Gonzalez's work.",
};

export default function KnowledgePage() {
	return (
		<main className="knowledge-page" id="main-content">
			<header className="knowledge-page__intro">
				<div>
					<p className="eyebrow">The developer knowledge system</p>
					<h1>Ideas become<br /><span>evidence.</span></h1>
				</div>
				<p>
					An explorable map of where concepts came from, how they connect, and the projects where they became real.
				</p>
			</header>
			<KnowledgeGraph />
		</main>
	);
}
