import Image from "next/image";
import type { CSSProperties } from "react";
import styles from "./ProjectMediaMosaic.module.css";

export type ProjectMediaMosaicItem = {
	title: string;
	image: string;
	imageAlt: string;
};

export type ProjectMediaMosaicLayout = "mosaic-a" | "mosaic-b" | "mosaic-c" | "mosaic-d";

type ProjectMediaMosaicProps = {
	accent: string;
	isActive?: boolean;
	items: ProjectMediaMosaicItem[];
	layout?: ProjectMediaMosaicLayout;
};

export function ProjectMediaMosaic({
	accent,
	isActive = true,
	items,
	layout = "mosaic-a",
}: ProjectMediaMosaicProps) {
	return (
		<div
			aria-hidden="true"
			className={`${styles.mosaic} ${styles[layout]}${isActive ? ` ${styles.active}` : ""}`}
			style={{ "--mosaic-accent": accent } as CSSProperties}
		>
			<div className={styles.track}>
				{[0, 1].map((setIndex) => (
					<div className={styles.set} key={setIndex}>
						{items.slice(0, 7).map((item, itemIndex) => (
							<div className={`${styles.tile}${item.image ? ` ${styles.hasImage}` : ""}`} key={`${setIndex}-${itemIndex}`}>
								{item.image ? (
									<Image alt={item.imageAlt} className={styles.image} fill sizes="(max-width: 720px) 40vw, 24vw" src={item.image} />
								) : (
									<span className={styles.screen}><i /><i /><i /></span>
								)}
								<small>Preview {String(itemIndex + 1).padStart(2, "0")}</small>
								<strong>{item.title}</strong>
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
}
