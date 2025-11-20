"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export function BackButton() {
  const router = useRouter()

  return (
    <Button variant="ghost" size="sm" onClick={() => router.push("/")} className="mb-6">
      <ArrowLeft className="mr-2 h-4 w-4" />
      返回首页
    </Button>
  )
}
