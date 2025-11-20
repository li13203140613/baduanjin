"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp, RotateCcw, Settings2, Wind } from "lucide-react"
import { useBaDuanJinSettings } from "@/hooks/useBaDuanJinSettings"

const MOVEMENTS = [
    { id: 1, name: "双手托天理三焦" },
    { id: 2, name: "左右开弓似射雕" },
    { id: 3, name: "调理脾胃须单举" },
    { id: 4, name: "五劳七伤往后瞧" },
    { id: 5, name: "摇头摆尾去心火" },
    { id: 6, name: "两手攀足固肾腰" },
    { id: 7, name: "攒拳怒目增气力" },
    { id: 8, name: "背后七颠百病消" },
]

const formatSeconds = (value: number) => `${value} 秒`

type BaDuanJinSettingsDialogProps = {
    trigger?: React.ReactNode
}

export function BaDuanJinSettingsDialog({ trigger }: BaDuanJinSettingsDialogProps) {
    const { settings, updateSettings, updateMovementSettings, clearMovementSettings, getMovementDurations } =
        useBaDuanJinSettings()

    const [isAdvancedOpen, setIsAdvancedOpen] = useState(false)
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger ?? (
                    <Button variant="outline" size="icon" className="rounded-full shadow-sm">
                        <Settings2 className="h-5 w-5" />
                        <span className="sr-only">练习设置</span>
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="max-w-xl p-0 overflow-hidden">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle className="flex items-center gap-2 text-lg">
                        <Settings2 className="h-5 w-5" />
                        设置
                    </DialogTitle>
                </DialogHeader>

                <div className="px-6 pb-2">
                    <div className="space-y-6">
                        <SettingBlock
                            icon={<Wind className="h-4 w-4 text-primary" />}
                            label="吸气时长"
                            valueLabel={formatSeconds(settings.globalInhaleDuration)}
                        >
                            <Slider
                                value={[settings.globalInhaleDuration]}
                                onValueChange={(v) => updateSettings({ globalInhaleDuration: v[0] })}
                                min={5}
                                max={60}
                                step={1}
                                className="cursor-pointer"
                            />
                        </SettingBlock>

                        <SettingBlock
                            icon={<Wind className="h-4 w-4 text-primary" />}
                            label="呼气时长"
                            valueLabel={formatSeconds(settings.globalExhaleDuration)}
                        >
                            <Slider
                                value={[settings.globalExhaleDuration]}
                                onValueChange={(v) => updateSettings({ globalExhaleDuration: v[0] })}
                                min={5}
                                max={60}
                                step={1}
                                className="cursor-pointer"
                            />
                        </SettingBlock>

                        <SettingBlock
                            icon={<RotateCcw className="h-4 w-4" />}
                            label="重复次数"
                            valueLabel={`${settings.repetitions} 次`}
                        >
                            <Select
                                value={settings.repetitions.toString()}
                                onValueChange={(v) => updateSettings({ repetitions: Number.parseInt(v) })}
                            >
                                <SelectTrigger className="w-[120px]">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">1 次</SelectItem>
                                    <SelectItem value="4">4 次</SelectItem>
                                    <SelectItem value="6">6 次</SelectItem>
                                    <SelectItem value="8">8 次</SelectItem>
                                </SelectContent>
                            </Select>
                        </SettingBlock>

                        <div className="border-t pt-4">
                            <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
                                <CollapsibleTrigger asChild>
                                    <Button variant="ghost" className="w-full justify-between px-3">
                                        <span className="flex items-center gap-2">
                                            <Settings2 className="h-4 w-4" />
                                            单独设置
                                        </span>
                                        {isAdvancedOpen ? (
                                            <ChevronUp className="h-4 w-4" />
                                        ) : (
                                            <ChevronDown className="h-4 w-4" />
                                        )}
                                    </Button>
                                </CollapsibleTrigger>
                                <CollapsibleContent className="space-y-4 pt-4 max-h-[45vh] overflow-y-auto pr-2">
                                    {MOVEMENTS.map((movement) => {
                                        const durations = getMovementDurations(movement.id)
                                        const hasCustom = settings.movementSettings[movement.id] !== undefined

                                        return (
                                            <div
                                                key={movement.id}
                                                className="space-y-3 rounded-xl border bg-background/70 p-4 shadow-sm"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="text-sm font-semibold">
                                                        {movement.id}. {movement.name}
                                                    </div>
                                                    {hasCustom && (
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => clearMovementSettings(movement.id)}
                                                            className="h-7 px-2 text-xs"
                                                        >
                                                            重置
                                                        </Button>
                                                    )}
                                                </div>

                                                <PhaseSlider
                                                    label="吸"
                                                    value={durations.inhaleDuration}
                                                    onChange={(v) =>
                                                        updateMovementSettings(movement.id, { inhaleDuration: v[0] })
                                                    }
                                                />
                                                <PhaseSlider
                                                    label="呼"
                                                    value={durations.exhaleDuration}
                                                    onChange={(v) =>
                                                        updateMovementSettings(movement.id, { exhaleDuration: v[0] })
                                                    }
                                                />
                                            </div>
                                        )
                                    })}
                                </CollapsibleContent>
                            </Collapsible>
                        </div>
                    </div>
                </div>

                <div className="border-t bg-muted/50 px-6 py-4">
                    <Button onClick={() => setOpen(false)} className="w-full">
                        完成设置
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

function SettingBlock({
    icon,
    label,
    valueLabel,
    children,
}: {
    icon: React.ReactNode
    label: string
    valueLabel: string
    children: React.ReactNode
}) {
    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium flex items-center gap-2">
                    {icon}
                    {label}
                </span>
                <span className="text-xs rounded-md bg-muted px-3 py-1 font-semibold text-muted-foreground">
                    {valueLabel}
                </span>
            </div>
            {children}
        </div>
    )
}

function PhaseSlider({
    label,
    value,
    onChange,
}: {
    label: string
    value: number
    onChange: (value: number[]) => void
}) {
    return (
        <div className="space-y-1">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-medium">{label}</span>
                <span className="font-mono text-foreground">{value} 秒</span>
            </div>
            <Slider value={[value]} onValueChange={onChange} min={5} max={60} step={1} className="cursor-pointer" />
        </div>
    )
}
