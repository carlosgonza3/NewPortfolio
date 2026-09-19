"use client";

import { useEffect, useRef } from "react";

export function AmbientTiltGrid() {
	const gridRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const grid = gridRef.current;
		const canvas = canvasRef.current;
		const surface = grid?.closest<HTMLElement>("[data-ambient-tilt-surface]");
		if (!grid || !canvas || !surface) return;

		const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
		const finePointer = window.matchMedia("(pointer: fine)");
		let frame: number | null = null;
		let current = { x: 0, y: 0 };
		let target = { x: 0, y: 0 };
		let gridPointer = { strength: 0, x: 0.5, y: 0.5 };
		let gridPointerTarget = { strength: 0, x: 0.5, y: 0.5 };

		const drawGrid = () => {
			const context = canvas.getContext("2d");
			if (!context) return;
			const width = canvas.clientWidth;
			const height = canvas.clientHeight;
			if (width === 0 || height === 0) return;

			const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
			const expectedWidth = Math.round(width * pixelRatio);
			const expectedHeight = Math.round(height * pixelRatio);
			if (canvas.width !== expectedWidth || canvas.height !== expectedHeight) {
				canvas.width = expectedWidth;
				canvas.height = expectedHeight;
			}

			context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
			context.clearRect(0, 0, width, height);

			const colorChannels = getComputedStyle(grid)
				.getPropertyValue("--mood-grid-rgb")
				.split(",")
				.map((channel) => Number.parseFloat(channel.trim()));
			const [red = 255, green = 255, blue = 255] = colorChannels;
			const spacing = Math.min(160, Math.max(104, window.innerWidth * 0.09));
			const sampleSize = 18;
			const bendRadius = Math.min(210, Math.max(135, Math.min(width, height) * 0.22));
			const bendStrength = 28 * gridPointer.strength;
			const cursorX = gridPointer.x * width;
			const cursorY = gridPointer.y * height;

			const bendPoint = (x: number, y: number) => {
				const deltaX = x - cursorX;
				const deltaY = y - cursorY;
				const distance = Math.hypot(deltaX, deltaY);
				if (distance <= 0.01 || distance >= bendRadius || bendStrength <= 0.01) return { x, y };
				const proximity = 1 - distance / bendRadius;
				const falloff = proximity * proximity * (3 - 2 * proximity);
				const displacement = bendStrength * falloff;

				return {
					x: x + (deltaX / distance) * displacement,
					y: y + (deltaY / distance) * displacement,
				};
			};

			context.lineWidth = 1;
			context.strokeStyle = `rgba(${red}, ${green}, ${blue}, 0.058)`;

			for (let x = 0; x <= width + spacing; x += spacing) {
				context.beginPath();
				for (let y = -sampleSize; y <= height + sampleSize; y += sampleSize) {
					const point = bendPoint(x, y);
					if (y === -sampleSize) context.moveTo(point.x, point.y);
					else context.lineTo(point.x, point.y);
				}
				context.stroke();
			}

			for (let y = 0; y <= height + spacing; y += spacing) {
				context.beginPath();
				for (let x = -sampleSize; x <= width + sampleSize; x += sampleSize) {
					const point = bendPoint(x, y);
					if (x === -sampleSize) context.moveTo(point.x, point.y);
					else context.lineTo(point.x, point.y);
				}
				context.stroke();
			}
		};

		const applyMotion = () => {
			current = {
				x: current.x + (target.x - current.x) * 0.12,
				y: current.y + (target.y - current.y) * 0.12,
			};
			gridPointer = {
				strength: gridPointer.strength + (gridPointerTarget.strength - gridPointer.strength) * 0.12,
				x: gridPointer.x + (gridPointerTarget.x - gridPointer.x) * 0.14,
				y: gridPointer.y + (gridPointerTarget.y - gridPointer.y) * 0.14,
			};

			surface.style.setProperty("--ambient-tilt-x", `${current.y * -3.2}deg`);
			surface.style.setProperty("--ambient-tilt-y", `${current.x * 4.8}deg`);
			surface.style.setProperty("--ambient-headline-x", `${current.x * 4.2}px`);
			surface.style.setProperty("--ambient-headline-y", `${current.y * 3.1}px`);
			drawGrid();

			const isMoving =
				Math.abs(target.x - current.x) > 0.002 ||
				Math.abs(target.y - current.y) > 0.002 ||
				Math.abs(gridPointerTarget.strength - gridPointer.strength) > 0.002 ||
				Math.abs(gridPointerTarget.x - gridPointer.x) > 0.002 ||
				Math.abs(gridPointerTarget.y - gridPointer.y) > 0.002;

			if (isMoving) {
				frame = window.requestAnimationFrame(applyMotion);
			} else {
				frame = null;
			}
		};

		const requestMotionFrame = () => {
			if (frame === null) frame = window.requestAnimationFrame(applyMotion);
		};

		const handlePointerMove = (event: PointerEvent) => {
			if (motionPreference.matches || !finePointer.matches) return;
			const bounds = surface.getBoundingClientRect();
			target = {
				x: Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2)),
				y: Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2)),
			};
			const gridBounds = canvas.getBoundingClientRect();
			gridPointerTarget = {
				strength: 1,
				x: Math.max(0, Math.min(1, (event.clientX - gridBounds.left) / gridBounds.width)),
				y: Math.max(0, Math.min(1, (event.clientY - gridBounds.top) / gridBounds.height)),
			};
			requestMotionFrame();
		};

		const resetMotion = () => {
			target = { x: 0, y: 0 };
			gridPointerTarget = { ...gridPointerTarget, strength: 0 };
			requestMotionFrame();
		};

		const resizeObserver = new ResizeObserver(() => {
			drawGrid();
		});
		const themeObserver = new MutationObserver(() => {
			drawGrid();
		});

		surface.addEventListener("pointermove", handlePointerMove, { passive: true });
		surface.addEventListener("pointerleave", resetMotion);
		motionPreference.addEventListener("change", resetMotion);
		finePointer.addEventListener("change", resetMotion);
		resizeObserver.observe(grid);
		themeObserver.observe(document.documentElement, { attributeFilter: ["data-theme"], attributes: true });
		drawGrid();

		return () => {
			surface.removeEventListener("pointermove", handlePointerMove);
			surface.removeEventListener("pointerleave", resetMotion);
			motionPreference.removeEventListener("change", resetMotion);
			finePointer.removeEventListener("change", resetMotion);
			resizeObserver.disconnect();
			themeObserver.disconnect();
			if (frame !== null) window.cancelAnimationFrame(frame);
		};
	}, []);

	return (
		<div className="ambient-tilt-grid" aria-hidden="true" ref={gridRef}>
			<canvas className="ambient-tilt-grid__canvas" ref={canvasRef} />
		</div>
	);
}
