import {
	BadgeCheck,
	Blocks,
	Waypoints,
	Wand,
	type LucideIcon
} from "lucide-react";

export type ApproachCapability = {
	icon: LucideIcon;
	title: string;
	description: string;
};

type AboutMedia = {
	image: string;
	imageAlt: string;
};

type AboutExperiencePreview = AboutMedia & {
	detail: string;
	mediaType: "film" | "archive";
	status: string;
	title: string;
};

export type AboutOriginPhoto = AboutMedia & {
	label: string;
	note: string;
	tone?: "volcano" | "coast" | "lake";
};

type AboutProfile = {
	description: string;
	meta: ReadonlyArray<{ label: string; value: string }>;
	title: string;
	portrait: AboutMedia & { caption: string; location: string };
	origin: {
		eyebrow: string;
		title: string;
		body: ReadonlyArray<string>;
		photos: ReadonlyArray<AboutOriginPhoto>;
	};
	interests: {
		eyebrow: string;
		title: string;
		description: string;
		tags: ReadonlyArray<string>;
		widget: {
			caption: string;
			status: string;
			time: string;
		};
	};
	spark: { eyebrow?: string; title: string; body: string };
	creativeWork: {
		eyebrow: string;
		title: string;
		body?: string;
		experiences: ReadonlyArray<{
			description: string;
			period: string;
			previews: ReadonlyArray<AboutExperiencePreview>;
			strength: string;
			title: string;
		}>;
	};
	principle: { quote: string; body: string };
	now: { eyebrow: string; title: string; body: string };
};

export const approachCapabilities: ApproachCapability[] = [
	{
		icon: Waypoints,
		title: "Plan",
		description:
			"I begin by understanding the problem, defining what needs to be built, and dividing the work into clear phases.",
	},
	{
		icon: Blocks,
		title: "Build",
		description:
			"I focus first on the features that make the product useful, making sure the main workflows work before adding polish.",
	},
	{
		icon: Wand,
		title: "Refine",
		description:
			"Once the foundation is working, I improve the interactions, responsive behavior, edge cases, and small details that shape the experience.",
	},
	{
		icon: BadgeCheck,
		title: "Deploy",
		description:
			"I test the complete product, fix what feels unfinished, and prepare it for release without leaving behind half-done work.",
	},
];

