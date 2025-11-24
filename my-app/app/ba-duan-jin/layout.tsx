import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "八段锦计时与口令音频｜分节提示与呼吸时长 | Grid AI",
    description: "八段锦计时工具，提供分节口令音频/视频、吸呼分开设置、预备与结束提示，支持每节重复次数自定义，适合日常跟练与教学。",
    keywords: [
        "八段锦计时",
        "八段锦口令",
        "八段锦呼吸节奏",
        "八段锦分节视频",
        "baduanjin timer",
        "baduanjin breathing",
    ],
    alternates: {
        canonical: "/ba-duan-jin",
    },
    openGraph: {
        title: "八段锦计时与口令音频｜分节提示与呼吸时长 | Grid AI",
        description: "分节口令、吸呼时长可调、预备与结束提示，帮助你安全高效完成一套八段锦。",
        url: "https://www.grid-ai.app/ba-duan-jin",
    },
}

export default function BaDuanJinLayout({ children }: { children: React.ReactNode }) {
    return children
}
