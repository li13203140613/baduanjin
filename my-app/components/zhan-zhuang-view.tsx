"use client"

import { useEffect, useRef, useState } from "react"
import { BackButton } from "@/components/back-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Pause, Play } from "lucide-react"

const SEGMENT_DURATION = 15 * 60 // 15 minutes in seconds

type ZhanZhuangViewProps = {
    showBackButton?: boolean
    locale?: "zh" | "en"
}

export function ZhanZhuangView({ showBackButton = false, locale = "zh" }: ZhanZhuangViewProps) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [elapsedTime, setElapsedTime] = useState(0)
    const [currentSegment, setCurrentSegment] = useState(1)
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

    const t = {
        title: locale === "en" ? "Zhan Zhuang timer" : "站桩练习",
        segmentLabel: locale === "en" ? `Segment ${currentSegment}` : `第 ${currentSegment} 段`,
        segmentHint: locale === "en" ? "Each segment 15 minutes" : "每段 15 分钟",
        pause: locale === "en" ? "Pause" : "暂停",
        start: locale === "en" ? "Start" : "开始",
        note:
            locale === "en"
                ? "Tip: background audio loops every 15 minutes; you can stop when the music ends."
                : "提示：音频每循环一次为 15 分钟，你可以根据音乐结束来判断时长。",
    }

    const clearTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current)
            timerRef.current = null
        }
    }

    useEffect(() => {
        audioRef.current = new Audio("/audio/meditation-music.mp3")
        audioRef.current.loop = true

        return () => {
            audioRef.current?.pause()
            audioRef.current = null
            clearTimer()
        }
    }, [])

    useEffect(() => {
        clearTimer()

        if (isPlaying) {
            timerRef.current = setInterval(() => {
                setElapsedTime((prev) => {
                    const newTime = prev + 1
                    if (newTime > 0 && newTime % SEGMENT_DURATION === 0) {
                        setCurrentSegment(Math.floor(newTime / SEGMENT_DURATION) + 1)
                    }
                    return newTime
                })
            }, 1000)

            audioRef.current?.play().catch((e) => console.log("Audio play failed:", e))
        } else {
            audioRef.current?.pause()
        }

        return () => clearTimer()
    }, [isPlaying])

    const handlePauseOrStart = () => {
        setIsPlaying((prev) => !prev)
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }

    return (
        <div className="max-w-2xl mx-auto animate-in fade-in duration-500">
            {showBackButton && (
                <div className="mb-4">
                    <BackButton />
                </div>
            )}

            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">{t.title}</h1>
            </div>

            <Card className="mb-8 overflow-hidden border-none shadow-lg bg-card/50 backdrop-blur-sm">
                <CardContent className="p-8 md:p-12 flex flex-col items-center justify-center min-h-[400px]">
                    <div className="relative w-64 h-64 mb-8 flex items-center justify-center">
                        {isPlaying && (
                            <>
                                <div className="pointer-events-none absolute inset-0 rounded-full border-4 border-primary/20 animate-ripple" />
                                <div
                                    className="pointer-events-none absolute inset-0 rounded-full border-4 border-primary/10 animate-ripple"
                                    style={{ animationDelay: "2s" }}
                                />
                            </>
                        )}

                        <div className="relative z-10 w-full h-full rounded-full border-8 border-primary/30 flex flex-col items-center justify-center bg-background/50 backdrop-blur-md">
                            <div className="text-center">
                                <div className="text-sm text-muted-foreground mb-1 font-medium uppercase tracking-wider">
                                    {t.segmentLabel}
                                </div>
                                <div className="text-5xl font-bold tabular-nums tracking-tight text-primary">
                                    {formatTime(elapsedTime)}
                                </div>
                                <div className="text-xs text-muted-foreground mt-2">{t.segmentHint}</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-center mb-8">
                        <Button
                            size="lg"
                            variant="default"
                            className="h-20 w-20 rounded-full text-xl bg-primary text-primary-foreground shadow-xl hover:bg-primary/90 pointer-events-auto"
                            onClick={handlePauseOrStart}
                            type="button"
                            aria-pressed={isPlaying}
                        >
                            {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
                            <span className="sr-only">{isPlaying ? t.pause : t.start}</span>
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <div className="text-center text-sm text-muted-foreground bg-muted/30 p-4 rounded-lg">
                <p>{t.note}</p>
            </div>
        </div>
    )
}
