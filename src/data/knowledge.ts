import type { KnowledgeEdge, KnowledgeNode } from "@/types/content";

export const knowledgeNodes: KnowledgeNode[] = [
	{ id: "skill:software-engineering", label: "Software engineering", type: "skill", description: "Designing dependable software from problem framing through delivery.", x: 50, y: 50 },
	{ id: "course:algorithms", label: "Algorithms", type: "course", description: "The foundations for reasoning about data, search, and efficiency.", x: 17, y: 20 },
	{ id: "course:operating-systems", label: "Operating systems", type: "course", description: "Processes, concurrency, memory, and the systems beneath applications.", x: 16, y: 72 },
	{ id: "course:software-engineering", label: "Software design", type: "course", description: "Architecture, team delivery, requirements, and maintainable systems.", x: 80, y: 18 },
	{ id: "concept:graph-traversal", label: "Graph traversal", type: "concept", description: "Navigating connected entities using systematic search strategies.", x: 34, y: 27 },
	{ id: "concept:concurrency", label: "Concurrency", type: "concept", description: "Coordinating work that progresses across overlapping periods of time.", x: 31, y: 69 },
	{ id: "concept:rest-apis", label: "REST APIs", type: "concept", description: "Resource-oriented contracts between clients and services.", x: 65, y: 34 },
	{ id: "concept:data-visualization", label: "Data visualization", type: "concept", description: "Turning datasets into readable, decision-supporting interfaces.", x: 77, y: 70 },
	{ id: "project:studyblocks-ai", label: "StudyBlocksAI", type: "project", description: "An AI-powered connected learning system, currently in active development.", x: 50, y: 18 },
	{ id: "project:surveynest", label: "SurveyNest", type: "project", description: "Collaborative survey creation and response analytics.", x: 69, y: 58 },
	{ id: "project:forno", label: "Forno", type: "project", description: "Restaurant operations SaaS built around real business workflows.", x: 51, y: 79 },
	{ id: "technology:react", label: "React", type: "technology", description: "The interface system used across product and portfolio work.", x: 87, y: 43 },
	{ id: "technology:typescript", label: "TypeScript", type: "technology", description: "A typed foundation for reliable application development.", x: 81, y: 86 },
	{ id: "technology:nestjs", label: "NestJS", type: "technology", description: "Structured Node.js services for StudyBlocksAI.", x: 23, y: 89 },
];

export const knowledgeEdges: KnowledgeEdge[] = [
	{ source: "course:algorithms", target: "concept:graph-traversal", relation: "contains" },
	{ source: "course:operating-systems", target: "concept:concurrency", relation: "contains" },
	{ source: "course:software-engineering", target: "concept:rest-apis", relation: "contains" },
	{ source: "concept:graph-traversal", target: "project:studyblocks-ai", relation: "applied_in" },
	{ source: "concept:concurrency", target: "project:studyblocks-ai", relation: "applied_in" },
	{ source: "concept:rest-apis", target: "project:studyblocks-ai", relation: "applied_in" },
	{ source: "concept:rest-apis", target: "project:forno", relation: "applied_in" },
	{ source: "concept:data-visualization", target: "project:surveynest", relation: "applied_in" },
	{ source: "project:studyblocks-ai", target: "technology:nestjs", relation: "uses" },
	{ source: "project:studyblocks-ai", target: "technology:react", relation: "uses" },
	{ source: "project:surveynest", target: "technology:react", relation: "uses" },
	{ source: "project:forno", target: "technology:typescript", relation: "uses" },
	{ source: "technology:react", target: "technology:typescript", relation: "related_to" },
	{ source: "project:studyblocks-ai", target: "skill:software-engineering", relation: "demonstrates" },
	{ source: "project:surveynest", target: "skill:software-engineering", relation: "demonstrates" },
	{ source: "project:forno", target: "skill:software-engineering", relation: "demonstrates" },
];
