"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { assetPath } from "@/lib/asset-path";

gsap.registerPlugin(useGSAP);

type AboutPortraitProps = {
	image: string;
	imageAlt: string;
};

export function AboutPortrait({ image, imageAlt }: AboutPortraitProps) {
	const root = useRef<HTMLDivElement>(null);
	const tilt = useRef<HTMLSpanElement>(null);
	const card = useRef<HTMLSpanElement>(null);
	const tiltXTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
	const tiltYTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
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
		(_context, makeContextSafe) => {
			gsap.set(card.current, {
				rotationY: rotation.current,
				transformPerspective: 900,
				transformStyle: "preserve-3d",
				z: 24,
			});

			gsap.set(tilt.current, {
				transformPerspective: 800,
				transformStyle: "preserve-3d",
			});

			if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
				return;
			}

			if (!makeContextSafe) {
				return;
			}

			tiltXTo.current = gsap.quickTo(tilt.current, "rotationX", { duration: 0.48, ease: "power3.out" });
			tiltYTo.current = gsap.quickTo(tilt.current, "rotationY", { duration: 0.48, ease: "power3.out" });

			const trackPointer = makeContextSafe((event: globalThis.PointerEvent) => {
				if (event.pointerType !== "mouse") {
					return;
				}

				const horizontalPosition = (event.clientX / window.innerWidth) * 2 - 1;
				const verticalPosition = (event.clientY / window.innerHeight) * 2 - 1;

				tiltXTo.current?.(verticalPosition * -12);
				tiltYTo.current?.(horizontalPosition * 12);
			});

			const resetTilt = makeContextSafe(() => {
				tiltXTo.current?.(0);
				tiltYTo.current?.(0);
			});

			window.addEventListener("pointermove", trackPointer);
			window.addEventListener("blur", resetTilt);

			return () => {
				window.removeEventListener("pointermove", trackPointer);
				window.removeEventListener("blur", resetTilt);
				tiltXTo.current = null;
				tiltYTo.current = null;
			};
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

	const handlePointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
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

	const handlePointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
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

	const finishDrag = (event: ReactPointerEvent<HTMLButtonElement>) => {
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
		<div className="about-portrait" onPointerEnter={revealHint} ref={root}>
			<button
				aria-label={isFlipped ? "Show Carlos’s portrait" : "Show the CG logo"}
				aria-pressed={isFlipped}
				className="about-portrait__control"
				onClick={handleClick}
				onPointerCancel={finishDrag}
				onPointerDown={handlePointerDown}
				onPointerMove={handlePointerMove}
				onPointerUp={finishDrag}
				type="button"
			>
				<span className="about-portrait__tilt" ref={tilt}>
					<span className="about-portrait__card" ref={card}>
						<span aria-hidden={isFlipped} className="about-portrait__face about-portrait__front">
							{image ? (
								<Image
									alt={imageAlt}
									className="about-portrait__image"
									draggable={false}
									fill
									sizes="(max-width: 980px) 100vw, 34vw"
									src={assetPath(image)}
								/>
							) : (
								<span className="about-portrait__placeholder" aria-hidden="true">
									<span>C</span>
									<span>G</span>
								</span>
							)}
						</span>
						<span aria-hidden={!isFlipped} className="about-portrait__face about-portrait__back">
							<span className="about-portrait__logo" aria-label="CG">
								CG<span aria-hidden="true">.</span>
							</span>
						</span>
					</span>
				</span>
			</button>
			{isHintVisible ? <span className="about-portrait__hint" aria-hidden="true">Click or drag to flip</span> : null}
		</div>
	);
}
