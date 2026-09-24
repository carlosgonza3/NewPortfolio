import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AboutPortrait } from "@/components/about/AboutPortrait";
import { aboutProfile } from "@/data/profile";
import { assetPath } from "@/lib/asset-path";
import styles from "./AboutPage.module.css";

export const metadata: Metadata = {
	title: "About",
	description: "Meet Carlos Gonzalez—a developer from San Salvador, now based in Montréal, who brings curiosity and care to every product he builds.",
};

export default function AboutPage() {
	return (
		<main className={styles.page} id="main-content">
			<section className={`${styles.hero} section-shell`}>
				<div className={styles.heroIntro}>
					<h1>{aboutProfile.title}</h1>
					<p className={styles.heroDescription}>{aboutProfile.description}</p>
				</div>
				<div className={styles.portraitSlot}>
					<AboutPortrait {...aboutProfile.portrait} />
				</div>
				<div className={styles.heroMeta}>
					<p className="section-index">A quick introduction</p>
					<div className={styles.metaList}>
						{aboutProfile.meta.map((item) => (
							<div key={item.label}>
								<span>{item.label}</span>
								<strong>{item.value}</strong>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className={`${styles.origin} section-shell`}>
				<div className={styles.sectionHeading}>
					<p className="eyebrow">{aboutProfile.origin.eyebrow}</p>
					<h2>{aboutProfile.origin.title}</h2>
				</div>
				<div className={styles.originCopy}>
					{aboutProfile.origin.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
				</div>
				{aboutProfile.origin.photos.length > 0 ? (
					<div className={styles.photoJournal} aria-label="Scenes from El Salvador">
						{aboutProfile.origin.photos.map((photo) => (
							<figure className={styles.photoCard} data-tone={photo.tone} key={photo.label}>
								<div className={styles.photoArtwork}>
									{photo.image ? (
										<Image
											alt={photo.imageAlt}
											className={styles.mediaImage}
											fill
											sizes="(max-width: 720px) 82vw, (max-width: 980px) 50vw, 34vw"
											src={assetPath(photo.image)}
										/>
									) : (
										<div className={styles.photoPlaceholder} aria-label="Image coming soon">
											<span className={styles.sun} />
											<span className={styles.land} />
											<span className={styles.water} />
										</div>
									)}
								</div>
								<figcaption>
									<strong>{photo.label}</strong>
									<span>{photo.note}</span>
								</figcaption>
							</figure>
						))}
					</div>
				) : null}
			</section>

			<section className={`${styles.interests} section-shell`}>
				<div className={styles.scoreboard} aria-hidden="true">
					<span>LIVE</span>
					<strong>90:00</strong>
					<i>Weekend mode</i>
				</div>
				<div className={styles.interestsCopy}>
					<p className="eyebrow">{aboutProfile.interests.eyebrow}</p>
					<h2>{aboutProfile.interests.title}</h2>
					<p>{aboutProfile.interests.description}</p>
					<ul className={styles.tagList} aria-label="Favorite teams and interests">
						{aboutProfile.interests.tags.map((tag) => <li key={tag}>{tag}</li>)}
					</ul>
				</div>
			</section>

			<section className={`${styles.storyGrid} section-shell`}>
				<article className={styles.sparkCard}>
					<div className={styles.scratchBlocks} aria-hidden="true">
						<span>when clicked</span>
						<span>forever</span>
						<span>create something</span>
					</div>
					<div>
						<p className="eyebrow">{aboutProfile.spark.eyebrow}</p>
						<h2>{aboutProfile.spark.title}</h2>
						<p>{aboutProfile.spark.body}</p>
					</div>
				</article>

				<aside className={styles.principle}>
					<p className="section-index">A principle I carry</p>
					<blockquote>“{aboutProfile.principle.quote}”</blockquote>
					<p>{aboutProfile.principle.body}</p>
				</aside>
			</section>

			<section className={`${styles.creative} section-shell`}>
				<div className={styles.sectionHeading}>
					<p className="eyebrow">{aboutProfile.creativeWork.eyebrow}</p>
					<h2>{aboutProfile.creativeWork.title}</h2>
				</div>
				<p className={styles.creativeIntro}>{aboutProfile.creativeWork.body}</p>
				{aboutProfile.creativeWork.films.length > 0 ? (
					<div className={styles.filmGrid}>
						{aboutProfile.creativeWork.films.map((film, index) => (
							<article className={styles.filmCard} key={film.title}>
								<div className={styles.filmStill}>
									{film.image ? (
										<Image
											alt={film.imageAlt}
											className={styles.mediaImage}
											fill
											sizes="(max-width: 720px) 100vw, 50vw"
											src={assetPath(film.image)}
										/>
									) : null}
									<span className={styles.playIcon} aria-hidden="true">▶</span>
									<span>0{index + 1}</span>
								</div>
								<div className={styles.filmCaption}>
									<div><strong>{film.title}</strong><span>{film.detail}</span></div>
									<small>{film.status}</small>
								</div>
							</article>
						))}
					</div>
				) : null}
			</section>

			<section className={`${styles.now} section-shell`}>
				<p className="eyebrow">{aboutProfile.now.eyebrow}</p>
				<h2>{aboutProfile.now.title}</h2>
				<div className={styles.nowBody}>
					<p>{aboutProfile.now.body}</p>
					<div className={styles.nowActions}>
						<a className="button button--dark" href="mailto:hello@carlosgonzalez.dev"><span className="button__label">Start a conversation</span></a>
						<Link className="text-link" href="/#work">See what I build</Link>
					</div>
				</div>
			</section>
		</main>
	);
}
