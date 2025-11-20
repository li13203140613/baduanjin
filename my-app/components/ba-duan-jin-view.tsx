"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { BaDuanJinSettingsDialog } from "@/components/ba-duan-jin-settings-dialog"
import { BackButton } from "@/components/back-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useBaDuanJinSettings } from "@/hooks/useBaDuanJinSettings"
import { useBreathSound } from "@/hooks/useBreathSound"
import { Pause, Play, Settings2 } from "lucide-react"

const MOVEMENTS = [
    { id: 1, name: "第一式：双手托天理三焦" },
    { id: 2, name: "第二式：左右开弓似射雕" },
    { id: 3, name: "第三式：调理脾胃须单举" },
    { id: 4, name: "第四式：五劳七伤往后瞧" },
    { id: 5, name: "第五式：摇头摆尾去心火" },
    { id: 6, name: "第六式：两手攀足固肾腰" },
    { id: 7, name: "第七式：攒拳怒目增气力" },
    { id: 8, name: "第八式：背后七颠百病消" },
]

type BaDuanJinViewProps = {
    showBackButton?: boolean
}

export function BaDuanJinView({ showBackButton = false }: BaDuanJinViewProps) {
    const { settings, getMovementDurations } = useBaDuanJinSettings()
    const { playInhale, playExhale, stop: stopSound } = useBreathSound()

    const [isPlaying, setIsPlaying] = useState(false)
    const [currentMovementIndex, setCurrentMovementIndex] = useState(0)
    const [currentRep, setCurrentRep] = useState(1)
    const [breathState, setBreathState] = useState<"inhale" | "exhale">("inhale")
    const [progress, setProgress] = useState(0)

    const timerRef = useRef<NodeJS.Timeout | null>(null)

    const currentMovement = MOVEMENTS[currentMovementIndex]
    const currentDurations = getMovementDurations(currentMovement.id)
    const repetitions = settings.repetitions

    useEffect(() => {
        if (!isPlaying) {
            stopSound()
            return
        }

        if (breathState === "inhale") {
            playInhale(currentDurations.inhaleDuration)
        } else {
            playExhale(currentDurations.exhaleDuration)
        }
    }, [isPlaying, breathState, currentDurations.inhaleDuration, currentDurations.exhaleDuration, playInhale, playExhale, stopSound])

    useEffect(() => {
        if (!isPlaying) {
            if (timerRef.current) clearInterval(timerRef.current)
            return
        }

        const cycleDuration =
            (breathState === "inhale" ? currentDurations.inhaleDuration : currentDurations.exhaleDuration) * 1000
        let phaseStartTime = Date.now()

        const runLoop = () => {
            const now = Date.now()
            const elapsed = now - phaseStartTime
            const progressPercent = Math.min((elapsed / cycleDuration) * 100, 100)

            setProgress(progressPercent)

            if (elapsed >= cycleDuration) {
                phaseStartTime = now

                setBreathState((prev) => {
                    if (prev === "inhale") return "exhale"

                    setCurrentRep((r) => {
                        if (r >= repetitions) {
                            setCurrentMovementIndex((m) => {
                                if (m >= MOVEMENTS.length - 1) {
                                    setIsPlaying(false)
                                    return 0
                                }
                                return m + 1
                            })
                            return 1
                        }
                        return r + 1
                    })
                    return "inhale"
                })
                setProgress(0)
            }
        }

        timerRef.current = setInterval(runLoop, 50)

        return () => {
            if (timerRef.current) clearInterval(timerRef.current)
        }
    }, [isPlaying, breathState, currentDurations.inhaleDuration, currentDurations.exhaleDuration, repetitions])

    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current)
            stopSound()
        }
    }, [stopSound])

    const handleStop = () => {
        setIsPlaying(false)
        setCurrentMovementIndex(0)
        setCurrentRep(1)
        setBreathState("inhale")
        setProgress(0)
        stopSound()

        if (timerRef.current) {
            clearInterval(timerRef.current)
        }
    }

    return (
        <div className="max-w-5xl mx-auto animate-in fade-in duration-500">
            {showBackButton && (
                <div className="mb-4">
                    <BackButton />
                </div>
            )}

            <div className="flex items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-2">八段锦练习</h1>
                </div>
                <BaDuanJinSettingsDialog
                    trigger={
                        <Button variant="secondary" className="inline-flex items-center gap-2">
                            <Settings2 className="h-4 w-4" />
                            设置
                        </Button>
                    }
                />
            </div>

            <Card className="border-none shadow-lg bg-card/50 backdrop-blur-sm overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-muted">
                    <div
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${(currentMovementIndex / MOVEMENTS.length) * 100}%` }}
                    />
                </div>

                <CardContent className="p-8 md:p-12 flex flex-col items-center justify-center min-h-[520px]">
                    <div className="text-center mb-12 w-full">
                        <div className="text-sm font-medium text-primary mb-2 uppercase tracking-wider">
                            当前动作 ({currentMovementIndex + 1}/{MOVEMENTS.length})
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">{currentMovement.name}</h2>
                    </div>

                    <div className="relative w-64 h-64 mb-12 flex items-center justify-center">
                        <div
                            className={cn(
                                "absolute inset-0 rounded-full border-4 transition-all duration-1000",
                                breathState === "inhale" ? "border-primary/50 scale-110" : "border-primary/20 scale-90",
                            )}
                        />
                        <div
                            className={cn(
                                "w-48 h-48 rounded-full flex items-center justify-center transition-all duration-1000 shadow-2xl",
                                breathState === "inhale"
                                    ? "bg-primary text-primary-foreground scale-110"
                                    : "bg-muted text-muted-foreground scale-90",
                            )}
                        >
                            <div className="text-center">
                                <div className="text-2xl font-bold mb-1">{breathState === "inhale" ? "吸气" : "呼气"}</div>
                                <div className="mt-2 text-xs text-muted-foreground">
                                    {breathState === "inhale"
                                        ? `时长 ${currentDurations.inhaleDuration} 秒`
                                        : `时长 ${currentDurations.exhaleDuration} 秒`}
                                </div>
                            </div>
                        </div>

                        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
                            <circle
                                cx="128"
                                cy="128"
                                r="120"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="4"
                                className="text-muted/20"
                            />
                            <circle
                                cx="128"
                                cy="128"
                                r="120"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="4"
                                className="text-primary transition-all duration-75"
                                strokeDasharray={2 * Math.PI * 120}
                                strokeDashoffset={2 * Math.PI * 120 * (1 - progress / 100)}
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>

                    <div className="flex items-center gap-4 mb-8">
                        <div className="text-center px-6 py-3 bg-muted/30 rounded-lg">
                            <div className="text-xs text-muted-foreground mb-1">当前次数</div>
                            <div className="text-2xl font-bold font-mono">
                                {currentRep} <span className="text-sm text-muted-foreground">/ {repetitions}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        {!isPlaying ? (
                            <Button
                                size="lg"
                                className="h-16 w-16 rounded-full text-xl shadow-xl hover:scale-105 transition-transform"
                                onClick={() => setIsPlaying(true)}
                            >
                                <Play className="h-6 w-6 ml-1" />
                            </Button>
                        ) : (
                            <Button
                                size="lg"
                                variant="outline"
                                className="h-16 w-16 rounded-full text-xl border-2 bg-transparent"
                                onClick={() => setIsPlaying(false)}
                            >
                                <Pause className="h-6 w-6" />
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
