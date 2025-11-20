"use client"

import { useCallback, useEffect, useRef } from "react"

export function useBreathSound() {
    const audioContextRef = useRef<AudioContext | null>(null)
    const noiseBufferRef = useRef<AudioBuffer | null>(null)
    const activeSourceRef = useRef<AudioBufferSourceNode | null>(null)
    const gainNodeRef = useRef<GainNode | null>(null)

    useEffect(() => {
        // Initialize AudioContext
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
        if (AudioContextClass) {
            audioContextRef.current = new AudioContextClass()

            // Create noise buffer (5 seconds is enough, we can loop it)
            const bufferSize = audioContextRef.current.sampleRate * 5
            const buffer = audioContextRef.current.createBuffer(1, bufferSize, audioContextRef.current.sampleRate)
            const data = buffer.getChannelData(0)

            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1
            }

            noiseBufferRef.current = buffer
        }

        return () => {
            audioContextRef.current?.close()
        }
    }, [])

    const stop = useCallback(() => {
        if (activeSourceRef.current) {
            try {
                activeSourceRef.current.stop()
            } catch (e) {
                // Ignore if already stopped
            }
            activeSourceRef.current = null
        }
    }, [])

    const playSound = useCallback(
        (type: "inhale" | "exhale", duration: number) => {
            if (!audioContextRef.current || !noiseBufferRef.current) return

            // Resume context if suspended (browser policy)
            if (audioContextRef.current.state === "suspended") {
                audioContextRef.current.resume()
            }

            stop() // Stop any previous sound

            const ctx = audioContextRef.current
            const source = ctx.createBufferSource()
            source.buffer = noiseBufferRef.current
            source.loop = true

            const filter = ctx.createBiquadFilter()
            const gainNode = ctx.createGain()

            if (type === "inhale") {
                // "Xi" sound: High pass / Band pass to simulate hissing
                filter.type = "bandpass"
                filter.frequency.value = 2000 // Higher frequency for "Xi"
                filter.Q.value = 1
                gainNode.gain.value = 0.3 // Slightly quieter
            } else {
                // "Hu" sound: Low pass to simulate rushing air
                filter.type = "lowpass"
                filter.frequency.value = 400 // Lower frequency for "Hu"
                filter.Q.value = 0.5
                gainNode.gain.value = 0.5
            }

            // Connect graph
            source.connect(filter)
            filter.connect(gainNode)
            gainNode.connect(ctx.destination)

            // Envelope
            const now = ctx.currentTime
            gainNode.gain.setValueAtTime(0, now)
            gainNode.gain.linearRampToValueAtTime(type === "inhale" ? 0.2 : 0.4, now + 0.5) // Fade in
            gainNode.gain.linearRampToValueAtTime(type === "inhale" ? 0.2 : 0.4, now + duration - 0.5) // Sustain
            gainNode.gain.linearRampToValueAtTime(0, now + duration) // Fade out

            source.start(now)
            source.stop(now + duration + 0.2) // Stop slightly after fade out

            activeSourceRef.current = source
            gainNodeRef.current = gainNode
        },
        [stop],
    )

    const playInhale = useCallback((duration: number) => playSound("inhale", duration), [playSound])
    const playExhale = useCallback((duration: number) => playSound("exhale", duration), [playSound])

    return {
        playInhale,
        playExhale,
        stop,
    }
}
