"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ReactNode } from "react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const activatePhase = (root: HTMLElement, phaseName: string) => {
	root.querySelectorAll<HTMLElement>("[data-phase-dot]").forEach((label) => {
		const isActive = label.dataset.phaseDot === phaseName;
		label.classList.toggle("is-active", isActive);
		gsap.to(label, {
			color: isActive ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.38)",
			duration: 0.24,
			ease: "power2.out",
			x: isActive ? 0 : 5.6,
			overwrite: true,
		});
	});
};

const scenePhase = (scene: HTMLElement) =>
	scene.closest<HTMLElement>("[data-phase-group]")?.dataset.phaseGroup ?? "hero";

const sceneCallbacks = (root: HTMLElement, scene: HTMLElement) => ({
	onEnter: () => activatePhase(root, scenePhase(scene)),
	onEnterBack: () => activatePhase(root, scenePhase(scene)),
});

const centerOffset = (element: HTMLElement, container: HTMLElement) => {
	const elementBounds = element.getBoundingClientRect();
	const containerBounds = container.getBoundingClientRect();

	return {
		x: containerBounds.left + containerBounds.width / 2 - (elementBounds.left + elementBounds.width / 2),
		y: containerBounds.top + containerBounds.height / 2 - (elementBounds.top + elementBounds.height / 2),
	};
};

