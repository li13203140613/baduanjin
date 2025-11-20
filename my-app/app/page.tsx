"use client"

import { useState } from "react"
import { BaDuanJinView } from "@/components/ba-duan-jin-view"
import { ZhanZhuangView } from "@/components/zhan-zhuang-view"
import { cn } from "@/lib/utils"

export default function HomePage() {
    const [activeTab, setActiveTab] = useState<"baduanjin" | "zhanzhuang">("baduanjin")

    return (
        <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
            <div className="container mx-auto px-4 py-8">
                {/* Top Navigation Switcher */}
                <div className="flex justify-center mb-8">
                    <div className="bg-muted/50 p-1 rounded-full inline-flex">
                        <button
                            onClick={() => setActiveTab("baduanjin")}
                            className={cn(
                                "px-6 py-2 rounded-full text-sm font-medium transition-all duration-200",
                                activeTab === "baduanjin"
                                    ? "bg-background text-primary shadow-sm"
                                    : "text-muted-foreground hover:text-foreground",
                            )}
                        >
                            八段锦
                        </button>
                        <button
                            onClick={() => setActiveTab("zhanzhuang")}
                            className={cn(
                                "px-6 py-2 rounded-full text-sm font-medium transition-all duration-200",
                                activeTab === "zhanzhuang"
                                    ? "bg-background text-primary shadow-sm"
                                    : "text-muted-foreground hover:text-foreground",
                            )}
                        >
                            站桩
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="max-w-5xl mx-auto">
                    {activeTab === "baduanjin" ? <BaDuanJinView /> : <ZhanZhuangView />}
                </div>
            </div>
        </main>
    )
}
