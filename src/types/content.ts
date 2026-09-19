export type ProjectStatus = "completed" | "active" | "prototype" | "archived";

export interface Project {
	id: string;
	slug: string;
	name: string;
	kicker: string;
	logo?: {
		darkSurface: string;
		lightSurface: string;
		scale?: number;
	};
	videoPath: string;
	summary: string;
	description: string;
	status: ProjectStatus;
	featured: boolean;
	featuredOrder?: number;
	year: number;
	role: string;
	technologies: string[];
	concepts: string[];
	accent: string;
	links: {
		live?: string;
		repository?: string;
	};
}

export type KnowledgeNodeType = "course" | "concept" | "project" | "technology" | "skill";

export interface KnowledgeNode {
	id: string;
	label: string;
	type: KnowledgeNodeType;
	description: string;
	x: number;
	y: number;
}

export interface KnowledgeEdge {
	source: string;
	target: string;
	relation: "contains" | "learned_in" | "related_to" | "applied_in" | "uses" | "demonstrates";
}
