"use client";

import type { CSSProperties, KeyboardEvent } from "react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { isPortfolioTheme, portfolioThemes, type PortfolioTheme } from "@/data/themes";

const wheelSegment = 360 / portfolioThemes.length;
const themeListeners = new Set<() => void>();

const getThemeSnapshot = (): PortfolioTheme => {
	if (typeof document === "undefined") return "dark";
	const appliedTheme = document.documentElement.dataset.theme;
	return isPortfolioTheme(appliedTheme) ? appliedTheme : "dark";
};

const subscribeToTheme = (listener: () => void) => {
	themeListeners.add(listener);
	return () => themeListeners.delete(listener);
};

const setDocumentTheme = (theme: PortfolioTheme, persist = false) => {
	document.documentElement.dataset.theme = theme;
	if (persist) window.localStorage.setItem("portfolio-theme", theme);
	themeListeners.forEach((listener) => listener());
};

function MoodIcon({ theme }: { theme: PortfolioTheme }) {
	if (theme === "light") {
		return (
			<svg viewBox="0 0 24 24" aria-hidden="true">
				<circle cx="12" cy="12" r="3.4" />
				<path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
			</svg>
		);
	}

	if (theme === "dark") {
		return (
			<svg viewBox="0 0 24 24" aria-hidden="true">
				<path d="M19.7 15.2A8.2 8.2 0 0 1 8.8 4.3a8.2 8.2 0 1 0 10.9 10.9Z" />
			</svg>
		);
	}

	if (theme === "sundown") {
		return (
			<svg viewBox="0 0 24 24" aria-hidden="true">
				<path d="M4 15h16M6.4 15a5.6 5.6 0 0 1 11.2 0M5 19h14M12 5v2M5.8 8.3l1.4 1.2M18.2 8.3l-1.4 1.2" />
			</svg>
		);
	}

	if (theme === "rainy") {
		return (
			<svg viewBox="0 0 24 24" aria-hidden="true">
				<path d="M6.2 14.5a4.2 4.2 0 0 1 .7-8.3A5.8 5.8 0 0 1 18 8.7a3 3 0 0 1-.2 5.8H6.2ZM8 17.5l-.8 2M12.4 17.5l-.8 2M16.8 17.5l-.8 2" />
			</svg>
		);
	}

	return (
		<svg viewBox="0 0 24 24" aria-hidden="true">
			<path d="M19.8 4.2C12 4.5 6.7 7.6 6.2 13.1c-.3 3.2 2.1 5.7 5.2 5.1 5.3-1 7.7-6.1 8.4-14ZM5 20c2.7-4.5 6.1-7.5 10.4-9.4" />
		</svg>
	);
}

export function ThemeToggle() {
	const rootRef = useRef<HTMLDivElement>(null);
	const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
	const committedTheme = useRef<PortfolioTheme>("dark");
	const [isOpen, setIsOpen] = useState(false);
	const currentTheme = useSyncExternalStore<PortfolioTheme>(subscribeToTheme, getThemeSnapshot, () => "dark");

	const clearCloseTimer = () => {
		if (!closeTimer.current) return;
		clearTimeout(closeTimer.current);
		closeTimer.current = null;
	};

	const previewTheme = (theme: PortfolioTheme) => setDocumentTheme(theme);

	const commitTheme = (theme: PortfolioTheme) => {
		committedTheme.current = theme;
		setDocumentTheme(theme, true);
	};

	const closeSelector = (restore = true) => {
		clearCloseTimer();
		if (restore) previewTheme(committedTheme.current);
		setIsOpen(false);
	};

	const scheduleClose = () => {
		clearCloseTimer();
		closeTimer.current = setTimeout(() => closeSelector(), 180);
	};

	useEffect(() => {
		committedTheme.current = getThemeSnapshot();

		const handleOutsidePointer = (event: PointerEvent) => {
			if (rootRef.current?.contains(event.target as Node)) return;
			if (closeTimer.current) clearTimeout(closeTimer.current);
			setDocumentTheme(committedTheme.current);
			setIsOpen(false);
		};

		document.addEventListener("pointerdown", handleOutsidePointer);
		return () => {
			document.removeEventListener("pointerdown", handleOutsidePointer);
			if (closeTimer.current) clearTimeout(closeTimer.current);
		};
	}, []);

	useEffect(() => {
		const navigation = rootRef.current?.closest(".site-nav");
		navigation?.classList.toggle("has-open-mood", isOpen);

		return () => navigation?.classList.remove("has-open-mood");
	}, [isOpen]);

	const handlePointerEnter = () => {
		clearCloseTimer();
	};

	const selectTheme = (theme: PortfolioTheme) => {
		commitTheme(theme);
		setIsOpen(false);
	};

	const handleKeys = (event: KeyboardEvent<HTMLDivElement>) => {
		if (event.key === "Escape") {
			event.preventDefault();
			closeSelector();
			return;
		}

		if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
		event.preventDefault();
		if (!isOpen) setIsOpen(true);
		const currentIndex = portfolioThemes.findIndex(({ id }) => id === currentTheme);
		const direction = event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 1;
		const nextIndex = (currentIndex + direction + portfolioThemes.length) % portfolioThemes.length;
		commitTheme(portfolioThemes[nextIndex].id);
	};

	return (
		<div
			className={`mood-dial${isOpen ? " is-open" : ""}`}
			ref={rootRef}
			onKeyDown={handleKeys}
			onPointerEnter={handlePointerEnter}
			onPointerLeave={scheduleClose}
		>
			<div className="mood-dial__surface">
				<button
					className="mood-dial__rim"
					type="button"
					aria-label={isOpen ? "Close color mood selector" : "Open color mood selector"}
					aria-expanded={isOpen}
					tabIndex={-1}
					onClick={() => (isOpen ? closeSelector() : setIsOpen(true))}
				/>

				<div className="mood-dial__options" role="listbox" aria-label="Choose a page color mood">
					{portfolioThemes.map((theme, index) => {
						const angle = index * wheelSegment - 90;
						const position = {
							"--mood-option-x": `${50 + Math.cos((angle * Math.PI) / 180) * 33}%`,
							"--mood-option-y": `${50 + Math.sin((angle * Math.PI) / 180) * 33}%`,
							"--mood-option-delay": `${index * 24}ms`,
						} as CSSProperties;
						const isActive = theme.id === currentTheme;

						return (
							<button
								className={`mood-dial__option${isActive ? " is-active" : ""}`}
								key={theme.id}
								role="option"
								aria-label={isOpen ? theme.label : `Open color mood selector. Current mood: ${theme.label}.`}
								aria-selected={isActive}
								tabIndex={isOpen || isActive ? 0 : -1}
								style={position}
								type="button"
								onClick={() => (isOpen ? selectTheme(theme.id) : setIsOpen(true))}
							>
								<MoodIcon theme={theme.id} />
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
}
