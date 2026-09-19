import type { Metadata } from "next";
import { aboutProfile } from "@/data/profile";

export const metadata: Metadata = {
	title: "About",
	description: "Learn more about Carlos Gonzalez and his approach to thoughtful software engineering.",
};

export default function AboutPage() {
	return (
		<main className="about-page" id="main-content">
			<section className="about about--standalone section-shell">
				<p className="section-index">About</p>
				<div className="about-heading">
					<p className="eyebrow">{aboutProfile.eyebrow}</p>
					<h1>{aboutProfile.title}</h1>
				</div>
				<div className="about-body">
					<p>{aboutProfile.description}</p>
					<div className="about-meta">
						{aboutProfile.meta.map((item) => (
							<div key={item.label}>
								<span>{item.label}</span>
								<strong>{item.value}</strong>
							</div>
						))}
					</div>
				</div>
			</section>
		</main>
	);
}