export function HomeExperience({ children }: { children: ReactNode }) {
	const scope = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const root = scope.current;
			if (!root) return;

			const media = gsap.matchMedia();
			const cardPointerCleanups: Array<() => void> = [];
			const heroSurface = root.querySelector<HTMLElement>("[data-scroll-scene='hero']");
			const stars = Array.from(root.querySelectorAll<HTMLElement>(".hero-stars span")).map((element) => ({
				depth: Number(element.dataset.starDepth ?? 1),
				element,
				peak: Number(element.dataset.starPeak ?? 0.4),
				x: Number(element.dataset.starX ?? 0),
				y: Number(element.dataset.starY ?? 0),
			}));
			const supportsMeshInteraction = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
			let meshFrame: number | null = null;
			let meshPointer: { x: number; y: number } | null = null;
			let orbPosition = { x: 0.72, y: 0.38 };
			let orbTarget = { x: 0.72, y: 0.38 };
			let cloudNearPosition = { x: 0, y: 0 };
			let cloudNearTarget = { x: 0, y: 0 };
			let cloudFarPosition = { x: 0, y: 0 };
			let cloudFarTarget = { x: 0, y: 0 };
			let sundownWarmPosition = { x: 0, y: 0 };
			let sundownWarmTarget = { x: 0, y: 0 };
			let sundownRosePosition = { x: 0, y: 0 };
			let sundownRoseTarget = { x: 0, y: 0 };
			let sundownVioletPosition = { x: 0, y: 0 };
			let sundownVioletTarget = { x: 0, y: 0 };

			const updateMesh = () => {
				if (!heroSurface) return;

				if (meshPointer) {
					const { x, y } = meshPointer;
					const normalizedX = x - 0.5;
					const normalizedY = y - 0.5;

					heroSurface.style.setProperty("--mesh-x", `${x * 100}%`);
					heroSurface.style.setProperty("--mesh-y", `${y * 100}%`);
					heroSurface.style.setProperty("--mesh-rotate-x", `${normalizedY * -1.4}deg`);
					heroSurface.style.setProperty("--mesh-rotate-y", `${normalizedX * 1.8}deg`);
					heroSurface.style.setProperty("--mesh-shift-x", `${normalizedX * 8}px`);
					heroSurface.style.setProperty("--mesh-shift-y", `${normalizedY * 7}px`);

				}

				orbPosition = {
					x: orbPosition.x + (orbTarget.x - orbPosition.x) * 0.055,
					y: orbPosition.y + (orbTarget.y - orbPosition.y) * 0.055,
				};
				cloudNearPosition = {
					x: cloudNearPosition.x + (cloudNearTarget.x - cloudNearPosition.x) * 0.035,
					y: cloudNearPosition.y + (cloudNearTarget.y - cloudNearPosition.y) * 0.035,
				};
				cloudFarPosition = {
					x: cloudFarPosition.x + (cloudFarTarget.x - cloudFarPosition.x) * 0.022,
					y: cloudFarPosition.y + (cloudFarTarget.y - cloudFarPosition.y) * 0.022,
				};
				sundownWarmPosition = {
					x: sundownWarmPosition.x + (sundownWarmTarget.x - sundownWarmPosition.x) * 0.052,
					y: sundownWarmPosition.y + (sundownWarmTarget.y - sundownWarmPosition.y) * 0.052,
				};
				sundownRosePosition = {
					x: sundownRosePosition.x + (sundownRoseTarget.x - sundownRosePosition.x) * 0.038,
					y: sundownRosePosition.y + (sundownRoseTarget.y - sundownRosePosition.y) * 0.038,
				};
				sundownVioletPosition = {
					x: sundownVioletPosition.x + (sundownVioletTarget.x - sundownVioletPosition.x) * 0.028,
					y: sundownVioletPosition.y + (sundownVioletTarget.y - sundownVioletPosition.y) * 0.028,
				};
				heroSurface.style.setProperty("--orb-x", `${orbPosition.x * 100}%`);
				heroSurface.style.setProperty("--orb-y", `${orbPosition.y * 100}%`);
				heroSurface.style.setProperty("--cloud-near-x", `${cloudNearPosition.x}px`);
				heroSurface.style.setProperty("--cloud-near-y", `${cloudNearPosition.y}px`);
				heroSurface.style.setProperty("--cloud-far-x", `${cloudFarPosition.x}px`);
				heroSurface.style.setProperty("--cloud-far-y", `${cloudFarPosition.y}px`);
				heroSurface.style.setProperty("--sundown-warm-x", `${sundownWarmPosition.x}px`);
				heroSurface.style.setProperty("--sundown-warm-y", `${sundownWarmPosition.y}px`);
				heroSurface.style.setProperty("--sundown-rose-x", `${sundownRosePosition.x}px`);
				heroSurface.style.setProperty("--sundown-rose-y", `${sundownRosePosition.y}px`);
				heroSurface.style.setProperty("--sundown-violet-x", `${sundownVioletPosition.x}px`);
				heroSurface.style.setProperty("--sundown-violet-y", `${sundownVioletPosition.y}px`);

				const isAmbientMoving =
					Math.abs(orbTarget.x - orbPosition.x) > 0.0004 ||
					Math.abs(orbTarget.y - orbPosition.y) > 0.0004 ||
					Math.abs(cloudNearTarget.x - cloudNearPosition.x) > 0.04 ||
					Math.abs(cloudNearTarget.y - cloudNearPosition.y) > 0.04 ||
					Math.abs(cloudFarTarget.x - cloudFarPosition.x) > 0.04 ||
					Math.abs(cloudFarTarget.y - cloudFarPosition.y) > 0.04 ||
					Math.abs(sundownWarmTarget.x - sundownWarmPosition.x) > 0.05 ||
					Math.abs(sundownWarmTarget.y - sundownWarmPosition.y) > 0.05 ||
					Math.abs(sundownRoseTarget.x - sundownRosePosition.x) > 0.05 ||
					Math.abs(sundownRoseTarget.y - sundownRosePosition.y) > 0.05 ||
					Math.abs(sundownVioletTarget.x - sundownVioletPosition.x) > 0.05 ||
					Math.abs(sundownVioletTarget.y - sundownVioletPosition.y) > 0.05;
				meshFrame = isAmbientMoving ? window.requestAnimationFrame(updateMesh) : null;
			};

			const updateStars = (x: number, y: number) => {
				const normalizedX = x - 0.5;
				const normalizedY = y - 0.5;
				stars.forEach((star) => {
					const distance = Math.hypot((x - star.x) * 1.45, y - star.y);
					const proximity = Math.max(0, 1 - distance / 0.24);
					star.element.style.setProperty("--star-cursor-glow", (proximity * 0.72).toFixed(3));
					star.element.style.setProperty("--star-peak", Math.min(0.96, star.peak + proximity * 0.36).toFixed(3));
					star.element.style.setProperty("--star-parallax-x", `${normalizedX * star.depth * 2.6}px`);
					star.element.style.setProperty("--star-parallax-y", `${normalizedY * star.depth * 2}px`);
				});
			};

			const handleMeshPointer = (event: PointerEvent) => {
				if (!heroSurface) return;
				const bounds = heroSurface.getBoundingClientRect();
				meshPointer = {
					x: Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width)),
					y: Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height)),
				};
				orbTarget = {
					x: 0.72 + (meshPointer.x - 0.5) * 0.14,
					y: 0.38 + (meshPointer.y - 0.5) * 0.1,
				};
				cloudNearTarget = {
					x: (meshPointer.x - 0.5) * 34,
					y: (meshPointer.y - 0.5) * 22,
				};
				cloudFarTarget = {
					x: (meshPointer.x - 0.5) * -18,
					y: (meshPointer.y - 0.5) * -12,
				};
				sundownWarmTarget = {
					x: (meshPointer.x - 0.5) * 104,
					y: (meshPointer.y - 0.5) * 72,
				};
				sundownRoseTarget = {
					x: (meshPointer.x - 0.5) * -82,
					y: (meshPointer.y - 0.5) * 48,
				};
				sundownVioletTarget = {
					x: (meshPointer.x - 0.5) * 58,
					y: (meshPointer.y - 0.5) * -64,
				};
				updateStars(meshPointer.x, meshPointer.y);
				if (meshFrame === null) meshFrame = window.requestAnimationFrame(updateMesh);
			};

			const resetMesh = () => {
				if (!heroSurface) return;
				meshPointer = null;
				orbTarget = { x: 0.72, y: 0.38 };
				cloudNearTarget = { x: 0, y: 0 };
				cloudFarTarget = { x: 0, y: 0 };
				sundownWarmTarget = { x: 0, y: 0 };
				sundownRoseTarget = { x: 0, y: 0 };
				sundownVioletTarget = { x: 0, y: 0 };
				heroSurface.style.setProperty("--mesh-x", "50%");
				heroSurface.style.setProperty("--mesh-y", "50%");
				heroSurface.style.setProperty("--mesh-rotate-x", "0deg");
				heroSurface.style.setProperty("--mesh-rotate-y", "0deg");
				heroSurface.style.setProperty("--mesh-shift-x", "0px");
				heroSurface.style.setProperty("--mesh-shift-y", "0px");
				stars.forEach((star) => {
					star.element.style.setProperty("--star-cursor-glow", "0");
					star.element.style.setProperty("--star-peak", `${star.peak}`);
					star.element.style.setProperty("--star-parallax-x", "0px");
					star.element.style.setProperty("--star-parallax-y", "0px");
				});
				if (meshFrame === null) meshFrame = window.requestAnimationFrame(updateMesh);
			};

			if (heroSurface && supportsMeshInteraction.matches) {
				heroSurface.addEventListener("pointermove", handleMeshPointer, { passive: true });
				heroSurface.addEventListener("pointerleave", resetMesh);
			}

			media.add("(min-width: 981px) and (prefers-reduced-motion: no-preference)", () => {
				root.classList.add("is-continuous-ready");
				activatePhase(root, "hero");

				const rail = root.querySelector<HTMLElement>(".phase-rail");
				const railProgress = root.querySelector<HTMLElement>(".phase-rail__track i");

				if (rail) gsap.set(rail, { autoAlpha: 0, x: 14 });
				if (railProgress) {
					gsap.set(railProgress, { scaleY: 0 });
					gsap.to(railProgress, {
						ease: "none",
						scaleY: 1,
						scrollTrigger: {
							start: 0,
							end: "max",
							invalidateOnRefresh: true,
							refreshPriority: -100,
							scrub: 0.35,
						},
					});
				}

				const hero = root.querySelector<HTMLElement>("[data-scroll-scene='hero']");
				if (hero) {
					const headline = gsap.utils.toArray<HTMLElement>(hero.querySelectorAll("[data-hero-headline]"));
					const intro = hero.querySelector<HTMLElement>("[data-hero-intro]");
					const actions = hero.querySelector<HTMLElement>("[data-hero-actions]");
					const details = gsap.utils.toArray<HTMLElement>(hero.querySelectorAll("[data-hero-detail]"));
					const introStart = intro ? centerOffset(intro, hero) : { x: 0, y: 0 };

					gsap.set(headline, { autoAlpha: 0, rotateX: 6, y: 64 });
					if (intro) gsap.set(intro, { autoAlpha: 1, scale: 1.06, x: introStart.x, y: introStart.y });
					if (actions) gsap.set(actions, { autoAlpha: 0, y: 24 });
					gsap.set(details, { autoAlpha: 0, y: 18 });

					gsap.timeline({
						defaults: { ease: "power3.out" },
						scrollTrigger: {
							trigger: hero,
							start: "top top",
							end: () => `+=${Math.round(window.innerHeight * 1.55)}`,
							pin: true,
							scrub: 0.75,
							snap: {
								snapTo: "labelsDirectional",
								duration: { min: 0.2, max: 0.42 },
								delay: 0.08,
								ease: "power2.inOut",
							},
							anticipatePin: 1,
							invalidateOnRefresh: true,
							...sceneCallbacks(root, hero),
						},
					})
						.addLabel("introduction", 0)
						.to({}, { duration: 0.14 })
						.addLabel("statement")
						.to(intro, { duration: 0.48, scale: 1, x: 0, y: 0 }, "statement")
						.to(headline, { autoAlpha: 1, duration: 0.5, rotateX: 0, stagger: 0.07, y: 0 }, "statement+=0.04")
						.to({}, { duration: 0.12 })
						.addLabel("actions")
						.to(actions, { autoAlpha: 1, duration: 0.34, y: 0 }, "actions")
						.to(details, { autoAlpha: 1, duration: 0.3, stagger: 0.06, y: 0 }, "actions+=0.05")
						.to(rail, { autoAlpha: 1, duration: 0.28, x: 0 }, "actions+=0.08")
						.to({}, { duration: 0.16 })
						.addLabel("complete");

				}

				const approach = root.querySelector<HTMLElement>("[data-scroll-scene='approach']");
				if (approach) {
					const primary = gsap.utils.toArray<HTMLElement>(approach.querySelectorAll("[data-approach-primary]"));
					const supportingCopy = gsap.utils.toArray<HTMLElement>(approach.querySelectorAll(".thesis-copy [data-approach-detail]"));
					const cards = gsap.utils.toArray<HTMLElement>(approach.querySelectorAll("[data-approach-card]"));
					const cardSelectors = cards.map((card) => card.querySelector<HTMLButtonElement>("[data-approach-card-select]"));
					const cardSurfaces = cards.map((card) => card.querySelector<HTMLElement>("[data-approach-card-surface]"));
					const cardBodies = cards.map((card) => card.querySelector<HTMLElement>("[data-approach-card-body]"));
					const cardMarks = cards.map((card) => card.querySelector<HTMLElement>(".capability-card__mark i:last-child"));
					const availableCardBodies = cardBodies.filter((body): body is HTMLElement => body !== null);
					const availableCardMarks = cardMarks.filter((mark): mark is HTMLElement => mark !== null);
					const rangeProgress = approach.querySelector<HTMLElement>("[data-approach-progress]");
					const problemEmphasis = approach.querySelector<HTMLElement>("[data-approach-emphasis='problem']");
					const productEmphasis = approach.querySelector<HTMLElement>("[data-approach-emphasis='product']");
					const updateTitleEmphasis = (activeIndex: number) => {
						problemEmphasis?.classList.toggle("is-emphasized", activeIndex === 0);
						productEmphasis?.classList.toggle("is-emphasized", activeIndex === cards.length - 1);
					};
					const updateActiveCard = (activeIndex: number) => {
						cardSelectors.forEach((selector, index) => {
							selector?.setAttribute("aria-pressed", String(index === activeIndex));
						});
						updateTitleEmphasis(activeIndex);
					};

					gsap.set(primary, {
						autoAlpha: 0,
						filter: "blur(10px)",
						rotateX: 11,
						scale: 0.975,
						transformOrigin: "left bottom",
						y: 92,
					});
					gsap.set(supportingCopy, { autoAlpha: 0, y: 30 });
					gsap.set(cards, {
						"--card-active": 0,
						"--card-hover": 0,
						"--card-pointer-x": 50,
						"--card-pointer-y": 50,
						autoAlpha: 0,
						scale: 0.97,
						y: 42,
					});
					gsap.set(cardSurfaces.filter((surface): surface is HTMLElement => surface !== null), {
						force3D: true,
						rotationX: 0,
						rotationY: 0,
						transformOrigin: "center center",
						transformPerspective: 1400,
					});
					gsap.set(availableCardBodies, { autoAlpha: 0, height: 0 });
					gsap.set(availableCardMarks, { scaleY: 1, transformOrigin: "center" });
					if (rangeProgress) gsap.set(rangeProgress, { scaleX: 0, transformOrigin: "left center" });

					gsap.timeline({
						delay: 0.3,
						scrollTrigger: {
							trigger: approach,
							start: "top 68%",
							toggleActions: "play none none reverse",
							invalidateOnRefresh: true,
						},
					})
						.to(primary, {
							autoAlpha: 1,
							duration: 1.02,
							ease: "power3.out",
							filter: "blur(0px)",
							rotateX: 0,
							scale: 1,
							stagger: 0.08,
							y: 0,
						}, 0)
						.to(supportingCopy, {
							autoAlpha: 1,
							duration: 0.68,
							ease: "power3.out",
							stagger: 0.07,
							y: 0,
						}, 0.25)
						.to(cards, {
							autoAlpha: 1,
							duration: 0.72,
							ease: "power3.out",
							scale: 1,
							stagger: 0.065,
							y: 0,
						}, 0.34);

					if (window.matchMedia("(pointer: fine)").matches) {
						cards.forEach((card, index) => {
							const surface = cardSurfaces[index];
							if (!surface) return;

							const movePointerX = gsap.quickTo(card, "--card-pointer-x", { duration: 0.52, ease: "power3.out" });
							const movePointerY = gsap.quickTo(card, "--card-pointer-y", { duration: 0.52, ease: "power3.out" });
							const showPointer = gsap.quickTo(card, "--card-hover", { duration: 0.32, ease: "power2.out" });
							const tiltCardX = gsap.quickTo(surface, "rotationX", { duration: 0.58, ease: "power3.out" });
							const tiltCardY = gsap.quickTo(surface, "rotationY", { duration: 0.58, ease: "power3.out" });
							let isHovering = false;
							let pointerBounds = card.getBoundingClientRect();

							const updatePointerTarget = (event: PointerEvent) => {
								const relativeX = Math.min(1, Math.max(0, (event.clientX - pointerBounds.left) / pointerBounds.width));
								const relativeY = Math.min(1, Math.max(0, (event.clientY - pointerBounds.top) / pointerBounds.height));
								const centeredX = relativeX - 0.5;
								const centeredY = relativeY - 0.5;
								const activeAmount = Number.parseFloat(getComputedStyle(card).getPropertyValue("--card-active"));

								movePointerX(relativeX * 100);
								movePointerY(relativeY * 100);
								tiltCardX(centeredY * -8);
								tiltCardY(centeredX * 11);
								showPointer(activeAmount >= 0.55 ? 1 : 0);
							};

							const handlePointerEnter = (event: PointerEvent) => {
								isHovering = true;
								pointerBounds = card.getBoundingClientRect();
								updatePointerTarget(event);
							};

							const handlePointerMove = (event: PointerEvent) => {
								if (!isHovering) return;
								updatePointerTarget(event);
							};

							const handlePointerLeave = () => {
								isHovering = false;
								showPointer(0);
								movePointerX(50);
								movePointerY(50);
								tiltCardX(0);
								tiltCardY(0);
							};

							card.addEventListener("pointerenter", handlePointerEnter);
							card.addEventListener("pointermove", handlePointerMove);
							card.addEventListener("pointerleave", handlePointerLeave);
							cardPointerCleanups.push(() => {
								card.removeEventListener("pointerenter", handlePointerEnter);
								card.removeEventListener("pointermove", handlePointerMove);
								card.removeEventListener("pointerleave", handlePointerLeave);
								gsap.killTweensOf(surface, ["rotationX", "rotationY"]);
							});
						});
					}

					const approachTimeline = gsap.timeline({
						scrollTrigger: {
							trigger: approach,
							start: "top top",
							end: () => `+=${Math.round(window.innerHeight * 3.8)}`,
							pin: true,
							scrub: 0.75,
							anticipatePin: 1,
							invalidateOnRefresh: true,
							...sceneCallbacks(root, approach),
						},
					});

					approachTimeline
						.addLabel("approach-intro", 0)
						.to({}, { duration: 0.18 });

					cards.forEach((card, index) => {
						const body = cardBodies[index];
						const mark = cardMarks[index];
						if (!body) return;

						const previousCard = cards[index - 1];
						const previousBody = cardBodies[index - 1];
						const previousMark = cardMarks[index - 1];
						const label = `capability-${index + 1}`;
						const transitionStart = approachTimeline.duration();
						approachTimeline.addLabel(`${label}-start`, transitionStart);

						if (previousCard && previousBody) {
							approachTimeline
								.to(previousBody, { autoAlpha: 0, duration: 0.28, ease: "power2.inOut", height: 0 }, transitionStart)
								.to(previousCard, {
									"--card-active": 0,
									"--card-hover": 0,
									duration: 0.3,
									ease: "power2.inOut",
									scale: 0.985,
									x: 0,
								}, transitionStart);
							if (previousMark) {
								approachTimeline.to(previousMark, { duration: 0.28, ease: "power2.inOut", scaleY: 1 }, transitionStart);
							}
						}

						approachTimeline
							.to(card, { "--card-active": 1, duration: 0.34, ease: "power2.inOut", scale: 1 }, transitionStart)
							.to(body, { autoAlpha: 1, duration: 0.38, ease: "power3.out", height: "auto" }, transitionStart);
						if (mark) {
							approachTimeline.to(mark, { duration: 0.28, ease: "power2.inOut", scaleY: 0 }, transitionStart);
						}
						approachTimeline.addLabel(label);
						approachTimeline.to({}, { duration: 0.36 });
					});

					approachTimeline.eventCallback("onUpdate", () => {
						const timelineTime = approachTimeline.time();
						let activeIndex = -1;

						cards.forEach((_, index) => {
							const labelTime = approachTimeline.labels[`capability-${index + 1}-start`];
							if (labelTime !== undefined && timelineTime >= labelTime) activeIndex = index;
						});

						updateActiveCard(activeIndex);
					});

					approachTimeline.addLabel("approach-complete");
					if (rangeProgress) {
						const progressStart = approachTimeline.labels["capability-1"];
						const progressEnd = approachTimeline.labels["approach-complete"];

						approachTimeline.to(rangeProgress, {
							scaleX: 1,
							duration: progressEnd - progressStart,
							ease: "none",
						}, progressStart);
					}

					const documentElement = document.documentElement;
					const initialScrollBehavior = documentElement.style.scrollBehavior;
					let cardSelectionFrame: number | null = null;

					cardSelectors.forEach((selector, index) => {
						if (!selector) return;

						const selectCard = () => {
							const trigger = approachTimeline.scrollTrigger;
							if (!trigger) return;

							const labelTime = approachTimeline.labels[`capability-${index + 1}`];
							const targetTime = Math.min(labelTime + 0.001, approachTimeline.duration());
							const targetProgress = targetTime / approachTimeline.duration();
							const scrollStart = Number(trigger.start);
							const scrollEnd = Number(trigger.end);
							const targetScroll = gsap.utils.clamp(
								scrollStart + 1,
								scrollEnd - 1,
								scrollStart + (scrollEnd - scrollStart) * targetProgress,
							);
							const prepareSelectedCard = () => {
								approachTimeline.totalProgress(targetProgress, false);
								updateActiveCard(index);
							};
							const settleSelectedCard = () => {
								trigger.update();
								trigger.getTween()?.progress(1);
								approachTimeline.totalProgress(targetProgress, false);
								updateActiveCard(index);
							};

							if (cardSelectionFrame !== null) window.cancelAnimationFrame(cardSelectionFrame);
							documentElement.style.scrollBehavior = "auto";
							prepareSelectedCard();
							window.scrollTo({
								behavior: "auto",
								top: targetScroll,
							});
							settleSelectedCard();

							cardSelectionFrame = window.requestAnimationFrame(() => {
								settleSelectedCard();
								documentElement.style.scrollBehavior = initialScrollBehavior;
								cardSelectionFrame = null;
							});
						};

						selector.addEventListener("click", selectCard);
						cardPointerCleanups.push(() => selector.removeEventListener("click", selectCard));
					});
					cardPointerCleanups.push(() => {
						if (cardSelectionFrame !== null) window.cancelAnimationFrame(cardSelectionFrame);
						documentElement.style.scrollBehavior = initialScrollBehavior;
					});
				}

				const workIntro = root.querySelector<HTMLElement>("[data-scroll-scene='work-intro']");
				if (workIntro) {
					const items = gsap.utils.toArray<HTMLElement>(workIntro.querySelectorAll("[data-work-intro]"));
					const edge = workIntro.querySelector<HTMLElement>(".phase-edge i");
					gsap.set(items, { autoAlpha: 0, rotateX: 8, y: 82 });
					if (edge) gsap.set(edge, { scaleX: 0 });

					gsap.timeline({
						scrollTrigger: {
							trigger: workIntro,
							start: "top top",
							end: () => `+=${Math.round(window.innerHeight * 1.55)}`,
							pin: true,
							scrub: 0.85,
							anticipatePin: 1,
							invalidateOnRefresh: true,
							...sceneCallbacks(root, workIntro),
						},
					})
						.to(edge, { duration: 0.3, ease: "power2.out", scaleX: 1 })
						.to(items, { autoAlpha: 1, duration: 0.72, ease: "power3.out", rotateX: 0, stagger: 0.12, y: 0 }, 0.1)
						.to({}, { duration: 0.38 })
						.to(items, { autoAlpha: 0.15, duration: 0.4, ease: "power2.in", stagger: { each: 0.04, from: "end" }, y: -42 });
				}

				const projects = gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-scroll-scene='project']"));
				projects.forEach((project, index) => {
					const copy = gsap.utils.toArray<HTMLElement>(project.querySelectorAll("[data-project-copy]"));
					const mediaElement = project.querySelector<HTMLElement>("[data-project-media]");
					const visual = project.querySelector<HTMLElement>(".project-visual");
					const edge = project.querySelector<HTMLElement>(".phase-edge i");
					const direction = index % 2 === 0 ? 1 : -1;

					gsap.set(copy, { autoAlpha: 0, rotateX: 7, x: -36 * direction, y: 42 });
					if (mediaElement) gsap.set(mediaElement, { xPercent: -18 * direction });
					if (visual) gsap.set(visual, { rotate: 2.5 * direction, scale: 1.15 });
					if (edge) gsap.set(edge, { scaleX: 0 });

					gsap.timeline({
						scrollTrigger: {
							trigger: project,
							start: "top top",
							end: () => `+=${Math.round(window.innerHeight * 2.25)}`,
							pin: true,
							scrub: 0.95,
							anticipatePin: 1,
							invalidateOnRefresh: true,
							...sceneCallbacks(root, project),
						},
					})
						.to(edge, { duration: 0.28, ease: "power2.out", scaleX: 1 })
						.to(mediaElement, { duration: 0.9, ease: "power2.inOut", xPercent: 0 }, 0)
						.to(visual, { duration: 1, ease: "power2.inOut", rotate: 0, scale: 1 }, 0)
						.to(copy, { autoAlpha: 1, duration: 0.76, ease: "power3.out", rotateX: 0, stagger: 0.1, x: 0, y: 0 }, 0.42)
						.to({}, { duration: 0.42 })
						.to(copy, { autoAlpha: 0.18, duration: 0.42, ease: "power2.in", stagger: { each: 0.025, from: "end" }, y: -34 })
						.to(mediaElement, { autoAlpha: 0.25, duration: 0.42, ease: "power2.in", scale: 0.94, yPercent: -3 }, "<");
				});

				const knowledge = root.querySelector<HTMLElement>("[data-scroll-scene='knowledge']");
				if (knowledge) {
					const copy = gsap.utils.toArray<HTMLElement>(knowledge.querySelectorAll("[data-knowledge-copy]"));
					const graph = knowledge.querySelector<HTMLElement>("[data-knowledge-graph]");
					const path = graph?.querySelector<SVGPathElement>("path");
					const circles = gsap.utils.toArray<SVGCircleElement>(graph?.querySelectorAll("circle") ?? []);
					const labels = gsap.utils.toArray<HTMLElement>(graph?.querySelectorAll(".mini-label") ?? []);
					const edge = knowledge.querySelector<HTMLElement>(".phase-edge i");

					gsap.set(copy, { autoAlpha: 0, rotateX: 7, y: 58 });
					if (graph) gsap.set(graph, { autoAlpha: 0, scale: 0.94, y: 56 });
					if (edge) gsap.set(edge, { scaleX: 0 });
					if (path) {
						const length = path.getTotalLength();
						gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
					}
					gsap.set(circles, { scale: 0, transformOrigin: "center" });
					gsap.set(labels, { autoAlpha: 0, y: 12 });

					gsap.timeline({
						scrollTrigger: {
							trigger: knowledge,
							start: "top top",
							end: () => `+=${Math.round(window.innerHeight * 2.5)}`,
							pin: true,
							scrub: 0.95,
							anticipatePin: 1,
							invalidateOnRefresh: true,
							...sceneCallbacks(root, knowledge),
						},
					})
						.to(edge, { duration: 0.25, ease: "power2.out", scaleX: 1 })
						.to(copy.slice(0, 3), { autoAlpha: 1, duration: 0.65, ease: "power3.out", rotateX: 0, stagger: 0.1, y: 0 }, 0.1)
						.to(graph, { autoAlpha: 1, duration: 0.65, ease: "power3.out", scale: 1, y: 0 }, 0.48)
						.to(path ? [path] : [], { duration: 0.75, ease: "power2.inOut", strokeDashoffset: 0 }, 0.72)
						.to(circles, { duration: 0.4, ease: "back.out(2)", scale: 1, stagger: 0.06 }, 0.98)
						.to(labels, { autoAlpha: 1, duration: 0.38, ease: "power2.out", stagger: 0.07, y: 0 }, 1.12)
						.to(copy.slice(3), { autoAlpha: 1, duration: 0.58, ease: "power3.out", rotateX: 0, stagger: 0.11, y: 0 }, 1.16)
						.to({}, { duration: 0.34 })
						.to([...copy, ...(graph ? [graph] : [])], { autoAlpha: 0.18, duration: 0.44, ease: "power2.in", stagger: { each: 0.025, from: "end" }, y: -34 });
				}

				const about = root.querySelector<HTMLElement>("[data-scroll-scene='about']");
				if (about) {
					const copy = gsap.utils.toArray<HTMLElement>(about.querySelectorAll("[data-about-copy]"));
					const details = gsap.utils.toArray<HTMLElement>(about.querySelectorAll("[data-about-detail]"));
					const edge = about.querySelector<HTMLElement>(".phase-edge i");

					gsap.set(copy, { autoAlpha: 0, rotateX: 7, y: 68 });
					gsap.set(details, { autoAlpha: 0, y: 48 });
					if (edge) gsap.set(edge, { scaleX: 0 });

					gsap.timeline({
						scrollTrigger: {
							trigger: about,
							start: "top top",
							end: () => `+=${Math.round(window.innerHeight * 2.05)}`,
							pin: true,
							scrub: 0.9,
							anticipatePin: 1,
							invalidateOnRefresh: true,
							...sceneCallbacks(root, about),
						},
					})
						.to(edge, { duration: 0.3, ease: "power2.out", scaleX: 1 })
						.to(copy, { autoAlpha: 1, duration: 0.72, ease: "power3.out", rotateX: 0, stagger: 0.12, y: 0 }, 0.1)
						.to(copy.at(-1) ?? copy, { duration: 0.52, ease: "power2.inOut", xPercent: -3 }, 0.82)
						.to(details, { autoAlpha: 1, duration: 0.72, ease: "power3.out", stagger: 0.14, y: 0 }, 0.8)
						.to({}, { duration: 0.4 });
				}

				ScrollTrigger.refresh();

				return () => {
					root.classList.remove("is-continuous-ready");
					activatePhase(root, "hero");
				};
			});

			media.add("(max-width: 980px) and (prefers-reduced-motion: no-preference)", () => {
				root.classList.add("is-continuous-ready");
				const scenes = gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-scroll-scene]"));
				const hero = root.querySelector<HTMLElement>("[data-scroll-scene='hero']");
				const revealSelector = [
					"[data-hero-headline]",
					"[data-hero-actions]",
					"[data-hero-detail]",
					"[data-approach-primary]",
					"[data-approach-detail]",
					"[data-work-intro]",
					"[data-project-copy]",
					"[data-project-media]",
					"[data-knowledge-copy]",
					"[data-knowledge-graph]",
					"[data-about-copy]",
					"[data-about-detail]",
				].join(",");

				if (hero) {
					const headline = gsap.utils.toArray<HTMLElement>(hero.querySelectorAll("[data-hero-headline]"));
					const intro = hero.querySelector<HTMLElement>("[data-hero-intro]");
					const actions = hero.querySelector<HTMLElement>("[data-hero-actions]");
					const details = gsap.utils.toArray<HTMLElement>(hero.querySelectorAll("[data-hero-detail]"));
					const introStart = intro ? centerOffset(intro, hero) : { x: 0, y: 0 };

					gsap.set(headline, { autoAlpha: 0, y: 36 });
					if (intro) gsap.set(intro, { autoAlpha: 1, scale: 1.04, x: introStart.x, y: introStart.y });
					if (actions) gsap.set(actions, { autoAlpha: 0, y: 24 });
					gsap.set(details, { autoAlpha: 0, y: 18 });
					gsap.timeline({
						defaults: { ease: "power3.out" },
						scrollTrigger: {
							trigger: hero,
							start: "top top",
							end: () => `+=${Math.round(window.innerHeight * 1.35)}`,
							pin: true,
							scrub: 0.7,
							snap: {
								snapTo: "labelsDirectional",
								duration: { min: 0.18, max: 0.36 },
								delay: 0.06,
								ease: "power2.inOut",
							},
							anticipatePin: 1,
							invalidateOnRefresh: true,
							...sceneCallbacks(root, hero),
						},
					})
						.addLabel("introduction", 0)
						.to({}, { duration: 0.12 })
						.addLabel("statement")
						.to(intro, { duration: 0.44, scale: 1, x: 0, y: 0 }, "statement")
						.to(headline, { autoAlpha: 1, duration: 0.46, stagger: 0.06, y: 0 }, "statement+=0.04")
						.to({}, { duration: 0.1 })
						.addLabel("actions")
						.to(actions, { autoAlpha: 1, duration: 0.32, y: 0 }, "actions")
						.to(details, { autoAlpha: 1, duration: 0.28, y: 0 }, "actions+=0.05")
						.to({}, { duration: 0.14 })
						.addLabel("complete");
				}

				scenes.forEach((scene) => {
					if (scene.dataset.scrollScene === "hero") return;
					const items = gsap.utils.toArray<HTMLElement>(scene.querySelectorAll(revealSelector));
					if (!items.length) return;

					gsap.set(items, { autoAlpha: 0, rotateX: 5, y: 42 });

					gsap.timeline({
						scrollTrigger: {
							trigger: scene,
							start: "top 88%",
							end: "bottom 12%",
							scrub: 0.8,
							...sceneCallbacks(root, scene),
						},
					})
						.to(items, { autoAlpha: 1, duration: 0.45, ease: "power3.out", rotateX: 0, stagger: 0.06, y: 0 })
						.to(items, { autoAlpha: 1, duration: 0.32 })
						.to(items, { autoAlpha: 0.18, duration: 0.35, ease: "power2.in", stagger: { each: 0.025, from: "end" }, y: -28 });
				});

				return () => root.classList.remove("is-continuous-ready");
			});

			return () => {
				media.revert();
				cardPointerCleanups.forEach((cleanup) => cleanup());
				if (meshFrame !== null) window.cancelAnimationFrame(meshFrame);
				heroSurface?.removeEventListener("pointermove", handleMeshPointer);
				heroSurface?.removeEventListener("pointerleave", resetMesh);
			};
		},
		{ scope },
	);

	return <div className="home-experience" ref={scope}>{children}</div>;
}
