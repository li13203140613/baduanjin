import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Baduanjin timer with cues | segmented breathing counts | Grid AI",
    description:
        "Baduanjin timer with segment voice cues, adjustable inhale/exhale lengths, repeats per section, plus prepare and ending prompts for safer practice.",
    keywords: [
        "baduanjin timer",
        "baduanjin breathing",
        "baduanjin cues",
        "eight brocades timer",
        "eight brocades breathing",
    ],
    alternates: {
        canonical: "/en/ba-duan-jin",
    },
    openGraph: {
        title: "Baduanjin timer with cues | segmented breathing counts | Grid AI",
        description: "Segment voice cues, adjustable breathing lengths, repeats per move, and prep/ending prompts.",
        url: "https://www.grid-ai.app/en/ba-duan-jin",
    },
}

export default function BaDuanJinLayoutEn({ children }: { children: React.ReactNode }) {
    return children
}
