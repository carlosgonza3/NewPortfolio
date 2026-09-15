"use client";

import { useEffect } from "react";

type Theme = "dark" | "light";

const applyTheme = (theme: Theme) => {
	document.documentElement.dataset.theme = theme;
	window.localStorage.setItem("portfolio-theme", theme);
};

export function ThemeToggle() {
	useEffect(() => {
		const savedTheme = window.localStorage.getItem("portfolio-theme");
		if (savedTheme === "dark" || savedTheme === "light") {
			document.documentElement.dataset.theme = savedTheme;
			return;
		}

		document.documentElement.dataset.theme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
	}, []);

	const toggleTheme = () => {
		const nextTheme = document.documentElement.dataset.theme === "light" ? "dark" : "light";
		applyTheme(nextTheme);
	};

	return (
		<button className="theme-toggle" onClick={toggleTheme} type="button">
			<span className="sr-only">Toggle color theme</span>
			<svg className="theme-toggle__sun" viewBox="0 0 24 24" aria-hidden="true">
				<circle cx="12" cy="12" r="3.5" />
				<path d="M12 2v2.2M12 19.8V22M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M2 12h2.2M19.8 12H22M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6" />
			</svg>
			<svg className="theme-toggle__moon" viewBox="0 0 24 24" aria-hidden="true">
				<path d="M20 15.2A8.5 8.5 0 0 1 8.8 4a8.5 8.5 0 1 0 11.2 11.2Z" />
			</svg>
		</button>
	);
}
