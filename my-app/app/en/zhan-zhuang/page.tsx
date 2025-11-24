"use client"

import { ZhanZhuangView } from "@/components/zhan-zhuang-view"

export default function ZhanZhuangPageEn() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 p-4 md:p-8">
            <ZhanZhuangView showBackButton locale="en" />
        </div>
    )
}
