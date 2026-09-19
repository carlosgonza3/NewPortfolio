import type { Metadata } from "next";
import { KnowledgeComingSoon } from "@/components/knowledge/KnowledgeComingSoon";

export const metadata: Metadata = {
	title: "Knowledge System — Coming Soon",
	description: "A living map of the ideas, tools, and decisions behind Carlos Gonzalez's work is coming soon.",
};

export default function KnowledgeRoute() {
	return <KnowledgeComingSoon />;
}
