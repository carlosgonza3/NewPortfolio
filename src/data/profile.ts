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
		"My work moves between frontend craft, backend architecture, and intelligent systems. I like understanding how a system works all the way down—then making that understanding useful to someone else.",
	eyebrow: "Engineer · collaborator · perpetual student",
	meta: [
		{ label: "Based in", value: "Montreal, Canada" },
		{ label: "Focused on", value: "Software engineering" },
		{ label: "Current mode", value: "Building & learning" },
	],
	title: "I care about the invisible decisions that make software feel obvious.",
} as const;
