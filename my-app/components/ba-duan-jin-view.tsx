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

type Phase = "idle" | "prepare" | "section-intro" | "breath" | "ending"

export function BaDuanJinView({ showBackButton = false }: BaDuanJinViewProps) {
    const { settings, getMovementDurations } = useBaDuanJinSettings()
    const { playInhale, playExhale, stop: stopSound } = useBreathSound()

    const [isPlaying, setIsPlaying] = useState(false)
    const [phase, setPhase] = useState<Phase>("idle")
    const [currentMovementIndex, setCurrentMovementIndex] = useState(0)
    const [currentRep, setCurrentRep] = useState(1)
    const [breathState, setBreathState] = useState<"inhale" | "exhale">("inhale")
    const [progress, setProgress] = useState(0)
    const [statusText, setStatusText] = useState("待开始")
    const [playedIntroFlags, setPlayedIntroFlags] = useState<boolean[]>(Array(MOVEMENTS.length).fill(false))

    const timerRef = useRef<NodeJS.Timeout | null>(null)
    const progressTimerRef = useRef<NodeJS.Timeout | null>(null)
    const instructionAudioRef = useRef<HTMLAudioElement | null>(null)
    const phaseEndAtRef = useRef<number>(0)
    const isPlayingRef = useRef(false)
    const sectionIntroTargetRef = useRef<number | null>(null)

    const currentMovement = MOVEMENTS[currentMovementIndex]
    const repetitions = settings.repetitions
    const currentSectionReps = currentMovementIndex === 0 ? 3 : repetitions // 第1节 3 次，其余沿用设置

    useEffect(() => {
        isPlayingRef.current = isPlaying
    }, [isPlaying])

    useEffect(() => {
        return () => {
            clearTimers()
            stopSound()
            instructionAudioRef.current?.pause()
        }
    }, [stopSound])

    const clearTimers = () => {
        if (timerRef.current) clearTimeout(timerRef.current as unknown as number)
        if (progressTimerRef.current) clearInterval(progressTimerRef.current as unknown as number)
    }

    const playInstructionAudio = (src: string, onEnded: () => void) => {
        const audio = new Audio(src)
        instructionAudioRef.current = audio
        audio.onended = () => {
            if (!isPlayingRef.current) return
            onEnded()
        }
        audio.onerror = () => {
            if (!isPlayingRef.current) return
            onEnded()
        }
        audio.play().catch(() => onEnded())
    }

    const startProgressTimer = (durationMs: number) => {
        if (progressTimerRef.current) clearInterval(progressTimerRef.current as unknown as number)
        const start = Date.now()
        progressTimerRef.current = setInterval(() => {
            const elapsed = Date.now() - start
            const percent = Math.min((elapsed / durationMs) * 100, 100)
            setProgress(percent)
        }, 50)
    }

    const startBreathPhase = (phaseType: "inhale" | "exhale", durationMs: number, onComplete: () => void) => {
        clearTimers()
        setBreathState(phaseType)
        setPhase("breath")
        setStatusText(`第 ${currentMovementIndex + 1} 节 · ${phaseType === "inhale" ? "吸气" : "呼气"}`)

        phaseEndAtRef.current = Date.now() + durationMs
        startProgressTimer(durationMs)

        if (phaseType === "inhale") {
            playInhale(durationMs / 1000)
        } else {
            playExhale(durationMs / 1000)
        }

        timerRef.current = setTimeout(() => {
            setProgress(100)
            onComplete()
        }, durationMs) as unknown as NodeJS.Timeout
    }

    const startSectionIntro = (movementIdx: number) => {
        if (!isPlayingRef.current) return
        setCurrentMovementIndex(movementIdx)
        setCurrentRep(1)
        setBreathState("inhale")

        const alreadyPlayed = playedIntroFlags[movementIdx]
        if (alreadyPlayed) {
            startBreathCycle(movementIdx, 1)
            return
        }

        sectionIntroTargetRef.current = movementIdx
        setPhase("section-intro")
        setStatusText(`第 ${movementIdx + 1} 节提示…`)

        const nextFlags = [...playedIntroFlags]
        nextFlags[movementIdx] = true
        setPlayedIntroFlags(nextFlags)

        playInstructionAudio(`/audio/section-${movementIdx + 1}.mp3`, () => {
            startBreathCycle(movementIdx, 1)
        })
    }

    const startBreathCycle = (movementIdx: number, rep: number) => {
        if (!isPlayingRef.current) return
        const durations = getMovementDurations(MOVEMENTS[movementIdx].id)
        startBreathPhase("inhale", durations.inhaleDuration * 1000, () => {
            if (!isPlayingRef.current) return
            startBreathPhase("exhale", durations.exhaleDuration * 1000, () => {
                if (!isPlayingRef.current) return
                const targetReps = movementIdx === 0 ? 3 : settings.repetitions
                if (rep >= targetReps) {
                    const nextMovement = movementIdx + 1
                    if (nextMovement >= MOVEMENTS.length) {
                        startEnding()
                    } else {
                        startSectionIntro(nextMovement)
                    }
                } else {
                    setCurrentRep(rep + 1)
                    startBreathCycle(movementIdx, rep + 1)
                }
            })
        })
    }

    const startPrepare = () => {
        if (!isPlayingRef.current) return
        setPhase("prepare")
        setStatusText("预备中…")
        playInstructionAudio("/audio/prepare.mp3", () => startSectionIntro(0))
    }

    const startEnding = () => {
        if (!isPlayingRef.current) return
        setPhase("ending")
        setStatusText("结束提示…")
        clearTimers()
        playInstructionAudio("/audio/ending.mp3", () => {
            handleStop()
        })
    }

    const handleStart = () => {
        if (isPlaying) return

        // 初次开始
        if (phase === "idle") {
            setPlayedIntroFlags(Array(MOVEMENTS.length).fill(false))
            setCurrentMovementIndex(0)
            setCurrentRep(1)
            setBreathState("inhale")
            setProgress(0)
            isPlayingRef.current = true
            setIsPlaying(true)
            startPrepare()
            return
        }

        // 恢复暂停
        isPlayingRef.current = true
        setIsPlaying(true)

        if (phase === "prepare" || phase === "section-intro" || phase === "ending") {
            if (instructionAudioRef.current) {
                instructionAudioRef.current.play().catch(() => {
                    if (phase === "prepare") startPrepare()
                    else if (phase === "ending") startEnding()
                    else if (phase === "section-intro" && sectionIntroTargetRef.current !== null) {
                        startSectionIntro(sectionIntroTargetRef.current)
                    }
                })
            }
        }

        if (phase === "breath") {
            const now = Date.now()
            const remaining = Math.max(phaseEndAtRef.current - now, 0)
            const durations = getMovementDurations(MOVEMENTS[currentMovementIndex].id)
            const fallback =
                breathState === "inhale" ? durations.inhaleDuration * 1000 : durations.exhaleDuration * 1000
            startBreathPhase(breathState, remaining || fallback, () => {
                // resume completion logic for current rep
                if (!isPlayingRef.current) return
                if (breathState === "inhale") {
                    startBreathPhase("exhale", durations.exhaleDuration * 1000, () => {
                        const targetReps = currentMovementIndex === 0 ? 3 : settings.repetitions
                        if (currentRep >= targetReps) {
                            const nextMovement = currentMovementIndex + 1
                            if (nextMovement >= MOVEMENTS.length) {
                                startEnding()
                            } else {
                                startSectionIntro(nextMovement)
                            }
                        } else {
                            setCurrentRep((r) => r + 1)
                            startBreathCycle(currentMovementIndex, currentRep + 1)
                        }
                    })
                } else {
                    const targetReps = currentMovementIndex === 0 ? 3 : settings.repetitions
                    if (currentRep >= targetReps) {
                        const nextMovement = currentMovementIndex + 1
                        if (nextMovement >= MOVEMENTS.length) {
                            startEnding()
                        } else {
                            startSectionIntro(nextMovement)
                        }
                    } else {
                        setCurrentRep((r) => r + 1)
                        startBreathCycle(currentMovementIndex, currentRep + 1)
                    }
                }
            })
        }
    }

    const handlePause = () => {
        isPlayingRef.current = false
        setIsPlaying(false)
        clearTimers()
        stopSound()
        if (instructionAudioRef.current && !instructionAudioRef.current.paused) {
            instructionAudioRef.current.pause()
        }
    }

    const handleStop = () => {
        isPlayingRef.current = false
        setIsPlaying(false)
        clearTimers()
        stopSound()
        instructionAudioRef.current?.pause()
        instructionAudioRef.current = null
        setPhase("idle")
        setCurrentMovementIndex(0)
        setCurrentRep(1)
        setBreathState("inhale")
        setProgress(0)
        setStatusText("待开始")
        setPlayedIntroFlags(Array(MOVEMENTS.length).fill(false))
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
                                        ? `时长 ${getMovementDurations(currentMovement.id).inhaleDuration} 秒`
                                        : `时长 ${getMovementDurations(currentMovement.id).exhaleDuration} 秒`}
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
                                {currentRep}{" "}
                                <span className="text-sm text-muted-foreground">/ {currentSectionReps}</span>
                            </div>
                        </div>
                        <div className="text-center px-6 py-3 bg-muted/30 rounded-lg">
                            <div className="text-xs text-muted-foreground mb-1">状态</div>
                            <div className="text-sm font-medium text-muted-foreground min-w-[140px]">{statusText}</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        {!isPlaying ? (
                            <Button
                                size="lg"
                                className="h-16 w-16 rounded-full text-xl shadow-xl hover:scale-105 transition-transform"
                                onClick={handleStart}
                            >
                                <Play className="h-6 w-6 ml-1" />
                            </Button>
                        ) : (
                            <Button
                                size="lg"
                                variant="outline"
                                className="h-16 w-16 rounded-full text-xl border-2 bg-transparent"
                                onClick={handlePause}
                            >
                                <Pause className="h-6 w-6" />
                            </Button>
                        )}
                        <Button
                            variant="ghost"
                            className="text-sm text-muted-foreground hover:text-foreground"
                            onClick={handleStop}
                        >
                            停止
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
