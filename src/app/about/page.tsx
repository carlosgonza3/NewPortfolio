import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AboutAtmosphere } from "@/components/about/AboutAtmosphere";
import { AboutHeadline } from "@/components/about/AboutHeadline";
import { AboutOriginCopy } from "@/components/about/AboutOriginCopy";
import { AboutOriginGallery } from "@/components/about/AboutOriginGallery";
import { AboutOriginTitle } from "@/components/about/AboutOriginTitle";
import { AboutPortrait } from "@/components/about/AboutPortrait";
import { AboutSectionEyebrow } from "@/components/about/AboutSectionEyebrow";
import { AboutSportsWidget } from "@/components/about/AboutSportsWidget";
import { AboutStoryPanels } from "@/components/about/AboutStoryPanels";
import { aboutProfile } from "@/data/profile";
import { assetPath } from "@/lib/asset-path";
import "./styles/AboutPage.css";

export const metadata: Metadata = {
	title: "About",
	description: "Meet Carlos Gonzalez, a developer from San Salvador, now based in Montréal, who brings curiosity and care to every product he builds.",
};

export default function AboutPage() {
	return (
		<main className="about-page" id="main-content">
			<section className="about-hero" data-about-atmosphere-surface>
				<AboutAtmosphere />
				<div className="about-hero__content section-shell">
					<div className="about-hero__intro">
						<AboutHeadline title={aboutProfile.title} />
						<p className="about-hero__description">{aboutProfile.description}</p>
					</div>
					<div className="about-hero__portrait">
						<AboutPortrait {...aboutProfile.portrait} />
					</div>
				</div>
			</section>

			<section className="about-origin section-shell" data-about-reveal-section>
				<div className="about-origin__heading">
					<AboutSectionEyebrow>{aboutProfile.origin.eyebrow}</AboutSectionEyebrow>
					<AboutOriginTitle title={aboutProfile.origin.title} />
				</div>
				<AboutOriginCopy paragraphs={aboutProfile.origin.body} />
				{aboutProfile.origin.photos.length > 0 ? (
					<AboutOriginGallery photos={aboutProfile.origin.photos} />
				) : null}
			</section>

			<section className="about-interests section-shell" data-about-reveal-section>
				<div className="about-interests__eyebrow">
					<AboutSectionEyebrow>{aboutProfile.interests.eyebrow}</AboutSectionEyebrow>
				</div>
				<div className="about-interests__widget-track">
					<AboutSportsWidget {...aboutProfile.interests.widget} />
				</div>
				<div className="about-interests__copy">
					<h2 data-about-reveal-content>{aboutProfile.interests.title}</h2>
					<p data-about-reveal-content>{aboutProfile.interests.description}</p>
					<ul className="about-interests__tags" data-about-reveal-content aria-label="Favorite teams and interests">
						{aboutProfile.interests.tags.map((tag) => <li key={tag}>{tag}</li>)}
					</ul>
				</div>
			</section>

			<AboutStoryPanels principle={aboutProfile.principle} spark={aboutProfile.spark} />

			<section className="about-creative section-shell" data-about-reveal-section>
				<div className="about-creative__heading">
					<AboutSectionEyebrow>{aboutProfile.creativeWork.eyebrow}</AboutSectionEyebrow>
					<h2 data-about-reveal-content>{aboutProfile.creativeWork.title}</h2>
				</div>
				<div className="about-creative__content" data-about-reveal-content>
					{"body" in aboutProfile.creativeWork && typeof aboutProfile.creativeWork.body === "string" ? (
						<p className="about-creative__intro">{aboutProfile.creativeWork.body}</p>
					) : null}
					<div className="about-creative__experiences">
						{aboutProfile.creativeWork.experiences.map((experience) => (
							<details className="about-creative__experience" key={experience.title}>
								<summary className="about-creative__summary">
									<span className="about-creative__role">
										<strong>{experience.title}</strong>
										<small>{experience.period}</small>
									</span>
									<span className="about-creative__strength">{experience.strength}</span>
								</summary>
								<div className="about-creative__details">
									<p>{experience.description}</p>
									{experience.previews.length > 0 ? (
										<div className="about-creative__previews">
											{experience.previews.map((preview, previewIndex) => (
												<article className="about-creative__preview" key={preview.title}>
													<div className="about-creative__still">
														{preview.image ? (
															<Image
																alt={preview.imageAlt}
																className="about-creative__image"
																fill
																sizes="(max-width: 720px) 100vw, 50vw"
																src={assetPath(preview.image)}
															/>
														) : null}
														{preview.mediaType === "film" ? <span className="about-creative__play" aria-hidden="true">▶</span> : null}
														<span>0{previewIndex + 1}</span>
													</div>
													<div className="about-creative__caption">
														<div><strong>{preview.title}</strong><span>{preview.detail}</span></div>
														<small>{preview.status}</small>
													</div>
												</article>
											))}
										</div>
									) : null}
								</div>
							</details>
						))}
					</div>
				</div>
			</section>

			<section className="about-now section-shell" data-about-reveal-section>
				<AboutSectionEyebrow>{aboutProfile.now.eyebrow}</AboutSectionEyebrow>
				<h2 data-about-reveal-content>{aboutProfile.now.title}</h2>
				<div className="about-now__body" data-about-reveal-content>
					<p>{aboutProfile.now.body}</p>
					<div className="about-now__actions">
						<a className="button button--dark" href="mailto:hello@carlosgonzalez.dev"><span className="button__label">Start a conversation</span></a>
						<Link className="text-link" href="/#work">See what I build</Link>
					</div>
				</div>
			</section>
		</main>
	);
}
