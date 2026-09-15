import type { Project } from "@/types/content";

export function ProjectVisual({ project }: { project: Project }) {
	if (project.slug === "studyblocks-ai") {
		return (
			<div className="project-visual project-visual--study" aria-hidden="true">
				<div className="study-shell">
					<div className="study-top"><span /><span /><span /></div>
					<div className="study-sidebar">
						<span className="study-logo">S</span>
						<span /><span /><span /><span />
					</div>
					<div className="study-canvas">
						<p>Operating Systems</p>
						<h3>How does concurrency work?</h3>
						<div className="concept-row">
							<span>Processes</span><i /> <span>Threads</span><i /> <span>Scheduling</span>
						</div>
						<div className="study-grid"><span /><span /><span /></div>
					</div>
				</div>
			</div>
		);
	}

	if (project.slug === "surveynest") {
		return (
			<div className="project-visual project-visual--survey" aria-hidden="true">
				<div className="survey-card">
					<div className="survey-heading"><span>SurveyNest</span><i /></div>
					<div className="survey-stat"><p>Responses</p><strong>2,408</strong><span>↗ 18.4%</span></div>
					<div className="survey-chart"><i /><i /><i /><i /><i /><i /><i /></div>
					<div className="survey-legend"><span>Very satisfied</span><span>Satisfied</span><span>Neutral</span></div>
				</div>
			</div>
		);
	}

	return (
		<div className="project-visual project-visual--forno" aria-hidden="true">
			<div className="forno-phone">
				<div className="forno-header"><span>forno</span><i /></div>
				<p>Good morning, Carlos</p>
				<h3>Today&apos;s operations</h3>
				<div className="forno-score"><strong>92</strong><span>Kitchen health<br />Excellent</span></div>
				<div className="forno-tasks"><span>Inventory review <i>Done</i></span><span>Team briefing <i>10:30</i></span><span>Supplier order <i>Open</i></span></div>
			</div>
		</div>
	);
}
