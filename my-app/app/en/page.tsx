import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type VideoItem = {
    title: string
    theme: string
    duration: string
    fileName: string
    highlight: string
}

type QAItem = {
    question: string
    answer: string
}

type FeedbackItem = {
    name: string
    role: string
    quote: string
}

type SegmentVideo = {
    id: number
    title: string
    summary: string
    notes: string[]
    videoSrc?: string
    status?: string
}

const videoBase =
    (process.env.NEXT_PUBLIC_VIDEO_BASE_URL && process.env.NEXT_PUBLIC_VIDEO_BASE_URL.replace(/\/$/, "")) || "/audio"

const segmentVideoPath = (index: number) =>
    `${videoBase}/${encodeURIComponent(`八段锦音效${index}`)}/${encodeURIComponent(`八段锦音效${index}`)}.mp4`

const navItems = [
    { label: "Home", href: "/en" },
    { label: "Baduanjin Timer", href: "/en/ba-duan-jin" },
    { label: "Zhan Zhuang Timer", href: "/en/zhan-zhuang" },
]

const videos: VideoItem[] = [
    {
        title: "Baduanjin full routine (AI enhanced, with breathing cues)",
        theme: "Health Qigong · HD",
        duration: "Full",
        fileName: "【AI高清修复】健身气功八段锦完整版-带呼吸法口令版.mp4",
        highlight: "Official routine with breathing prompts, AI upscaled for clear follow-along.",
    },
    {
        title: "Mirrored teaching (General Administration of Sport, with cues)",
        theme: "National standard · Mirrored",
        duration: "Mirrored",
        fileName: "八段锦_镜像_带呼吸口令_国家体育总局版.mp4",
        highlight: "Mirrored view helps left-right matching; includes tempo and breathing guidance.",
    },
    {
        title: "12-minute condensed Baduanjin (with breathing voiceover)",
        theme: "National standard · 12 mins",
        duration: "12:00",
        fileName: "国家体育总局推广版八段锦，12分钟完整版跟练，带呼吸口令。.mp4",
        highlight: "Short daily follow-along with cues; great for quick sessions.",
    },
    {
        title: "Wudang Baduanjin (with breathing cues)",
        theme: "Wudang · Traditional",
        duration: "Full",
        fileName: "武当八段锦完整带练呼吸口令版.mp4",
        highlight: "Traditional pacing, focus on relaxed spine and sinking breath.",
    },
    {
        title: "HD Wudang Baduanjin (left/right labeled)",
        theme: "Wudang · HD labeled",
        duration: "HD",
        fileName: "高清：武当八段锦完整带练呼吸口令版（标明左右，袁师懋道长版本，自用）.mp4",
        highlight: "Left/right labeled for precise posture corrections and weight shift.",
    },
    {
        title: "Ancient wellness flow · 20-minute stretch",
        theme: "Wellness · Stretch",
        duration: "20:00",
        fileName: "古法养生操20分钟跟练版.mp4",
        highlight: "Gentle 20-minute flow, great warm-up or cool-down around Baduanjin.",
    },
]

const featuredVideo = videos[0]

