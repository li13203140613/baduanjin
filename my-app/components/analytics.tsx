"use client"

import Script from "next/script"
import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-W7KT31DS7R"

declare global {
    interface Window {
        dataLayer: unknown[]
        gtag: (...args: unknown[]) => void
    }
}

export function GoogleAnalytics() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const isEnabled = Boolean(GA_MEASUREMENT_ID)

    useEffect(() => {
        if (!isEnabled) {
            return
        }

        const pagePath = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")
        window.gtag?.("config", GA_MEASUREMENT_ID, {
            page_path: pagePath,
        })
    }, [pathname, searchParams, isEnabled])

    if (!isEnabled) {
        return null
    }

    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                strategy="afterInteractive"
            />
            <Script id="ga4-config" strategy="afterInteractive">
                {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });`}
            </Script>
        </>
    )
}
