import freelanceProjectData from "./freelance-projects.json";

export type FreelanceProject = {
	id: string;
	name: string;
	description: string;
	status: "In development" | "Delivered";
	technologies: string[];
	visitHref: string;
	cardColor: string;
	accent: string;
	logoPath: string;
	logoAlt: string;
	logoFallback: string;
	videoPath: string;
};

type FreelanceProjectFile = {
	assetGuide: Record<string, string>;
	projects: FreelanceProject[];
};

export const freelanceProjects = (freelanceProjectData as FreelanceProjectFile).projects;