const segmentVideos: SegmentVideo[] = [
    {
        id: 1,
        title: "Preparation · Settle breath",
        summary: "Stand tall, relax shoulders, and take 2-3 deep breaths before starting the routine.",
        notes: [
            "Feet hip-width, knees soft, weight evenly on three points of each foot.",
            "Tongue on palate, tailbone gently tucked; avoid shrugging or collapsing the lower back.",
            "Follow one round of abdominal breathing with the cue before entering section one.",
        ],
        videoSrc: segmentVideoPath(1),
    },
    {
        id: 2,
        title: "Section 1 · Lifting the sky",
        summary: "Press upward to lengthen the spine; match breath to open chest and back.",
        notes: [
            "Keep shoulders away from ears; elbows not locked.",
            "Inhale while lifting, exhale while lowering, maintain spine length.",
            "Tailbone tucked, avoid over-arching or leaning back.",
        ],
        videoSrc: segmentVideoPath(2),
    },
    {
        id: 3,
        title: "Section 2 · Drawing the bow",
        summary: "Bow stance with a draw; scapula guides the arms to open left and right.",
        notes: [
            "Front and back heels roughly on one line; knees track the toes.",
            "Chest gently hollow, eyes follow the thumb, avoid shoulder shrugging.",
            "Use this segment video or the full routine to practice the rhythm.",
        ],
        videoSrc: segmentVideoPath(3),
    },
    {
        id: 4,
        title: "Section 3 · One arm lifts, one presses",
        summary: "Lift and press to spiral-stretch the side waist and spleen-stomach meridian.",
        notes: [
            "Keep lumbar neutral; avoid collapsing while lifting.",
            "Lift and press match the breath; feel both sides lengthen evenly.",
            "Hips stay square; avoid twisting the pelvis.",
        ],
        videoSrc: segmentVideoPath(4),
    },
    {
        id: 5,
        title: "Section 4 · Looking back",
        summary: "Turn the head to relax neck and shoulders; soothe fatigue.",
        notes: [
            "Increase range gradually; avoid quick snaps that cause dizziness.",
            "Slight chin tuck to lengthen the back of the neck; keep shoulders down.",
            "Pause one beat at end range with the exhale, then return smoothly.",
        ],
        videoSrc: segmentVideoPath(5),
    },
    {
        id: 6,
        title: "Section 5 · Sway the head and tail",
        summary: "Horse stance hip sways to free the ribs and spine.",
        notes: [
            "Knees follow toes; avoid collapsing inward.",
            "Motion starts from the hips; spine long without over-arching.",
            "Keep breathing even; slow the tempo slightly if balance wavers.",
        ],
        videoSrc: segmentVideoPath(6),
    },
    {
        id: 7,
        title: "Section 6 · Two hands hold the feet",
        summary: "Hinge at the hips to stretch the posterior chain and nourish the lumbar area.",
        notes: [
            "Fold from the hips, not the upper back; eyes toward the feet.",
            "Exhale while lowering, engage the core to rise back up.",
            "If hamstrings are tight, soften the knees to avoid strain.",
        ],
        videoSrc: segmentVideoPath(7),
    },
    {
        id: 8,
        title: "Section 7 · Clenching fists with fiery eyes",
        summary: "Half horse stance punches; coordinate steps, fists, gaze, and breath.",
        notes: [
            "Keep space in the fists; wrists neutral, not bent back.",
            "Eyes forward on the punch; shoulders and elbows relaxed.",
            "Power drives from the core and rear foot; exhale with the punch.",
        ],
        videoSrc: segmentVideoPath(8),
    },
    {
        id: 9,
        title: "Section 8 · Bouncing on the heels",
        summary: "Light heel lifts to stimulate circulation and close the routine.",
        notes: [
            "Lift and land lightly; avoid heavy heel strikes to protect knees/ankles.",
            "Keep the spine tall, core gently engaged, avoid tilting the head back.",
            "If joints are sensitive, use smaller heel raises.",
        ],
        videoSrc: segmentVideoPath(9),
    },
    {
        id: 10,
        title: "Closing · Return the breath",
        summary: "Stand naturally, integrate breath and awareness to finish.",
        notes: [
            "Hands return in front of the lower abdomen; breathe slowly for 2-3 rounds.",
            "Feel the body settle before stepping away.",
            "You can add 5 minutes of Zhan Zhuang to lock in the effect.",
        ],
        videoSrc: segmentVideoPath(10),
    },
]

const qas: QAItem[] = [
    {
        question: "How long should I practice daily?",
        answer: "10-20 minutes is enough for one Baduanjin set. Start Zhan Zhuang at 10 minutes and build up to 30 while staying relaxed.",
    },
    {
        question: "Can beginners start directly?",
        answer: "Yes. Start with slower tempo and smaller range. Avoid breath holding and keep knees tracking toes; relaxed shoulders are key.",
    },
    {
        question: "What music fits Zhan Zhuang?",
        answer: "Calm background sounds or nature audio at low volume. The timer page already loops gentle music.",
    },
    {
        question: "How to combine Baduanjin and Zhan Zhuang?",
        answer: "Common flow: 5-10 minutes of standing to settle, then Baduanjin to mobilize joints. Or morning Baduanjin, evening Zhan Zhuang to unwind.",
    },
]

