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
    title: "八段锦与站桩练习计时与视频 | Grid AI",
    description: "八段锦与站桩练习平台，提供分节视频、呼吸口令、计时音乐与练习提示。",
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