export const aboutProfile = {
	description:
		"I’m happiest when I’m making something useful, sharing the process with good people, and giving the smallest details the attention they deserve.",
	meta: [
		{ label: "Originally from", value: "El Salvador" },
		{ label: "Based in", value: "Montréal, Canada" },
		{ label: "Currently", value: "Freelancing & growing" },
		{ label: "Next chapter", value: "A job in Canada" },
	],
	title: "Curious. Optimistic. Intentional.",
	portrait: {
		// Add the image to public/images/about, then use a path such as "/images/about/portrait.jpg".
		image: "/images/about/personal-portrait.jpg",
		imageAlt: "Portrait of Carlos Gonzalez",
		caption: "Carlos Gonzalez",
		location: "Montréal · 2026",
	},
	origin: {
		eyebrow: "Where I come from?",
		title: "Small in size. Rich in character.",
		body: [
			"I grew up in San Salvador, surrounded by a country of volcanoes, lakes, and Pacific beaches. El Salvador may be small in size, but it is a beautiful country.",
			"In 2021, I moved to Canada to study Computer Science. Montréal is home now, although I’m open to wherever the right opportunity takes me in Canada.",
		],
		photos: [
			// Add, remove, or reorder objects; the gallery layout updates automatically.
			{ image: "/images/about/1.jpg", imageAlt: "A beach landscape in El Salvador", label: "Beach Balzamar, La Libertad", note: "Photo by Carlos", tone: "coast" },
			{ image: "/images/about/2.jpg", imageAlt: "A lake surrounded by mountains in El Salvador", label: "Lago de Coatepeque, Santa Ana", note: "Photo by Carlos", tone: "lake" },
			{ image: "/images/about/3.jpg", imageAlt: "A lake surrounded by mountains in El Salvador", label: "Lakes back home", note: "Photo by Carlos", tone: "lake" },
		],
	},
	interests: {
		eyebrow: "Something about me...",
		title: "There’s usually a game on.",
		description:
			"Soccer, Formula 1, Canadiens, Blue Jays, something is live, there’s a good chance it’s playing on my TV.",
		tags: ["FC Barcelona", "Red Bull Racing", "Canadiens", "Blue Jays", "Tennis"],
		widget: {
			caption: "Weekend mode",
			status: "Live",
			time: "90:00",
		},
	},
	spark: {
		// eyebrow: "The first spark",
		title: "It started with blocks and games",
		body: "At school, I discovered Scratch—a programming tool that lets kids build with visual blocks. I would spend hours making games, completely absorbed. That was the moment I understood how much was possible with a computer, and the curiosity has stayed with me ever since.",
	},
	creativeWork: {
		eyebrow: "Experiences that shaped me",
		title: "Some of my strengths...",
		// body: "Directing films, organizing events, and years spent swimming helped me develop the way I lead, collaborate, adapt, and keep improving. These are less a list of achievements than moments that continue to shape how I work.",
		experiences: [
			{
				period: "Film, theatre & video",
				title: "Short films and stage management",
				strength: "Creative direction & coordination",
				description: "I directed two short films with a team of six, turning an idea into a finished seven-minute story. I have also worked as a stage manager across professional theatrical and video productions. These experiences taught me how to communicate a shared vision, coordinate people and moving parts, anticipate what a production needs, and stay composed under pressure.",
				previews: [
					// Add an image path to use a film still, or add another object to render another preview.
					{ image: "", imageAlt: "Still from Carlos’s first short film", title: "Short film 01", detail: "Top-five finalist · Mexico", status: "YouTube link coming soon", mediaType: "film" },
					{ image: "", imageAlt: "Still from Carlos’s second short film", title: "Short film 02", detail: "Top-five finalist · Mexico", status: "YouTube link coming soon", mediaType: "film" },
					{ image: "", imageAlt: "Carlos working as a stage manager", title: "Stage management", detail: "Theatrical · video productions", status: "Professional productions", mediaType: "archive" },
				],
			},
			{
				period: "2019",
				title: "President of Copa San Ignacio SV",
				strength: "Planning & coordination",
				description: "I helped organize a soccer tournament involving around 40 teams. Coordinating the venue, food, schedules, and logistics showed me how much thoughtful preparation matters when many people depend on the same plan.",
				previews: [
					{ image: "", imageAlt: "Copa San Ignacio SV tournament", title: "Copa San Ignacio SV", detail: "Venue · food · logistics", status: "Around 40 teams", mediaType: "archive" },
				],
			},
			{
				period: "2021",
				title: "Planning committee for Congress Revolution",
				strength: "Adaptability & responsibility",
				description: "I was part of the head committee planning a youth conference for more than 600 participants and four international speakers. The event was cancelled shortly before it began because of COVID-19, but the process taught me how to plan at scale, collaborate under pressure, and adapt when circumstances change unexpectedly.",
				previews: [
					{ image: "", imageAlt: "Planning materials for the Revolution youth conference", title: "Revolution", detail: "Four international speakers", status: "600+ expected", mediaType: "archive" },
				],
			},
			{
				period: "Growing up",
				title: "Years spent swimming",
				strength: "Discipline & consistency",
				description: "Swimming was an important part of my childhood. Improving in the pool taught me patience, repetition, and the value of showing up consistently, even when progress is gradual.",
				previews: [
					{ image: "", imageAlt: "Carlos during his years as a swimmer", title: "Life in the pool", detail: "A formative childhood discipline", status: "Personal archive", mediaType: "archive" },
				],
			},
		],
	},
	principle: {
		quote: "If you do it at all, do it right.",
		body: "For me, software is only one aspect. I care about the big picture, ask why, and create experiences from beginning to end. I’ve always admired Apple’s philosophy, and it continues to influence the standard I set for my own work.",
	},
	now: {
		eyebrow: "What’s next",
		title: "Looking for the right team in Canada.",
		body: "Freelancing is teaching me how to listen closely, understand the real problem behind a request, and balance ambitious standards with a client’s goals. Now I’m looking for a role where I can bring that care to a team, keep improving every day, and grow into an even stronger programmer and problem solver.",
	},
} as const satisfies AboutProfile;