const feedbacks: FeedbackItem[] = [
    {
        name: "Ms. Li · Neck recovery",
        role: "Daily Baduanjin + 15 mins Zhan Zhuang",
        quote: "With voice cues I don’t stare at the clock. Shoulder and neck tension eased; adjustable breathing counts help a lot.",
    },
    {
        name: "Chen · Software engineer",
        role: "10-minute lunch break standing",
        quote: "Using the music as a pomodoro beats scrolling. A short stand helps me regain focus for the afternoon.",
    },
    {
        name: "Coach Wang · Taiji instructor",
        role: "Reference for beginners",
        quote: "Clean layout, videos + FAQ address common mistakes. Good for students to practice safely at home.",
    },
]

export const metadata: Metadata = {
    title: "Baduanjin & Zhan Zhuang Home | segment videos, breathing cues, timers",
    description:
        "Segmented Baduanjin videos, mirrored national standard routines, breathing-cue timers, and Zhan Zhuang music loops. Follow along with HD local videos and voice prompts for safer practice.",
    keywords: [
        "baduanjin",
        "eight brocades",
        "baduanjin video",
        "baduanjin tutorial",
        "baduanjin breathing",
        "zhan zhuang",
        "standing meditation",
        "qigong routine",
        "baduanjin segments",
        "baduanjin timer",
        "standing meditation timer",
        "qigong breathing music",
    ],
    alternates: {
        canonical: "/en",
    },
    openGraph: {
        title: "Baduanjin & Zhan Zhuang Home | segment videos, breathing cues, timers",
        description:
            "HD Baduanjin segment videos, mirrored follow-alongs, breathing cues, and Zhan Zhuang timers with music to guide safe daily practice.",
    },
}

