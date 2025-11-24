import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Zhan Zhuang timer with looping music | 15-minute segments | Grid AI",
    description:
        "Standing meditation timer with looping calm music, 15-minute segment tracking, and simple start/pause controls to support daily practice.",
    keywords: ["zhan zhuang timer", "standing meditation timer", "standing qigong music", "looping meditation music"],
    alternates: {
        canonical: "/en/zhan-zhuang",
    },
    openGraph: {
        title: "Zhan Zhuang timer with looping music | 15-minute segments | Grid AI",
        description: "Looping music and segment counter for standing meditation (Zhan Zhuang).",
        url: "https://www.grid-ai.app/en/zhan-zhuang",
    },
}

export default function ZhanZhuangLayoutEn({ children }: { children: React.ReactNode }) {
    return children
}
