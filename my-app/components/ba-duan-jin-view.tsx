"use client"

import type React from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import { BaDuanJinSettingsDialog } from "@/components/ba-duan-jin-settings-dialog"
import { BackButton } from "@/components/back-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useBaDuanJinSettings } from "@/hooks/useBaDuanJinSettings"
import { useBreathSound } from "@/hooks/useBreathSound"
import { Clapperboard, Headphones, Pause, Play, Settings2 } from "lucide-react"

type MovementType = "intro" | "section" | "ending"

type MovementItem = {
    id: number
    name: string
    type: MovementType
    cue: InstructionCue
    settingsId?: number
}

type BaDuanJinViewProps = {
    showBackButton?: boolean
    locale?: "zh" | "en"
}

type Phase = "idle" | "prepare" | "section-intro" | "breath" | "ending"
type MediaMode = "video" | "audio"

type InstructionCue = {
    audio?: string
    video?: string
    fallbackAudio?: string
}

const mediaBase =
    (process.env.NEXT_PUBLIC_VIDEO_BASE_URL && process.env.NEXT_PUBLIC_VIDEO_BASE_URL.replace(/\/$/, "")) || "/audio"

const namedCuePath = (folder: string, base: string, ext: "MP3" | "mp4") =>
    `${mediaBase}/${encodeURIComponent(folder)}/${encodeURIComponent(base)}.${ext}`

const PREPARE_CUE: InstructionCue = {
    audio: namedCuePath("prepare", "八段锦音效", "MP3"),
    video: namedCuePath("prepare", "八段锦音效", "mp4"),
}

const SECTION_CUES: InstructionCue[] = [
    { audio: namedCuePath("section-1", "八段锦音效1", "MP3"), video: namedCuePath("section-1", "八段锦音效1", "mp4") },
    { audio: namedCuePath("section-2", "八段锦音效2", "MP3"), video: namedCuePath("section-2", "八段锦音效2", "mp4") },
    { audio: namedCuePath("section-3", "八段锦音效3", "MP3"), video: namedCuePath("section-3", "八段锦音效3", "mp4") },
    { audio: namedCuePath("section-4", "八段锦音效4", "MP3"), video: namedCuePath("section-4", "八段锦音效4", "mp4") },
    { audio: namedCuePath("section-5", "八段锦音效5", "MP3"), video: namedCuePath("section-5", "八段锦音效5", "mp4") },
    { audio: namedCuePath("section-6", "八段锦音效6", "MP3"), video: namedCuePath("section-6", "八段锦音效6", "mp4") },
    { audio: namedCuePath("section-7", "八段锦音效7", "MP3"), video: namedCuePath("section-7", "八段锦音效7", "mp4") },
    { audio: namedCuePath("section-8", "八段锦音效8", "MP3"), video: namedCuePath("section-8", "八段锦音效8", "mp4") },
]

const ENDING_CUE: InstructionCue = {
    audio: namedCuePath("ending", "八段锦音效10", "MP3"),
    video: namedCuePath("ending", "八段锦音效10", "mp4"),
}

const MOVEMENTS: MovementItem[] = [
    { id: 0, name: "序言 · 预备", type: "intro", cue: PREPARE_CUE },
    { id: 1, name: "第一式 · 双手托天理三焦", type: "section", settingsId: 1, cue: SECTION_CUES[0] },
    { id: 2, name: "第二式 · 左右开弓似射雕", type: "section", settingsId: 2, cue: SECTION_CUES[1] },
    { id: 3, name: "第三式 · 调理脾胃须单举", type: "section", settingsId: 3, cue: SECTION_CUES[2] },
    { id: 4, name: "第四式 · 五劳七伤往后瞧", type: "section", settingsId: 4, cue: SECTION_CUES[3] },
    { id: 5, name: "第五式 · 摇头摆尾去心火", type: "section", settingsId: 5, cue: SECTION_CUES[4] },
    { id: 6, name: "第六式 · 两手攀足固肾腰", type: "section", settingsId: 6, cue: SECTION_CUES[5] },
    { id: 7, name: "第七式 · 攒拳怒目增气力", type: "section", settingsId: 7, cue: SECTION_CUES[6] },
    { id: 8, name: "第八式 · 背后七颠百病消", type: "section", settingsId: 8, cue: SECTION_CUES[7] },
    { id: 9, name: "收势 · 结束", type: "ending", cue: ENDING_CUE },
]

