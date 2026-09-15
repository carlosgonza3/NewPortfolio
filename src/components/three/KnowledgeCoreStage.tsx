"use client";

import dynamic from "next/dynamic";

const KnowledgeCore = dynamic(() => import("./KnowledgeCore"), {
	ssr: false,
	loading: () => <div className="core-fallback"><span /><span /><span /></div>,
});

export function KnowledgeCoreStage() {
	return (
		<div className="knowledge-core" aria-hidden="true">
			<div className="core-orbit core-orbit--one" />
			<div className="core-orbit core-orbit--two" />
			<KnowledgeCore />
		</div>
	);
}
