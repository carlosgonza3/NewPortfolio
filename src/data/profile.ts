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

type AboutProfile = {
	description: string;
	meta: ReadonlyArray<{ label: string; value: string }>;
	title: string;
	portrait: AboutMedia & { caption: string; location: string };
	origin: {
		eyebrow: string;
		title: string;
		body: ReadonlyArray<string>;
		photos: ReadonlyArray<AboutMedia & { label: string; note: string; tone?: "volcano" | "coast" | "lake" }>;
	};
	interests: {
		eyebrow: string;
		title: string;
		description: string;
		tags: ReadonlyArray<string>;
	};
	spark: { eyebrow: string; title: string; body: string };
	creativeWork: {
		eyebrow: string;
		title: string;
		body: string;
		films: ReadonlyArray<AboutMedia & { title: string; detail: string; status: string }>;
	};
	principle: { quote: string; body: string };
	now: { eyebrow: string; title: string; body: string };
};

export const approachCapabilities: ApproachCapability[] = [
	{
		icon: Waypoints,
		title: "Plan the work",
		description:
			"I begin by understanding the problem, defining what needs to be built, and dividing the work into clear phases.",
	},
	{
		icon: Blocks,
		title: "Build the core",
		description:
			"I focus first on the features that make the product useful, making sure the main workflows work before adding polish.",
	},
	{
		icon: Wand,
		title: "Refine the details",
		description:
			"Once the foundation is working, I improve the interactions, responsive behavior, edge cases, and small details that shape the experience.",
	},
	{
		icon: BadgeCheck,
		title: "Finish it properly",
		description:
			"I test the complete product, fix what feels unfinished, and prepare it for release without leaving behind half-done work.",
	},
];

export const aboutProfile = {
	description:
		"I’m happiest when I’m making something useful, sharing the process with good people, and giving the smallest details the attention they deserve.",
	meta: [
		{ label: "Based in", value: "Montréal, Canada" },
		{ label: "Originally from", value: "El Salvador" },
		{ label: "Currently", value: "Freelancing & growing" },
		{ label: "Next chapter", value: "A job in Canada" },
	],
	title: "Curious. Optimistic. Always improving.",
	portrait: {
		// Add the image to public/images/about, then use a path such as "/images/about/portrait.jpg".
		image: "/images/about/personal-portrait.jpg",
		imageAlt: "Portrait of Carlos Gonzalez",
		caption: "Carlos Gonzalez",
		location: "Montréal · 2026",
	},
	origin: {
		eyebrow: "Where I come from",
		title: "Small country. Big perspective.",
		body: [
			"I grew up in San Salvador, surrounded by a country of volcanoes, lakes, and Pacific beaches. El Salvador may be small, but it is full of color, energy, and places that stay with you.",
			"In 2021, I moved to Canada to study Computer Science. Montréal is home now, although I’m open to wherever the right opportunity takes me in Canada.",
		],
		photos: [
			// Add, remove, or reorder objects; the gallery layout updates automatically.
			{ image: "", imageAlt: "A volcanic landscape in El Salvador", label: "Volcanic horizons", note: "Photo by Carlos", tone: "volcano" },
			{ image: "", imageAlt: "The Pacific coast of El Salvador", label: "The Pacific coast", note: "Photo by Carlos", tone: "coast" },
			{ image: "", imageAlt: "A lake surrounded by mountains in El Salvador", label: "Lakes back home", note: "Photo by Carlos", tone: "lake" },
		],
	},
	interests: {
		eyebrow: "Away from the keyboard",
		title: "There’s usually a game on.",
		description:
			"Soccer, Formula 1, hockey, baseball—if something is live, there’s a good chance it’s playing on my TV. I’m a Barcelona supporter and a Red Bull Racing fan, but the best part is always sharing the moment with friends and family.",
		tags: ["FC Barcelona", "Red Bull Racing", "Hockey", "Baseball", "New food", "Good company"],
	},
	spark: {
		eyebrow: "The first spark",
		title: "It started with blocks, games, and no sense of time.",
		body: "At school, I discovered Scratch—a programming tool that lets kids build with visual blocks. I would spend hours making games, completely absorbed. That was the moment I understood how much was possible with a computer, and the curiosity has stayed with me ever since.",
	},
	creativeWork: {
		eyebrow: "Before the browser",
		title: "I learned to shape experiences through film and events.",
		body: "I used to edit videos in Final Cut Pro and directed two short films for a competition in Mexico. Both placed in the top five, two years in a row. Back in El Salvador, I also helped plan a large soccer tournament and a youth conference—experiences that taught me how much better ideas become when a team builds them together.",
		films: [
			// Add an image path to use a film still, or add another object to render another card.
			{ image: "", imageAlt: "Still from Carlos’s first short film", title: "Short film 01", detail: "Top-five finalist · Mexico", status: "YouTube link coming soon" },
			{ image: "", imageAlt: "Still from Carlos’s second short film", title: "Short film 02", detail: "Top-five finalist · Mexico", status: "YouTube link coming soon" },
		],
	},
	principle: {
		quote: "If I’m going to do something, I want to do the best I can with it.",
		body: "For me, working software is only the beginning. I care about how it looks, how it feels, and whether the whole experience has been considered from beginning to end. I’ve always admired that philosophy in Apple’s products, and it continues to influence the standard I set for my own work.",
	},
	now: {
		eyebrow: "What’s next",
		title: "Looking for the right team in Canada.",
		body: "Freelancing is teaching me how to listen closely, understand the real problem behind a request, and balance ambitious standards with a client’s goals. Now I’m looking for a role where I can bring that care to a team, keep improving every day, and grow into an even stronger programmer and problem solver.",
	},
} as const satisfies AboutProfile;
