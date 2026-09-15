import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/navigation/Footer";
import { Navigation } from "@/components/navigation/Navigation";
import { portfolioThemeIds } from "@/data/themes";
import "./globals.css";

export const metadata: Metadata = {
	metadataBase: new URL("https://carlosgonzalez.dev"),
	title: {
		default: "Carlos Gonzalez",
		template: "%s — Carlos Gonzalez",
	},
	description:
		"Software developer connecting systems, data, and interaction through thoughtful product engineering.",
	openGraph: {
		title: "Carlos Gonzalez — Software Developer",
		description: "Projects, concepts, and the knowledge connecting them.",
		type: "website",
	},
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
	const themeBootstrap = `document.documentElement.classList.add("has-js");try{const themes=${JSON.stringify(portfolioThemeIds)};const saved=localStorage.getItem("portfolio-theme");document.documentElement.dataset.theme=themes.includes(saved)?saved:(matchMedia("(prefers-color-scheme: light)").matches?"light":"dark")}catch{document.documentElement.dataset.theme="dark"}`;

	return (
		<html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
			<head>
				<script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
			</head>
			<body>
				<a className="skip-link" href="#main-content">
					Skip to content
				</a>
				<Navigation />
				{children}
				<Footer />
			</body>
		</html>
	);
}
