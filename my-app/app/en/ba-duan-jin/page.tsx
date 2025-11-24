"use client"

import { BaDuanJinView } from "@/components/ba-duan-jin-view"

export default function BaDuanJinPageEn() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 p-4 md:p-8">
            <BaDuanJinView showBackButton locale="en" />
        </div>
    )
}
