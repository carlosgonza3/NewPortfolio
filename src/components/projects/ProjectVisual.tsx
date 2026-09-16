import type { Project } from "@/types/content";
import { ProjectVideo } from "@/components/projects/ProjectVideo";
import { assetPath } from "@/lib/asset-path";

export function ProjectVisual({ project }: { project: Project }) {
	if (project.slug === "studyblocks-ai") {
		return (
			<div className="project-visual project-visual--study">
				<ProjectVideo src={assetPath("/media/studyblocks-ai-showcase.mp4")} />
			</div>
		);
	}

	if (project.slug === "surveynest") {
		return (
			<div className="project-visual project-visual--survey">
				<ProjectVideo src={assetPath("/media/suurveynest-demo-new.mp4")} />
			</div>
		);
	}

	return (
		<div className="project-visual project-visual--forno">
			<ProjectVideo src={assetPath("/media/forno-showcase.mp4")} />
		</div>
	);
}
