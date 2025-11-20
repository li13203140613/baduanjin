"use client"

import { useEffect, useMemo, useSyncExternalStore } from "react"

export interface MovementSettings {
    inhaleDuration?: number
    exhaleDuration?: number
}

export interface BaDuanJinSettings {
    globalInhaleDuration: number
    globalExhaleDuration: number
    repetitions: number
    movementSettings: Record<number, MovementSettings>
}

const DEFAULT_SETTINGS: BaDuanJinSettings = {
    globalInhaleDuration: 7,
    globalExhaleDuration: 7,
    repetitions: 6,
    movementSettings: {},
}

const STORAGE_KEY = "ba-duan-jin-settings"
const isBrowser = typeof window !== "undefined"

type Listener = () => void

let store: BaDuanJinSettings = DEFAULT_SETTINGS
let initialized = false
let listeners = new Set<Listener>()

const notify = () => {
    listeners.forEach((listener) => listener())
}

const persist = (state: BaDuanJinSettings) => {
    if (!isBrowser) return
    try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch (err) {
        console.error("Failed to save settings:", err)
    }
}

const loadOnce = () => {
    if (initialized || !isBrowser) return
    initialized = true
    try {
        const stored = window.localStorage.getItem(STORAGE_KEY)
        if (stored) {
            const parsed = JSON.parse(stored)
            store = { ...DEFAULT_SETTINGS, ...parsed }
        }
    } catch (err) {
        console.error("Failed to load settings:", err)
    }
}

const setStore = (updater: (prev: BaDuanJinSettings) => BaDuanJinSettings) => {
    store = updater(store)
    persist(store)
    notify()
}

export function useBaDuanJinSettings() {
    loadOnce()

    const subscribe = (listener: Listener) => {
        listeners.add(listener)
        return () => listeners.delete(listener)
    }

    const snapshot = useSyncExternalStore(subscribe, () => store, () => store)

    useEffect(() => {
        if (isBrowser) {
            persist(snapshot)
        }
    }, [snapshot])

    const api = useMemo(() => {
        const updateSettings = (updates: Partial<BaDuanJinSettings>) => {
            setStore((prev) => ({ ...prev, ...updates }))
        }

        const updateMovementSettings = (movementId: number, updates: MovementSettings) => {
            setStore((prev) => ({
                ...prev,
                movementSettings: {
                    ...prev.movementSettings,
                    [movementId]: {
                        ...prev.movementSettings[movementId],
                        ...updates,
                    },
                },
            }))
        }

        const clearMovementSettings = (movementId: number) => {
            setStore((prev) => {
                const next = { ...prev.movementSettings }
                delete next[movementId]
                return { ...prev, movementSettings: next }
            })
        }

        const getMovementDurations = (movementId: number) => {
            const movement = snapshot.movementSettings[movementId]
            return {
                inhaleDuration: movement?.inhaleDuration ?? snapshot.globalInhaleDuration,
                exhaleDuration: movement?.exhaleDuration ?? snapshot.globalExhaleDuration,
            }
        }

        const resetToDefaults = () => {
            setStore(() => DEFAULT_SETTINGS)
        }

        return {
            settings: snapshot,
            isLoaded: true,
            updateSettings,
            updateMovementSettings,
            clearMovementSettings,
            getMovementDurations,
            resetToDefaults,
        }
    }, [snapshot])

    return api
}
