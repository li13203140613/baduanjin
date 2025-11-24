import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { GoogleAnalytics } from "@/components/analytics"
import "./globals.css"

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
})

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
})

export const metadata: Metadata = {
    title: "八段锦与站桩教学工具：单个动作作图解、口令呼吸视频、练习要点与健康益处资源书籍下载",
    description:
        "提供八段锦与站桩练习方法与口令视频、动作分解图表、发音与中文原文说明；同时覆盖站桩要领、静心冥想练法及 PDF 资料，帮助入门和进阶。",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="zh-CN">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <GoogleAnalytics />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "WebSite",
                            name: "Grid AI Baduanjin & Zhan Zhuang",
                            url: "https://www.grid-ai.app/",
                            inLanguage: ["zh-CN", "en"],
                            description:
                                "Baduanjin and Zhan Zhuang practice hub with segmented videos, breathing cues, and timers.",
                            potentialAction: {
                                "@type": "SearchAction",
                                target: "https://www.grid-ai.app/?s={search_term_string}",
                                "query-input": "required name=search_term_string",
                            },
                        }),
                    }}
                />
                {children}
            </body>
        </html>
    )
}
