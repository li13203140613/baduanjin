import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "站桩计时与循环音乐｜15分钟段落提示 | Grid AI",
    description: "站桩计时工具，提供15分钟循环音乐、段落计数与开始/暂停控制，适合静站放松与专注训练。",
    keywords: ["站桩计时", "站桩音乐", "站桩提醒", "zhan zhuang timer", "standing meditation timer"],
    alternates: {
        canonical: "/zhan-zhuang",
    },
    openGraph: {
        title: "站桩计时与循环音乐｜15分钟段落提示 | Grid AI",
        description: "循环音乐每15分钟一段，简单开始/暂停，辅助站桩练习。",
        url: "https://www.grid-ai.app/zhan-zhuang",
    },
}

export default function ZhanZhuangLayout({ children }: { children: React.ReactNode }) {
    return children
}
