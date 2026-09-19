"use client";

import { ArrowUpRight, ChevronDown, Minus, Play, Plus } from "lucide-react";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import type { FreelanceProject } from "@/data/freelance-projects";

type FreelanceSequenceDetail = {
	isComplete: boolean;
	activeIndex: number | null;
	revealedCount: number;
};

function ProjectDescription({ isActive, text }: { isActive: boolean; text: string }) {
	const [isExpanded, setIsExpanded] = useState(false);
	const [canExpand, setCanExpand] = useState(false);
	const textRef = useRef<HTMLParagraphElement>(null);

	useLayoutEffect(() => {
		if (isExpanded) return;
		const textElement = textRef.current;
		if (!textElement) return;

		const checkOverflow = () => setCanExpand(textElement.scrollHeight > textElement.clientHeight + 1);
		const frame = window.requestAnimationFrame(checkOverflow);
		const resizeObserver = new ResizeObserver(checkOverflow);
		resizeObserver.observe(textElement);
		return () => {
			window.cancelAnimationFrame(frame);
			resizeObserver.disconnect();
		};
	}, [isActive, isExpanded, text]);

	return (
		<div className="freelance-card__description">
			<p className={isExpanded ? "is-expanded" : ""} ref={textRef}>{text}</p>
			{canExpand ? (
				<button
					aria-expanded={isExpanded}
					onClick={(event) => {
						event.stopPropagation();
						setIsExpanded((current) => !current);
					}}
					type="button"
				>
					{isExpanded ? "View less" : "View more"}
					<ChevronDown aria-hidden="true" size={14} />
				</button>
			) : null}
		</div>
	);
}

export function FreelanceGrid({ projects }: { projects: FreelanceProject[] }) {
	const [manualActiveId, setManualActiveId] = useState<string | null | undefined>(undefined);
	const [sequence, setSequence] = useState({
		isComplete: false,
		activeId: null as string | null,
		enabled: false,
		revealedCount: projects.length,
	});
	const gridRef = useRef<HTMLDivElement>(null);
	const activeId = manualActiveId === undefined ? sequence.activeId : manualActiveId;
	const activeIndex = projects.findIndex((project) => project.id === activeId);

	useEffect(() => {
		const closeOnEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") setManualActiveId(null);
		};

		window.addEventListener("keydown", closeOnEscape);
		return () => window.removeEventListener("keydown", closeOnEscape);
	}, []);

	useLayoutEffect(() => {
		const grid = gridRef.current;
		if (!grid) return;

		const updateSequence = (event: Event) => {
			const { activeIndex: nextActiveIndex, revealedCount, isComplete } = (event as CustomEvent<FreelanceSequenceDetail>).detail;
			setManualActiveId(undefined);
			setSequence({
				isComplete,
				activeId: nextActiveIndex === null ? null : (projects[nextActiveIndex]?.id ?? null),
				enabled: true,
				revealedCount,
			});
		};

		const resetSequence = () => {
			setManualActiveId(undefined);
			setSequence({ activeId: null, enabled: false, revealedCount: projects.length, isComplete: false });
		};

		grid.addEventListener("freelance-sequence", updateSequence);
		grid.addEventListener("freelance-sequence-reset", resetSequence);
		return () => {
			grid.removeEventListener("freelance-sequence", updateSequence);
			grid.removeEventListener("freelance-sequence-reset", resetSequence);
		};
	}, [projects]);

	useEffect(() => {
		const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
		const updateVideoPlayback = () => {
			gridRef.current?.querySelectorAll("video").forEach((video) => {
				const card = video.closest("[data-freelance-card]");
				const shouldPlay = !motionPreference.matches && card?.classList.contains("is-active");

				if (!shouldPlay) {
					video.pause();
					return;
				}

				void video.play().catch(() => undefined);
			});
		};

		updateVideoPlayback();
		motionPreference.addEventListener("change", updateVideoPlayback);
		return () => motionPreference.removeEventListener("change", updateVideoPlayback);
	}, [activeId]);

	return (
		<div
			className={`freelance-grid${activeId ? " has-active-card" : ""}${sequence.enabled ? " is-scroll-sequenced" : ""}${sequence.isComplete && !activeId ? " is-sequence-complete" : ""}`}
			data-active-index={activeIndex >= 0 ? activeIndex : undefined}
			data-freelance-grid
			data-revealed-count={sequence.enabled ? sequence.revealedCount : projects.length}
			ref={gridRef}
		>
			{projects.map((project, index) => {
				const isActive = project.id === activeId;
				const isRevealed = !sequence.enabled || index < sequence.revealedCount;
				const isAdjacent = activeIndex >= 0 && Math.abs(index - activeIndex) === 1;
				const isCollapsed = activeIndex >= 0 && !isActive && !isAdjacent;

				return (
					<article
						aria-hidden={!isRevealed}
						className={`freelance-card${isActive ? " is-active" : ""}${isAdjacent ? " is-adjacent" : ""}${isCollapsed ? " is-collapsed" : ""}${isRevealed ? " is-revealed" : ""}`}
						data-freelance-card
						key={project.id}
						style={{
							"--freelance-accent": project.accent,
							"--freelance-card-color": project.cardColor,
						} as CSSProperties}
					>
						<button
							aria-label={`${isActive ? "Collapse" : "Expand"} ${project.name}`}
							aria-expanded={isActive}
							aria-controls={`freelance-details-${index}`}
							className="freelance-card__toggle"
							onClick={() => setManualActiveId(isActive ? null : project.id)}
							tabIndex={isRevealed ? 0 : -1}
							type="button"
						>
							<span className="freelance-card__heading">
								<span className="freelance-card__name">{project.name}</span>
								<span className="freelance-card__icon" aria-hidden="true">
									{isActive ? <Minus size={17} /> : <Plus size={17} />}
								</span>
							</span>
							<span className="freelance-card__media" aria-hidden="true">
								{project.logoPath ? (
									<Image
										alt={project.logoAlt}
										className="freelance-card__logo-image"
										fill
										sizes="(max-width: 720px) 38vw, 16vw"
										src={project.logoPath}
									/>
								) : (
									<span className="freelance-card__media-placeholder">
										<span>{project.logoFallback}</span>
									</span>
								)}
							</span>
						</button>
						<div className="freelance-card__expanded-media" aria-hidden="true">
							{project.videoPath ? (
								<video loop muted playsInline preload="metadata" src={project.videoPath} />
							) : (
								<span className="freelance-card__video-placeholder">
									<Play fill="currentColor" size={18} />
									Project video
								</span>
							)}
						</div>

						<div
							aria-hidden={!isActive}
							className="freelance-card__details"
							id={`freelance-details-${index}`}
						>
							<div className="freelance-card__details-inner">
								<ProjectDescription isActive={isActive} key={`${project.id}-${isActive}`} text={project.description} />
								<dl>
									<div className="freelance-card__status"><dt>Status</dt><dd>{project.status}</dd></div>
									<div className="freelance-card__technologies">
										<dt>Technologies</dt>
										<dd>
											{project.technologies.length ? (
												<ul>
													{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
												</ul>
											) : "To be added"}
										</dd>
									</div>
								</dl>
								{project.visitHref ? (
									<a href={project.visitHref} tabIndex={isActive ? 0 : -1} target="_blank" rel="noreferrer">
										Visit website <ArrowUpRight aria-hidden="true" size={16} />
									</a>
								) : null}
							</div>
						</div>
					</article>
				);
			})}
		</div>
	);
}