const MOVEMENTS_EN: MovementItem[] = [
    { id: 0, name: "Intro · Prepare", type: "intro", cue: PREPARE_CUE },
    { id: 1, name: "Section 1 · Two Hands Hold up the Heavens", type: "section", settingsId: 1, cue: SECTION_CUES[0] },
    { id: 2, name: "Section 2 · Drawing the Bow", type: "section", settingsId: 2, cue: SECTION_CUES[1] },
    { id: 3, name: "Section 3 · Separate Heaven and Earth", type: "section", settingsId: 3, cue: SECTION_CUES[2] },
    { id: 4, name: "Section 4 · Wise Owl Gazes Backwards", type: "section", settingsId: 4, cue: SECTION_CUES[3] },
    { id: 5, name: "Section 5 · Sway the Head and Shake the Tail", type: "section", settingsId: 5, cue: SECTION_CUES[4] },
    { id: 6, name: "Section 6 · Two Hands Hold the Feet", type: "section", settingsId: 6, cue: SECTION_CUES[5] },
    { id: 7, name: "Section 7 · Clench Fists with Fierce Eyes", type: "section", settingsId: 7, cue: SECTION_CUES[6] },
    { id: 8, name: "Section 8 · Bounce on the Heels", type: "section", settingsId: 8, cue: SECTION_CUES[7] },
    { id: 9, name: "Closing · Ending", type: "ending", cue: ENDING_CUE },
]

