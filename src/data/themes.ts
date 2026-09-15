export type PortfolioTheme = "light" | "dark" | "sundown" | "rainy" | "forest";

export type PortfolioThemeOption = {
	id: PortfolioTheme;
	label: string;
	description: string;
	swatch: string;
	iconColor: string;
};

export const portfolioThemes: PortfolioThemeOption[] = [
	{
		id: "light",
		label: "Daylight",
		description: "Warm paper and clear blue",
		swatch: "#a7ada3",
		iconColor: "#111715",
	},
	{
		id: "dark",
		label: "Midnight",
		description: "Deep ink and electric blue",
		swatch: "#071b2b",
		iconColor: "#f3f6f5",
	},
	{
		id: "sundown",
		label: "Sundown",
		description: "Ember orange after dark",
		swatch: "#a86b00",
		iconColor: "#fff5e7",
	},
	{
		id: "rainy",
		label: "Rainy",
		description: "Soft slate and rain blue",
		swatch: "#0a398f",
		iconColor: "#edf7ff",
	},
	{
		id: "forest",
		label: "Forest",
		description: "Dark moss and fresh green",
		swatch: "#205718",
		iconColor: "#f0f7eb",
	},
];

export const portfolioThemeIds = portfolioThemes.map(({ id }) => id);

export const isPortfolioTheme = (value: string | undefined | null): value is PortfolioTheme =>
	portfolioThemeIds.includes(value as PortfolioTheme);
