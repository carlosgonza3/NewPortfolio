"use client";

import { Info } from "lucide-react";
import { useEffect, useRef } from "react";

export function ProjectVideo({ src }: { src: string }) {
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
		const updatePlayback = () => {
			if (motionPreference.matches) {
				video.pause();
				video.currentTime = 0;
				return;
			}

			void video.play().catch(() => undefined);
		};

		updatePlayback();
		motionPreference.addEventListener("change", updatePlayback);

		return () => {
			motionPreference.removeEventListener("change", updatePlayback);
			video.pause();
		};
	}, []);

	return (
		<>
			<video
				aria-hidden="true"
				className="project-visual__video"
				loop
				muted
				playsInline
				preload="metadata"
				ref={videoRef}
			>
				<source src={src} type="video/mp4" />
			</video>
			<a
				aria-label="Demo video made using Raylight"
				className="project-video-credit"
				href="https://www.raylight.app"
				rel="noreferrer"
				target="_blank"
			>
				<span className="project-video-credit__message">Demo videos made using <strong>Raylight</strong></span>
				<span className="project-video-credit__icon" aria-hidden="true"><Info size={15} strokeWidth={1.8} /></span>
			</a>
		</>
	);
}
