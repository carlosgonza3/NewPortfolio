"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { assetPath } from "@/lib/asset-path";
import styles from "./AboutPortrait.module.css";

gsap.registerPlugin(useGSAP);

type AboutPortraitProps = {
	image: string;
	imageAlt: string;
};

export function AboutPortrait({ image, imageAlt }: AboutPortraitProps) {
	const root = useRef<HTMLDivElement>(null);
	const card = useRef<HTMLSpanElement>(null);
	const dragStartX = useRef<number | null>(null);
	const dragStartRotation = useRef(0);
	const rotation = useRef(0);
	const suppressClick = useRef(false);
	const hasRevealedHint = useRef(false);
	const hintTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
	const [isFlipped, setIsFlipped] = useState(false);
	const [isHintVisible, setIsHintVisible] = useState(false);

	useEffect(() => () => {
		if (hintTimeout.current) {
			clearTimeout(hintTimeout.current);
		}
	}, []);

	const { contextSafe } = useGSAP(
		() => {
			gsap.set(card.current, {
				rotationY: rotation.current,
				transformPerspective: 1200,
				transformStyle: "preserve-3d",
			});
		},
		{ scope: root },
	);

	// contextSafe registers this event-driven animation for GSAP cleanup; it does not run during render.
	// eslint-disable-next-line react-hooks/refs
	const settle = contextSafe((targetRotation: number) => {
		rotation.current = targetRotation;
		setIsFlipped(Math.abs(Math.round(targetRotation / 180)) % 2 === 1);

		gsap.to(card.current, {
			duration: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 0.72,
			ease: "power3.out",
			overwrite: true,
			rotationY: targetRotation,
		});
	});

	const handleClick = () => {
		if (suppressClick.current) {
			suppressClick.current = false;
			return;
		}

		settle(rotation.current + 180);
	};

	const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
		event.currentTarget.setPointerCapture(event.pointerId);
		dragStartX.current = event.clientX;
		dragStartRotation.current = rotation.current;
		suppressClick.current = false;
		gsap.killTweensOf(card.current);
	};

	const revealHint = () => {
		if (hasRevealedHint.current) {
			return;
		}

		hasRevealedHint.current = true;
		setIsHintVisible(true);
		hintTimeout.current = setTimeout(() => setIsHintVisible(false), 3200);
	};

	const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
		if (dragStartX.current === null || !card.current) {
			return;
		}

		const distance = event.clientX - dragStartX.current;
		const width = event.currentTarget.getBoundingClientRect().width;
		const nextRotation = dragStartRotation.current + (distance / width) * 180;

		if (Math.abs(distance) > 4) {
			suppressClick.current = true;
		}

		rotation.current = nextRotation;
		gsap.set(card.current, { rotationY: nextRotation });
	};

	const finishDrag = (event: PointerEvent<HTMLButtonElement>) => {
		if (dragStartX.current === null) {
			return;
		}

		if (event.currentTarget.hasPointerCapture(event.pointerId)) {
			event.currentTarget.releasePointerCapture(event.pointerId);
		}

		dragStartX.current = null;
		settle(Math.round(rotation.current / 180) * 180);
	};

	return (
		<div className={styles.shell} onPointerEnter={revealHint} ref={root}>
			<button
				aria-label={isFlipped ? "Show Carlos’s portrait" : "Show the CG logo"}
				aria-pressed={isFlipped}
				className={styles.control}
				onClick={handleClick}
				onPointerCancel={finishDrag}
				onPointerDown={handlePointerDown}
				onPointerMove={handlePointerMove}
				onPointerUp={finishDrag}
				type="button"
			>
				<span className={styles.card} ref={card}>
					<span aria-hidden={isFlipped} className={`${styles.face} ${styles.front}`}>
						{image ? (
							<Image
								alt={imageAlt}
								className={styles.image}
								draggable={false}
								fill
								sizes="(max-width: 980px) 100vw, 34vw"
								src={assetPath(image)}
							/>
						) : (
							<span className={styles.placeholder} aria-hidden="true">
								<span>C</span>
								<span>G</span>
							</span>
						)}
					</span>
					<span aria-hidden={!isFlipped} className={`${styles.face} ${styles.back}`}>
						<span className={styles.logo} aria-label="CG">
							CG<span aria-hidden="true">.</span>
						</span>
					</span>
				</span>
			</button>
			{isHintVisible ? <span className={styles.hint} aria-hidden="true">Click or drag to flip</span> : null}
		</div>
	);
}