export function BaDuanJinView({ showBackButton = false, locale = "zh" }: BaDuanJinViewProps) {
    const movementList = locale === "en" ? MOVEMENTS_EN : MOVEMENTS

    const { settings, getMovementDurations } = useBaDuanJinSettings()
    const { stop: stopSound } = useBreathSound()

    const [isPlaying, setIsPlaying] = useState(false)
    const [mediaMode, setMediaMode] = useState<MediaMode>("video")
    const [phase, setPhase] = useState<Phase>("idle")
    const [currentMovementIndex, setCurrentMovementIndex] = useState(0)
    const [currentRep, setCurrentRep] = useState(1)
    const [breathState, setBreathState] = useState<"inhale" | "exhale">("inhale")
    const [progress, setProgress] = useState(0)
    const [playedIntroFlags, setPlayedIntroFlags] = useState<boolean[]>(Array(movementList.length).fill(false))
    const [currentVideoSrc, setCurrentVideoSrc] = useState<string>(movementList[0]?.cue.video ?? "")

    const timerRef = useRef<NodeJS.Timeout | null>(null)
    const progressTimerRef = useRef<NodeJS.Timeout | null>(null)
    const instructionAudioRef = useRef<HTMLAudioElement | null>(null)
    const instructionVideoRef = useRef<HTMLVideoElement | null>(null)
    const currentInstructionElementRef = useRef<HTMLMediaElement | null>(null)
    const phaseEndAtRef = useRef<number>(0)
    const breathRemainingRef = useRef<number>(0)
    const isPlayingRef = useRef(false)
    const sectionIntroTargetRef = useRef<number | null>(null)
    const [prefetchVideoSrc, setPrefetchVideoSrc] = useState<string>("")

    const currentMovement = movementList[currentMovementIndex]

    const t = {
        title: locale === "en" ? "Baduanjin timer" : "八段锦节奏练习",
        settings: locale === "en" ? "Settings" : "设置",
        currentMovementLabel:
            locale === "en"
                ? `Current movement (${currentMovementIndex + 1}/${movementList.length})`
                : `当前动作 (${currentMovementIndex + 1}/${movementList.length})`,
        mediaMode: locale === "en" ? "Media mode" : "媒体模式",
        videoMode: locale === "en" ? "Video follow" : "视频跟练",
        audioMode: locale === "en" ? "Audio only" : "纯音频",
        videoNotSupported:
            locale === "en" ? "Your browser does not support video playback." : "你的浏览器不支持视频播放。",
        intro: locale === "en" ? "Intro" : "前言",
        outro: locale === "en" ? "Closing" : "收势",
        audioModeLabel: locale === "en" ? "Audio follow mode" : "音频跟练模式",
        audioModeHint: locale === "en" ? "Play a new segment audio cue" : "播放新的分节口令音频",
        inhale: locale === "en" ? "Inhale" : "吸气",
        exhale: locale === "en" ? "Exhale" : "呼气",
        durationLabel: locale === "en" ? "Duration" : "时长",
        prev: locale === "en" ? "Previous" : "上一节",
        next: locale === "en" ? "Next" : "下一节",
        stop: locale === "en" ? "Stop" : "停止",
    }

    const clearTimers = () => {
        if (timerRef.current) clearTimeout(timerRef.current as unknown as number)
        if (progressTimerRef.current) clearInterval(progressTimerRef.current as unknown as number)
    }

    const handleMediaModeChange = (nextMode: MediaMode) => {
        stopInstructionMedia()
        setMediaMode(nextMode)
        if (nextMode === "video") {
            const cue = movementList[currentMovementIndex]?.cue
            setCurrentVideoSrc((prev) => prev || cue?.video || "")
        }
    }

    const ensureInstructionAudio = () => {
        if (!instructionAudioRef.current) {
            instructionAudioRef.current = new Audio()
        }
        return instructionAudioRef.current
    }

    // eslint-disable-next-line react-hooks/preserve-manual-memoization
    const stopInstructionMedia = useCallback(() => {
        if (currentInstructionElementRef.current) {
            try {
                currentInstructionElementRef.current.pause()
            } catch (e) {
                // ignore
            }
            if ("currentTime" in currentInstructionElementRef.current) {
                currentInstructionElementRef.current.currentTime = 0
            }
        }
        if (instructionAudioRef.current) {
            instructionAudioRef.current.pause()
            instructionAudioRef.current.currentTime = 0
        }
        if (instructionVideoRef.current) {
            instructionVideoRef.current.pause()
            instructionVideoRef.current.currentTime = 0
        }
        currentInstructionElementRef.current = null
    }, [])

    const playInstructionCue = (cue: InstructionCue, onEnded: () => void, options?: { updateVideo?: boolean }) => {
        const audioEl = ensureInstructionAudio()
        const videoEl = instructionVideoRef.current

        const candidates: { element: HTMLMediaElement; src: string; type: "audio" | "video" }[] = []
        if (mediaMode === "video" && cue.video && videoEl) {
            candidates.push({ element: videoEl, src: cue.video, type: "video" })
        }
        if (mediaMode === "video" && cue.audio) {
            candidates.push({ element: audioEl, src: cue.audio, type: "audio" })
        }
        if (mediaMode === "audio" && cue.audio) {
            candidates.push({ element: audioEl, src: cue.audio, type: "audio" })
        }
        if (cue.fallbackAudio) {
            candidates.push({ element: audioEl, src: cue.fallbackAudio, type: "audio" })
        }

        if (candidates.length === 0) {
            onEnded()
            return
        }

        stopInstructionMedia()

        const tryPlay = (index: number) => {
            if (index >= candidates.length) {
                currentInstructionElementRef.current = null
                onEnded()
                return
            }

            const { element, src, type } = candidates[index]
            currentInstructionElementRef.current = element

            if (type === "video" && options?.updateVideo !== false) {
                setCurrentVideoSrc(src)
            }

            element.onended = () => {
                if (!isPlayingRef.current) return
                currentInstructionElementRef.current = null
                onEnded()
            }
            element.onerror = () => {
                if (!isPlayingRef.current) return
                tryPlay(index + 1)
            }

            try {
                element.pause()
                element.currentTime = 0
                element.src = src
                if (type === "video") {
                    element.load()
                }
            } catch (e) {
                tryPlay(index + 1)
                return
            }

            if (type === "video") {
                const onReady = () => {
                    element.removeEventListener("loadeddata", onReady)
                    element
                        .play()
                        .then(() => {})
                        .catch(() => {
                            if (!isPlayingRef.current) return
                            tryPlay(index + 1)
                        })
                }
                element.addEventListener("loadeddata", onReady, { once: true })
            } else {
                element.play().catch(() => {
                    if (!isPlayingRef.current) return
                    tryPlay(index + 1)
                })
            }
        }

        tryPlay(0)
    }

    useEffect(() => {
        isPlayingRef.current = isPlaying
    }, [isPlaying])

    useEffect(() => {
        return () => {
            clearTimers()
            stopSound()
            stopInstructionMedia()
        }
    }, [stopInstructionMedia, stopSound])

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

        phaseEndAtRef.current = Date.now() + durationMs
        breathRemainingRef.current = durationMs
        startProgressTimer(durationMs)

        timerRef.current = setTimeout(() => {
            setProgress(100)
            onComplete()
        }, durationMs) as unknown as NodeJS.Timeout
    }

    const startBreathCycle = (movementIdx: number, rep: number) => {
        if (!isPlayingRef.current) return
        const movement = movementList[movementIdx]
        if (!movement || movement.type !== "section") return
        const durations = getMovementDurations(movement.settingsId ?? movementIdx)
        startBreathPhase("inhale", durations.inhaleDuration * 1000, () => {
            if (!isPlayingRef.current) return
            startBreathPhase("exhale", durations.exhaleDuration * 1000, () => {
                if (!isPlayingRef.current) return
                const targetReps = movement.settingsId === 1 ? 3 : settings.repetitions
                if (rep >= targetReps) {
                    const nextMovement = movementIdx + 1
                    if (nextMovement >= movementList.length) {
                        handleStop()
                    } else {
                        startMovementIntro(nextMovement)
                    }
                } else {
                    setCurrentRep(rep + 1)
                    startBreathCycle(movementIdx, rep + 1)
                }
            })
        })
    }

    const startMovementIntro = (movementIdx: number, options?: { forceIntro?: boolean }) => {
        if (!isPlayingRef.current) return
        const movement = movementList[movementIdx]
        if (!movement) {
            handleStop()
            return
        }

        setCurrentMovementIndex(movementIdx)
        setCurrentRep(1)
        setBreathState("inhale")
        sectionIntroTargetRef.current = movementIdx

        const cue = movement.cue ?? { audio: `/audio/movement-${movementIdx + 1}.mp3` }
        if (cue.video) {
            setCurrentVideoSrc(cue.video)
        }

        const isSection = movement.type === "section"
        const alreadyPlayed = playedIntroFlags[movementIdx]
        const shouldSkipIntro = isSection && alreadyPlayed && !options?.forceIntro

        if (movement.type === "intro") {
            setPhase("prepare")
        } else if (movement.type === "ending") {
            setPhase("ending")
        } else {
            setPhase("section-intro")
        }

        if (shouldSkipIntro) {
            startBreathCycle(movementIdx, 1)
            return
        }

        if (isSection) {
            const nextFlags = [...playedIntroFlags]
            nextFlags[movementIdx] = true
            setPlayedIntroFlags(nextFlags)
            playInstructionCue(cue, () => {
                startBreathCycle(movementIdx, 1)
            })
            return
        }

        playInstructionCue(cue, () => {
            const nextMovement = movementIdx + 1
            if (movement.type === "intro" && nextMovement < movementList.length) {
                startMovementIntro(nextMovement)
            } else {
                handleStop()
            }
        })
    }

    const handleStart = () => {
        if (isPlaying) return

        // 第一次开始
        if (phase === "idle") {
            setPlayedIntroFlags(Array(movementList.length).fill(false))
            setCurrentMovementIndex(0)
            setCurrentRep(1)
            setBreathState("inhale")
            setProgress(0)
            isPlayingRef.current = true
            setIsPlaying(true)
            startMovementIntro(0)
            return
        }

        // 恢复暂停
        isPlayingRef.current = true
        setIsPlaying(true)

        if (phase === "prepare" || phase === "section-intro" || phase === "ending") {
            const mediaEl = currentInstructionElementRef.current
            if (mediaEl) {
                mediaEl.play().catch(() => {
                    if (sectionIntroTargetRef.current !== null) {
                        startMovementIntro(sectionIntroTargetRef.current)
                    }
                })
            } else {
                if (sectionIntroTargetRef.current !== null) {
                    startMovementIntro(sectionIntroTargetRef.current)
                }
            }
        }

        if (phase === "breath") {
            const movement = movementList[currentMovementIndex]
            if (!movement || movement.type !== "section") return
            const durations = getMovementDurations(movement.settingsId ?? currentMovementIndex)
            const inhaleMs = durations.inhaleDuration * 1000
            const exhaleMs = durations.exhaleDuration * 1000
            const remaining = breathRemainingRef.current || (breathState === "inhale" ? inhaleMs : exhaleMs)
            const resumeBreathState = breathState
            const repAtPause = currentRep

            const afterExhale = () => {
                const targetReps = movement.settingsId === 1 ? 3 : settings.repetitions
                if (repAtPause >= targetReps) {
                    const nextMovement = currentMovementIndex + 1
                    if (nextMovement >= movementList.length) {
                        handleStop()
                    } else {
                        startMovementIntro(nextMovement)
                    }
                } else {
                    setCurrentRep((r) => r + 1)
                    startBreathCycle(currentMovementIndex, repAtPause + 1)
                }
            }

            if (resumeBreathState === "inhale") {
                startBreathPhase("inhale", remaining || inhaleMs, () => {
                    if (!isPlayingRef.current) return
                    startBreathPhase("exhale", exhaleMs, () => {
                        if (!isPlayingRef.current) return
                        afterExhale()
                    })
                })
            } else {
                startBreathPhase("exhale", remaining || exhaleMs, () => {
                    if (!isPlayingRef.current) return
                    afterExhale()
                })
            }
        }
    }

    const handlePause = () => {
        isPlayingRef.current = false
        setIsPlaying(false)
        clearTimers()
        stopSound()
        if (currentInstructionElementRef.current && !currentInstructionElementRef.current.paused) {
            currentInstructionElementRef.current.pause()
        }
        if (phase === "breath") {
            breathRemainingRef.current = Math.max(phaseEndAtRef.current - Date.now(), 0)
        }
    }

    const handleStop = () => {
        isPlayingRef.current = false
        setIsPlaying(false)
        clearTimers()
        stopSound()
        stopInstructionMedia()
        instructionAudioRef.current = null
        setPhase("idle")
        setCurrentMovementIndex(0)
        setCurrentRep(1)
        setBreathState("inhale")
        setProgress(0)
        setPlayedIntroFlags(Array(movementList.length).fill(false))
        sectionIntroTargetRef.current = null
        setCurrentVideoSrc(movementList[0]?.cue.video || "")
    }

    const handleJump = (direction: -1 | 1) => {
        const target = currentMovementIndex + direction
        if (target < 0 || target >= movementList.length) return

        clearTimers()
        stopSound()
        stopInstructionMedia()
        breathRemainingRef.current = 0
        phaseEndAtRef.current = 0

        isPlayingRef.current = true
        setIsPlaying(true)
        startMovementIntro(target, { forceIntro: true })
    }

    useEffect(() => {
        if (mediaMode !== "video") return
        const cue = movementList[currentMovementIndex]?.cue
        if (cue?.video && currentVideoSrc !== cue.video) {
            setCurrentVideoSrc(cue.video)
        }
        const nextMovement = movementList[currentMovementIndex + 1]
        const nextSrc = nextMovement?.cue?.video ?? ""
        setPrefetchVideoSrc(nextSrc || "")
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentMovementIndex, mediaMode, currentVideoSrc])

    const isPreparePhase = phase === "prepare"
    const isEndingPhase = phase === "ending"
    const headerTitle = currentMovement.name
    const headerSub = isPreparePhase ? t.intro : isEndingPhase ? t.outro : t.currentMovementLabel

    return (
        <div className="max-w-5xl mx-auto animate-in fade-in duration-500">
            {showBackButton && (
                <div className="mb-4">
                    <BackButton />
                </div>
            )}

            <div className="flex items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-2">{t.title}</h1>
                </div>
                <BaDuanJinSettingsDialog
                    trigger={
                        <Button variant="secondary" className="inline-flex items-center gap-2">
                            <Settings2 className="h-4 w-4" />
                            {t.settings}
                        </Button>
                    }
                />
            </div>

            <Card className="border-none shadow-lg bg-card/50 backdrop-blur-sm overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-muted">
                    <div
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${(currentMovementIndex / movementList.length) * 100}%` }}
                    />
                </div>

                <CardContent className="p-8 md:p-12 flex flex-col items-center justify-center min-h-[520px]">
                    <div className="text-center mb-12 w-full">
                        <div className="text-sm font-medium text-primary mb-2 uppercase tracking-wider">{headerSub}</div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">{headerTitle}</h2>
                    </div>

                    <div className="w-full mb-10">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clapperboard className="h-4 w-4" />
                                <span>{t.mediaMode}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant={mediaMode === "video" ? "default" : "outline"}
                                    size="sm"
                                    className="flex items-center gap-2"
                                    onClick={() => handleMediaModeChange("video")}
                                >
                                    <Clapperboard className="h-4 w-4" />
                                    {t.videoMode}
                                </Button>
                                <Button
                                    variant={mediaMode === "audio" ? "default" : "outline"}
                                    size="sm"
                                    className="flex items-center gap-2"
                                    onClick={() => handleMediaModeChange("audio")}
                                >
                                    <Headphones className="h-4 w-4" />
                                    {t.audioMode}
                                </Button>
                            </div>
                        </div>

                        {mediaMode === "video" ? (
                            <div className="mt-4 overflow-hidden rounded-2xl border bg-black/80 shadow-inner">
                                <video
                                    key={currentVideoSrc}
                                    ref={instructionVideoRef}
                                    src={currentVideoSrc}
                                    controls
                                    playsInline
                                    preload="metadata"
                                    className="w-full aspect-video"
                                >
                                    {t.videoNotSupported}
                                </video>
                                {prefetchVideoSrc ? (
                                    <video
                                        className="hidden"
                                        src={prefetchVideoSrc}
                                        preload="metadata"
                                        aria-hidden="true"
                                    />
                                ) : null}
                            </div>
                        ) : (
                            <div className="mt-4 flex items-center justify-between rounded-2xl border bg-muted/40 px-4 py-3 text-sm">
                                <div className="flex items-center gap-2">
                                    <Headphones className="h-4 w-4 text-primary" />
                                    <span className="font-medium text-foreground">{t.audioModeLabel}</span>
                                </div>
                                <span className="text-muted-foreground text-xs">{t.audioModeHint}</span>
                            </div>
                        )}
                    </div>

                    {mediaMode === "audio" && (
                        <div className="relative w-64 h-64 mb-12 flex items-center justify-center">
                            <div
                                className={cn(
                                    "absolute inset-0 rounded-full border-4 transition-all duration-1000",
                                    breathState === "inhale"
                                        ? "border-primary/50 scale-110"
                                        : "border-primary/20 scale-90",
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
                                    <div className="text-2xl font-bold mb-1">{breathState === "inhale" ? t.inhale : t.exhale}</div>
                                    <div className="mt-2 text-xs text-muted-foreground">
                                        {breathState === "inhale"
                                            ? `${t.durationLabel} ${getMovementDurations(currentMovement.id).inhaleDuration}${locale === "en" ? " s" : " 秒"}`
                                            : `${t.durationLabel} ${getMovementDurations(currentMovement.id).exhaleDuration}${locale === "en" ? " s" : " 秒"}`}
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
                    )}

                    <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
                        <Button
                            variant="outline"
                            onClick={() => handleJump(-1)}
                            disabled={currentMovementIndex === 0}
                            className="min-w-[96px]"
                        >
                            {t.prev}
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => handleJump(1)}
                            disabled={currentMovementIndex === movementList.length - 1}
                            className="min-w-[96px]"
                        >
                            {t.next}
                        </Button>
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
                            {t.stop}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
