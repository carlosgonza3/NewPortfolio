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
