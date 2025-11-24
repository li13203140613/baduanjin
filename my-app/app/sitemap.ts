import type { MetadataRoute } from "next"

const baseUrl = "https://www.grid-ai.app"

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date()
    const paths = ["/", "/en", "/ba-duan-jin", "/en/ba-duan-jin", "/zhan-zhuang", "/en/zhan-zhuang"]

    return paths.map((path) => ({
        url: `${baseUrl}${path}`,
        lastmod: now,
        changefreq: "weekly",
        priority: path === "/" || path === "/en" ? 1 : 0.8,
    }))
}
