import type { Project } from "@/types/content";
import { ProjectVideo } from "@/components/projects/ProjectVideo";
import { assetPath } from "@/lib/asset-path";

export function ProjectVisual({ project }: { project: Project }) {
	if (project.slug === "studyblocks-ai") {
		return (
			<div className="project-visual project-visual--study">
				<ProjectVideo src={assetPath(project.videoPath)} />
			</div>
		);
	}

	if (project.slug === "surveynest") {
		return (
			<div className="project-visual project-visual--survey">
				<ProjectVideo src={assetPath(project.videoPath)} />
			</div>
		);
	}

	return (
		<div className="project-visual project-visual--forno">
			<ProjectVideo src={assetPath(project.videoPath)} />
		</div>
	);
}
