import type { Project } from "@/types/content";

export const projects: Project[] = [
	{
		id: "project:studyblocks-ai",
		slug: "studyblocks-ai",
		name: "StudyBlocksAI",
		kicker: "Connected learning system",
		logo: {
			darkSurface: "/brands/studyblocks/logo-white.svg",
			lightSurface: "/brands/studyblocks/logo.svg",
		},
		videoPath: "/media/studyblocks-ai-showcase.webm",
		summary: "Transforming course material into structured, interactive study experiences using AI.",
		description:
			"A learning platform that turns dense academic material into navigable blocks of knowledge, connecting concepts, practice, and progress in one system.",
		status: "active",
		featured: true,
		featuredOrder: 1,
		year: 2026,
		role: "Product engineer",
		technologies: ["React", "TypeScript", "NestJS", "OpenAI"],
		concepts: ["Knowledge representation", "Graph traversal", "REST APIs", "Asynchronous systems"],
		accent: "#ff6b35",
		links: {},
	},
	{
		id: "project:surveynest",
		slug: "surveynest",
		name: "SurveyNest",
		kicker: "Collaborative analytics",
		logo: {
			darkSurface: "/brands/surveynest/logo-bird.png",
			lightSurface: "/brands/surveynest/logo-bird.png",
			scale: 1.2,
		},
		videoPath: "/media/survey-nest.webm",
		summary: "A collaborative survey platform built to make response data useful at a glance.",
		description:
			"A team-built product spanning survey creation, response collection, metrics, and visual analysis with a responsive React interface.",
		status: "completed",
		featured: true,
		featuredOrder: 3,
		year: 2025,
		role: "Full-stack developer",
		technologies: ["React", "TypeScript", "Firebase", "Firestore"],
		concepts: ["Data visualization", "Client/server architecture", "State management"],
		accent: "#1447e6",
		links: {},
	},
	{
		id: "project:forno",
		slug: "forno",
		name: "Forno",
		kicker: "Restaurant operations SaaS",
		logo: {
			darkSurface: "/brands/forno/logo-white.png",
			lightSurface: "/brands/forno/logo-red.png",
			scale: 1.35,
		},
		videoPath: "/media/forno-showcase.webm",
		summary: "Operational software for restaurants, from protected files to intelligent workflows.",
		description:
			"A professional SaaS platform shaped around real restaurant operations, with dashboards, access-controlled storage, file processing, and AI-assisted features.",
		status: "completed",
		featured: true,
		featuredOrder: 2,
		year: 2025,
		role: "Software developer",
		technologies: ["React", "C#", "ASP.NET Core", "AI"],
		concepts: ["Authorization", "File processing", "Business systems", "REST APIs"],
		accent: "#781f34",
		links: {},
	},
];

export const featuredProjects = projects
	.filter((project) => project.featured)
	.sort((a, b) => (a.featuredOrder ?? Number.MAX_SAFE_INTEGER) - (b.featuredOrder ?? Number.MAX_SAFE_INTEGER));

export const activeProject = projects.find((project) => project.status === "active");
