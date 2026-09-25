type AboutSportsWidgetProps = {
	caption: string;
	status: string;
	time: string;
};

export function AboutSportsWidget({ caption, status, time }: AboutSportsWidgetProps) {
	return (
		<aside className="about-sports-widget" data-about-reveal-content aria-label="Sports widget">
			<span>{status}</span>
			<strong>{time}</strong>
			<i>{caption}</i>
		</aside>
	);
}
