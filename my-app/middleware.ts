import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    if (pathname !== "/") {
        return NextResponse.next()
    }

    const acceptLanguage = request.headers.get("accept-language")?.toLowerCase() ?? ""
    const prefersEn = acceptLanguage.startsWith("en") || acceptLanguage.includes("en-")
    const prefersZh = acceptLanguage.startsWith("zh") || acceptLanguage.includes("zh-")

    if (prefersEn && !prefersZh) {
        const url = request.nextUrl.clone()
        url.pathname = "/en"
        return NextResponse.redirect(url)
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/"],
}