export default function HomePageEn() {
    const featuredVideoSrc = `${videoBase}/${encodeURIComponent(featuredVideo.fileName)}`

    return (
        <main className="relative min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#ede9fe_0,#ede9fe_20%,transparent_35%),radial-gradient(circle_at_80%_10%,#dbeafe_0,#dbeafe_18%,transparent_32%)] opacity-70" />
            <div className="relative z-10">
                <header className="border-b bg-background/70 backdrop-blur">
                    <div className="container mx-auto flex items-center justify-between px-4 py-4">
                        <div className="flex items-center gap-3">
                            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-primary/10 text-lg font-semibold text-primary">
                                气
                            </div>
                            <div>
                                <p className="text-xl font-semibold">Baduanjin · Zhan Zhuang</p>
                                <p className="text-sm text-muted-foreground">Timers · Breathing · Videos</p>
                            </div>
                        </div>
                        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="text-muted-foreground transition-colors hover:text-primary aria-[current=true]:text-primary aria-[current=true]:font-semibold"
                                    aria-current={item.href === "/en" ? "page" : undefined}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                        <div className="hidden items-center gap-3 md:flex">
                            <Link
                                href="/"
                                className="rounded-full border border-muted-foreground/30 px-3 py-1 text-xs font-semibold text-foreground/80 transition-colors hover:border-primary hover:text-primary"
                                aria-label="Switch to Chinese"
                            >
                                中文
                            </Link>
                            <Button asChild variant="outline">
                                <Link href="/en/ba-duan-jin">Start Baduanjin</Link>
                            </Button>
                            <Button asChild>
                                <Link href="/en/zhan-zhuang">Start Zhan Zhuang</Link>
                            </Button>
                        </div>
                        <div className="flex items-center gap-2 md:hidden">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground/80 transition-colors hover:text-primary"
                                    aria-current={item.href === "/en" ? "page" : undefined}
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <Link
                                href="/"
                                className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
                                aria-label="Switch to Chinese"
                            >
                                中文
                            </Link>
                        </div>
                    </div>
                </header>

                <section className="container mx-auto px-4 pb-16 pt-10 md:pt-16">
                    <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                        <div className="space-y-6">
                            <p className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                                SEO friendly · Video first · Timers & cues
                            </p>
                            <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
                                Baduanjin & Zhan Zhuang Hub
                                <span className="block text-primary">Follow the cues, breathe steadily, practice daily</span>
                            </h1>
                            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
                                Timers, breathing audio, segmented Baduanjin videos, and FAQs in one place. Use the cues for warmups,
                                full routines, or calm standing sessions.
                            </p>
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                <Button asChild size="lg">
                                    <Link href="/en/ba-duan-jin">Go to Baduanjin timer</Link>
                                </Button>
                                <Button asChild size="lg" variant="outline">
                                    <Link href="/en/zhan-zhuang">Go to Zhan Zhuang timer</Link>
                                </Button>
                                <p className="text-sm text-muted-foreground sm:ml-2">
                                    Looping music, adjustable inhale/exhale, works on mobile and desktop.
                                </p>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-3">
                                <Card className="border-primary/20 bg-primary/5">
                                    <CardHeader>
                                        <CardTitle className="text-lg">Timers & tempo</CardTitle>
                                        <CardDescription>Set inhale/exhale separately for Baduanjin; loop 15-min music for Zhan Zhuang.</CardDescription>
                                    </CardHeader>
                                </Card>
                                <Card className="border-accent/30 bg-accent/10">
                                    <CardHeader>
                                        <CardTitle className="text-lg">Voice cues</CardTitle>
                                        <CardDescription>Segment cues plus prepare/end prompts so you can practice without watching.</CardDescription>
                                    </CardHeader>
                                </Card>
                                <Card className="border-muted/60 bg-card/80">
                                    <CardHeader>
                                        <CardTitle className="text-lg">Learn anytime</CardTitle>
                                        <CardDescription>Curated videos and FAQ to avoid common mistakes and stay safe.</CardDescription>
                                    </CardHeader>
                                </Card>
                            </div>
                        </div>
                        <div className="relative overflow-hidden rounded-3xl border bg-card shadow-xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
                            <div className="relative space-y-4 p-6">
                                <p className="text-sm font-semibold text-primary">Featured video · Local HD</p>
                                <div className="overflow-hidden rounded-2xl border bg-muted/40">
                                    <video
                                        key={featuredVideoSrc}
                                        src={featuredVideoSrc}
                                        controls
                                        preload="metadata"
                                        className="aspect-video w-full"
                                        poster=""
                                    >
                                        Your browser does not support video playback.
                                    </video>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    {featuredVideo.title} · {featuredVideo.highlight}
                                </p>
                                <div className="flex flex-wrap gap-2 text-xs font-medium text-muted-foreground">
                                    <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">{featuredVideo.theme}</span>
                                    <span className="rounded-full bg-secondary px-3 py-1 text-foreground/80">Local storage · Fast load</span>
                                    <span className="rounded-full bg-accent/20 px-3 py-1 text-foreground/80">Breathing cues</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="container mx-auto px-4 pb-16">
                    <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="text-sm font-semibold text-primary">Video collection</p>
                            <h2 className="text-3xl font-bold text-foreground">Learn by theme, play anytime</h2>
                            <p className="text-muted-foreground">
                                A few reliable demos: full cues, mirrored teaching, and calm standing music. Swap in your own links anytime.
                            </p>
                        </div>
                        <Link href="/en/ba-duan-jin" className="text-sm font-semibold text-primary hover:underline">
                            Start now →
                        </Link>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {videos.map((video) => (
                            <Card key={video.title} className="h-full overflow-hidden border-muted/70">
                                <div className="relative">
                                    <video
                                        key={video.fileName}
                                        src={`${videoBase}/${encodeURIComponent(video.fileName)}`}
                                        controls
                                        preload="metadata"
                                        className="aspect-video w-full bg-black"
                                    >
                                        Your browser does not support video playback.
                                    </video>
                                    <div className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-primary shadow">
                                        {video.theme}
                                    </div>
                                </div>
                                <CardHeader className="gap-2">
                                    <CardTitle className="text-lg">{video.title}</CardTitle>
                                    <CardDescription>{video.highlight}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex items-center justify-between text-sm text-muted-foreground">
                                    <span>Length {video.duration}</span>
                                    <span>Local playback · Fullscreen</span>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                <section className="container mx-auto px-4 pb-16">
                    <div className="mb-8 space-y-3">
                        <p className="text-sm font-semibold text-primary">Segment videos · Names · Tips</p>
                        <h2 className="text-3xl font-bold text-foreground">Ten sections in separate blocks (with cue videos)</h2>
                        <p className="text-muted-foreground">
                            Each section lists its name, key cautions, and the corresponding video for SEO and easy review.
                        </p>
                    </div>
                    <div className="grid gap-6">
                        {segmentVideos.map((segment) => {
                            const orderLabel =
                                segment.id === 1 ? "Prepare" : segment.id === 10 ? "Closing" : `Section ${segment.id - 1}`
                            return (
                                <Card key={segment.id} className="overflow-hidden border-primary/20 bg-card/90 shadow-sm">
                                    <CardHeader className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
                                        <div className="space-y-1">
                                            <CardTitle className="text-xl">{segment.title}</CardTitle>
                                            <CardDescription>{segment.summary}</CardDescription>
                                        </div>
                                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                                            {orderLabel}
                                        </span>
                                    </CardHeader>
                                    <CardContent className="grid gap-4 lg:grid-cols-[1fr_1.1fr]">
                                        <div className="space-y-3">
                                            <div className="rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-4">
                                                <p className="text-sm font-semibold text-primary">Key tips</p>
                                                <ul className="mt-2 space-y-2 text-sm leading-relaxed text-muted-foreground">
                                                    {segment.notes.map((note) => (
                                                        <li key={note}>• {note}</li>
                                                    ))}
                                                </ul>
                                                {segment.status ? (
                                                    <p className="mt-3 text-xs text-amber-600">{segment.status}</p>
                                                ) : (
                                                    <p className="mt-3 text-xs text-muted-foreground">
                                                        Pair with breathing cues and keep the tempo smooth.
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="overflow-hidden rounded-2xl border bg-black/80">
                                            {segment.videoSrc ? (
                                                <video
                                                    key={segment.videoSrc}
                                                    src={segment.videoSrc}
                                                    controls
                                                    preload="metadata"
                                                    className="aspect-video w-full"
                                                >
                                                    Your browser does not support video playback.
                                                </video>
                                            ) : (
                                                <div className="flex min-h-[240px] items-center justify-center px-6 text-sm leading-relaxed text-muted-foreground">
                                                    Segment video coming soon. Use the full routine or voice cues above meanwhile.
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                </section>

                <section className="container mx-auto px-4 pb-16">
                    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                        <div>
                            <p className="text-sm font-semibold text-primary">FAQ</p>
                            <h2 className="mb-4 text-3xl font-bold text-foreground">Read first to avoid common mistakes</h2>
                            <div className="space-y-4">
                                {qas.map((item) => (
                                    <Card key={item.question} className="border-muted/70">
                                        <CardHeader className="pb-3">
                                            <CardTitle className="text-lg">{item.question}</CardTitle>
                                        </CardHeader>
                                        <CardContent className="leading-relaxed text-muted-foreground">
                                            {item.answer}
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                        <div className="rounded-3xl border bg-card/80 p-6 shadow-lg">
                            <p className="text-sm font-semibold text-primary">Practice tips</p>
                            <h3 className="text-2xl font-bold text-foreground">Three quick reminders</h3>
                            <ul className="mt-4 space-y-3 leading-relaxed text-muted-foreground">
                                <li>• Warm up 3-5 minutes before starting to loosen joints and fascia.</li>
                                <li>• Keep breathing steady (inhale-exhale or exhale-inhale both fine); avoid breath holding.</li>
                                <li>• Hydrate and roll shoulders/neck after practice; avoid sitting down abruptly.</li>
                            </ul>
                            <div className="mt-6 flex flex-wrap gap-3">
                                <Button asChild variant="secondary">
                                    <Link href="/en/ba-duan-jin">View Baduanjin tempos</Link>
                                </Button>
                                <Button asChild variant="outline">
                                    <Link href="/en/zhan-zhuang">View Zhan Zhuang timer</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="container mx-auto px-4 pb-20">
                    <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="text-sm font-semibold text-primary">Feedback</p>
                            <h2 className="text-3xl font-bold text-foreground">Hear what others say</h2>
                        </div>
                        <Link href="/en/zhan-zhuang" className="text-sm font-semibold text-primary hover:underline">
                            Start a standing session →
                        </Link>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {feedbacks.map((item) => (
                            <Card key={item.name} className="h-full border-muted/70 bg-card/90">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg">{item.name}</CardTitle>
                                    <CardDescription>{item.role}</CardDescription>
                                </CardHeader>
                                <CardContent className="leading-relaxed text-muted-foreground">{item.quote}</CardContent>
                            </Card>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    )
}
