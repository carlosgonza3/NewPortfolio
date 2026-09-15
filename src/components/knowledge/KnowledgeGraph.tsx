"use client";

import { useMemo, useState } from "react";
import { knowledgeEdges, knowledgeNodes } from "@/data/knowledge";
import type { KnowledgeNodeType } from "@/types/content";

const filters: Array<{ label: string; value: KnowledgeNodeType | "all" }> = [
	{ label: "All", value: "all" },
	{ label: "Courses", value: "course" },
	{ label: "Concepts", value: "concept" },
	{ label: "Projects", value: "project" },
	{ label: "Technology", value: "technology" },
];

const typeLabels: Record<KnowledgeNodeType, string> = {
	course: "Course",
	concept: "Concept",
	project: "Project",
	technology: "Technology",
	skill: "Skill",
};

export function KnowledgeGraph() {
	const [activeFilter, setActiveFilter] = useState<KnowledgeNodeType | "all">("all");
	const [query, setQuery] = useState("");
	const [selectedId, setSelectedId] = useState("project:studyblocks-ai");

	const visibleNodes = useMemo(() => {
		const normalizedQuery = query.trim().toLowerCase();
		return knowledgeNodes.filter((node) => {
			const matchesFilter = activeFilter === "all" || node.type === activeFilter;
			const matchesQuery = !normalizedQuery || `${node.label} ${node.description}`.toLowerCase().includes(normalizedQuery);
			return matchesFilter && matchesQuery;
		});
	}, [activeFilter, query]);

	const visibleIds = new Set(visibleNodes.map((node) => node.id));
	const selectedNode = knowledgeNodes.find((node) => node.id === selectedId) ?? knowledgeNodes[0];
	const relationships = knowledgeEdges
		.filter((edge) => edge.source === selectedNode.id || edge.target === selectedNode.id)
		.map((edge) => {
			const otherId = edge.source === selectedNode.id ? edge.target : edge.source;
			return {
				relation: edge.relation.replaceAll("_", " "),
				node: knowledgeNodes.find((node) => node.id === otherId),
			};
		})
		.filter((relationship) => relationship.node);

	return (
		<div className="graph-app">
			<div className="graph-toolbar">
				<div className="graph-filters" aria-label="Filter knowledge graph">
					{filters.map((filter) => (
						<button
							className={activeFilter === filter.value ? "is-active" : ""}
							key={filter.value}
							onClick={() => setActiveFilter(filter.value)}
							type="button"
						>
							{filter.label}
						</button>
					))}
				</div>
				<label className="graph-search">
					<span className="sr-only">Search knowledge</span>
					<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6" /><path d="m16 16 4 4" /></svg>
					<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search knowledge..." />
				</label>
			</div>

			<div className="graph-layout">
				<div className="graph-canvas" aria-label="Interactive knowledge graph">
					<div className="graph-grid" aria-hidden="true" />
					<svg className="graph-edges" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
						{knowledgeEdges.map((edge, index) => {
							const source = knowledgeNodes.find((node) => node.id === edge.source);
							const target = knowledgeNodes.find((node) => node.id === edge.target);
							if (!source || !target) return null;
							const isVisible = visibleIds.has(source.id) && visibleIds.has(target.id);
							const isRelated = source.id === selectedId || target.id === selectedId;
							return (
								<line
									className={`${isVisible ? "is-visible" : "is-hidden"}${isRelated ? " is-related" : ""}`}
									key={`${edge.source}-${edge.target}-${index}`}
									x1={source.x}
									y1={source.y}
									x2={target.x}
									y2={target.y}
								/>
							);
						})}
					</svg>
					{knowledgeNodes.map((node) => {
						const isVisible = visibleIds.has(node.id);
						return (
							<button
								aria-label={`${typeLabels[node.type]}: ${node.label}`}
								aria-pressed={selectedId === node.id}
								className={`graph-node graph-node--${node.type}${selectedId === node.id ? " is-selected" : ""}${isVisible ? "" : " is-hidden"}`}
								key={node.id}
								onClick={() => setSelectedId(node.id)}
								style={{ left: `${node.x}%`, top: `${node.y}%` }}
								type="button"
							>
								<span className="graph-node__dot" />
								<span className="graph-node__label">{node.label}</span>
							</button>
						);
					})}
					<div className="graph-key" aria-hidden="true">
						<span><i className="course" /> Course</span><span><i className="concept" /> Concept</span><span><i className="project" /> Project</span><span><i className="technology" /> Technology</span>
					</div>
				</div>

				<aside className="node-panel" aria-live="polite">
					<div className="node-panel__top">
						<span>{typeLabels[selectedNode.type]}</span><span>{selectedNode.id.split(":")[0].toUpperCase()} / 0{knowledgeNodes.indexOf(selectedNode) + 1}</span>
					</div>
					<div className={`node-panel__glyph node-panel__glyph--${selectedNode.type}`} aria-hidden="true"><span /><span /><span /></div>
					<h2>{selectedNode.label}</h2>
					<p>{selectedNode.description}</p>
					<div className="node-panel__relations">
						<p>Connected knowledge <span>{relationships.length}</span></p>
						{relationships.map(({ relation, node }) => node && (
							<button key={`${relation}-${node.id}`} onClick={() => setSelectedId(node.id)} type="button">
								<span>{relation}</span><strong>{node.label}</strong><i aria-hidden="true">↗</i>
							</button>
						))}
					</div>
				</aside>
			</div>
		</div>
	);
}
