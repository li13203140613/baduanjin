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
    { label: "首页", href: "/" },
    { label: "八段锦计时", href: "/ba-duan-jin" },
    { label: "站桩计时", href: "/zhan-zhuang" },
]

const videos: VideoItem[] = [
    {
        title: "健身气功八段锦完整版（AI 高清修复，带呼吸口令）",
        theme: "健身气功 · 高清修复",
        duration: "全程",
        fileName: "【AI高清修复】健身气功八段锦完整版-带呼吸法口令版.mp4",
        highlight: "官方套路 + 呼吸法口令，高清修复适合居家跟练。",
    },
    {
        title: "八段锦镜像教学（国家体育总局版，带呼吸口令）",
        theme: "国家体育总局 · 镜像演示",
        duration: "镜像版",
        fileName: "八段锦_镜像_带呼吸口令_国家体育总局版.mp4",
        highlight: "镜像示范，方便左右对照；包含呼吸节奏提示。",
    },
    {
        title: "国家体育总局推广版八段锦 · 12 分钟完整跟练",
        theme: "国家体育总局 · 推广版",
        duration: "12:00",
        fileName: "国家体育总局推广版八段锦，12分钟完整版跟练，带呼吸口令。.mp4",
        highlight: "12 分钟精简全程，附呼吸口令，日常打卡首选。",
    },
    {
        title: "武当八段锦完整带练（呼吸口令版）",
        theme: "武当道场 · 传统套路",
        duration: "全程",
        fileName: "武当八段锦完整带练呼吸口令版.mp4",
        highlight: "武当派节奏，强调身形松沉与呼吸下沉。",
    },
    {
        title: "高清武当八段锦（左右标注，袁师懋道长版）",
        theme: "武当 · 高清左右标注",
        duration: "高清",
        fileName: "高清：武当八段锦完整带练呼吸口令版（标明左右，袁师懋道长版本，自用）.mp4",
        highlight: "标明左右位移，适合精细纠正姿势与手型。",
    },
    {
        title: "古法养生操 · 20 分钟跟练版",
        theme: "养生操 · 延展放松",
        duration: "20:00",
        fileName: "古法养生操20分钟跟练版.mp4",
        highlight: "20 分钟舒展放松，适合作为八段锦前后热身或收束。",
    },
]

const featuredVideo = videos[0]

const segmentVideos: SegmentVideo[] = [
    {
        id: 1,
        title: "起势 · 平稳调息",
        summary: "站稳、松肩，练习前先做 2-3 轮深呼吸，让身体进入八段锦节奏。",
        notes: [
            "双脚与肩同宽，膝盖微屈，脚掌三点均匀受力。",
            "舌抵上腭、尾闾微收，避免耸肩或塌腰。",
            "先跟随口令做一轮腹式呼吸，再进入第一式。",
        ],
        videoSrc: segmentVideoPath(1),
    },
    {
        id: 2,
        title: "第一式 · 两手托天理三焦",
        summary: "向上托举伸展脊柱，配合吸呼让胸背打开。",
        notes: [
            "上托时肩膀远离耳朵，手肘不锁死。",
            "托起时配合吸气，下落呼气，保持脊柱拔伸。",
            "尾闾内收，避免过度后仰或塌腰。",
        ],
        videoSrc: segmentVideoPath(2),
    },
    {
        id: 3,
        title: "第二式 · 左右开弓似射雕",
        summary: "弓步开弓，肩胛带动双臂左右展开，训练胸背协调。",
        notes: [
            "前后脚跟大致在一条线上，膝盖与脚尖同向。",
            "拉弓时含胸拔背，目光随拇指，避免耸肩。",
        ],
        videoSrc: segmentVideoPath(3),
    },
    {
        id: 4,
        title: "第三式 · 调理脾胃须单举",
        summary: "一上一下托按，螺旋拉伸侧腰与脾胃经。",
        notes: [
            "上托不过度塌腰，保持腰椎中正。",
            "托掌、按掌同时配合呼吸，感觉两侧均匀延展。",
            "髋部保持正向，不要跟着扭转。",
        ],
        videoSrc: segmentVideoPath(4),
    },
    {
        id: 5,
        title: "第四式 · 五劳七伤往后瞧",
        summary: "转头后顾，放松颈肩，舒缓劳损。",
        notes: [
            "转头幅度逐渐增加，避免猛转引起眩晕。",
            "下巴微收，延长后颈，肩膀保持下沉。",
            "眼睛到位后停留一拍再回正，配合呼气。",
        ],
        videoSrc: segmentVideoPath(5),
    },
    {
        id: 6,
        title: "第五式 · 摇头摆尾去心火",
        summary: "马步扭髋、摆尾，松开胸胁与脊柱。",
        notes: [
            "膝盖与脚尖同向，避免内扣。",
            "动作从髋带动，腰背保持舒展不过度塌腰。",
            "呼吸均匀，节奏可略放慢以保持平稳。",
        ],
        videoSrc: segmentVideoPath(6),
    },
    {
        id: 7,
        title: "第六式 · 两手攀足固肾腰",
        summary: "折髋前屈，拉伸后侧筋膜链，滋养肾腰。",
        notes: [
            "从髋折叠而不是弓背，视线看向脚背。",
            "下落时呼气，起身时卷腹带动还原。",
            "腿后侧紧时可微屈膝，避免强压。",
        ],
        videoSrc: segmentVideoPath(7),
    },
    {
        id: 8,
        title: "第七式 · 攒拳怒目增气力",
        summary: "半马步冲拳，整合步、拳、目、息。",
        notes: [
            "拳心含空，手腕不过度后折。",
            "冲拳时目视前方，肩肘放松不过度耸肩。",
            "发力来自丹田与后脚蹬地，呼气配合出拳。",
        ],
        videoSrc: segmentVideoPath(8),
    },
    {
        id: 9,
        title: "第八式 · 背后七颠百病消",
        summary: "踮脚轻颠，疏通全身气血，回收动作。",
        notes: [
            "轻颠轻落，脚跟落地不重砸，保护膝踝。",
            "保持脊柱拔高，核心轻收，避免仰头。",
            "如有膝踝不适可改为小幅度提踵。",
        ],
        videoSrc: segmentVideoPath(9),
    },
    {
        id: 10,
        title: "收势 · 调息归元",
        summary: "结束后回到自然站立，整合呼吸与意念。",
        notes: [
            "双掌回收至丹田前，缓慢呼吸 2-3 轮。",
            "站稳感受全身沉降，再自然收势。",
            "可搭配站桩 5 分钟巩固练习效果。",
        ],
        videoSrc: segmentVideoPath(10),
    },
]

const qas: QAItem[] = [
    {
        question: "每天练多久合适？",
        answer: "八段锦建议每天 10-20 分钟即可完成一套；站桩可从 10 分钟起步，逐渐增加至 30 分钟，保持身心轻松为宜。",
    },
    {
        question: "没有基础可以直接练吗？",
        answer: "可以。先从节奏慢、幅度小的版本开始，避免憋气或强行下腰。肩颈放松、膝盖与脚尖同向是入门关键。",
    },
    {
        question: "站桩时听什么音乐更好？",
        answer: "选择节奏平稳的轻音乐或自然声即可，音量不宜过大，能听清呼吸与身体反馈。本站的计时页面自带循环音乐。",
    },
    {
        question: "如何搭配八段锦与站桩？",
        answer: "常见顺序是先 5-10 分钟站桩沉心，再做八段锦活动关节；也可早晨八段锦唤醒身体，晚上站桩放松神经。",
    },
]

const feedbacks: FeedbackItem[] = [
    {
        name: "李阿姨 · 颈椎劳损恢复期",
        role: "每天八段锦 + 15 分钟站桩",
        quote: "跟随口令练习，不用盯着表，肩颈紧绷感缓解不少。节奏能单独调节呼吸时长，很贴心。",
    },
    {
        name: "陈同学 · 程序员",
        role: "午休 10 分钟静心站桩",
        quote: "用计时音乐做番茄钟，闭眼站一会儿比刷短视频更能恢复专注，下午效率高一些。",
    },
    {
        name: "王老师 · 太极教练",
        role: "带学员入门参考",
        quote: "页面结构简洁，视频+FAQ 把入门误区讲清楚，适合新学员在家自练并保持节奏。",
    },
]

export const metadata: Metadata = {
    title: "八段锦与站桩教学工具：单个动作作图解、口令呼吸视频、练习要点与健康益处资源书籍下载",
    description:
        "提供八段锦与站桩练习方法与口令视频、动作分解图表、发音与中文原文说明；同时覆盖站桩要领、静心冥想练法及 PDF 资料，帮助入门和进阶。",
    keywords: [
        "八段锦",
        "站桩",
        "气功",
        "呼吸训练",
        "居家健身",
        "拉伸放松",
        "传统养生",
        "国家体育总局八段锦",
        "武当八段锦",
        "健身气功八段锦视频",
        "八段锦教学视频",
        "八段锦分节动作",
        "八段锦口令音乐",
        "站桩计时器",
        "站桩音乐循环",
        "baduanjin video",
        "zhan zhuang timer",
    ],
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: "八段锦与站桩教学工具：单个动作作图解、口令呼吸视频、练习要点与健康益处资源书籍下载",
        description:
            "提供八段锦与站桩练习方法与口令视频、动作分解图表、发音与中文原文说明；同时覆盖站桩要领、静心冥想练法及 PDF 资料，帮助入门和进阶。",
    },
}

export default function HomePage() {
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
                                <p className="text-xl font-semibold">八段锦 · 站桩练习</p>
                                <p className="text-sm text-muted-foreground">计时·呼吸·视频示范</p>
                            </div>
                        </div>
                        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="text-muted-foreground transition-colors hover:text-primary aria-[current=true]:text-primary aria-[current=true]:font-semibold"
                                    aria-current={item.href === "/" ? "page" : undefined}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                        <div className="hidden items-center gap-3 md:flex">
                            <Link
                                href="/en"
                                className="rounded-full border border-muted-foreground/30 px-3 py-1 text-xs font-semibold text-foreground/80 transition-colors hover:border-primary hover:text-primary"
                                aria-label="切换到英文"
                            >
                                English
                            </Link>
                            <Button asChild variant="outline">
                                <Link href="/ba-duan-jin">开始八段锦</Link>
                            </Button>
                            <Button asChild>
                                <Link href="/zhan-zhuang">开始站桩</Link>
                            </Button>
                        </div>
                        <div className="flex items-center gap-2 md:hidden">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground/80 transition-colors hover:text-primary"
                                    aria-current={item.href === "/" ? "page" : undefined}
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <Link
                                href="/en"
                                className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
                                aria-label="切换到英文"
                            >
                                EN
                            </Link>
                        </div>
                    </div>
                </header>

                <section className="container mx-auto px-4 pb-16 pt-10 md:pt-16">
                    <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                        <div className="space-y-6">
                            <p className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                                SEO 友好 · 视频直达 · 练习计时
                            </p>
                            <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
                                八段锦 & 站桩练习入口
                                <span className="block text-primary">跟着口令、听着节拍，稳稳练习每一天</span>
                            </h1>
                            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
                                一站式集合计时器、呼吸节奏音频、全套动作视频与常见问答。无论是入门热身还是深度静站，都能找到合适的节奏与指导。
                            </p>
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                <Button asChild size="lg">
                                    <Link href="/ba-duan-jin">去做八段锦计时</Link>
                                </Button>
                                <Button asChild size="lg" variant="outline">
                                    <Link href="/zhan-zhuang">去做站桩计时</Link>
                                </Button>
                                <p className="text-sm text-muted-foreground sm:ml-2">
                                    自带音乐循环、呼吸时长可调，支持手机与桌面端。
                                </p>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-3">
                                <Card className="border-primary/20 bg-primary/5">
                                    <CardHeader>
                                        <CardTitle className="text-lg">计时与节奏</CardTitle>
                                        <CardDescription>八段锦可独立设置吸呼时长，站桩循环 15 分钟音乐提醒。</CardDescription>
                                    </CardHeader>
                                </Card>
                                <Card className="border-accent/30 bg-accent/10">
                                    <CardHeader>
                                        <CardTitle className="text-lg">口令与音频</CardTitle>
                                        <CardDescription>分节口令音频与预备/结束提示，避免练习时分心看屏幕。</CardDescription>
                                    </CardHeader>
                                </Card>
                                <Card className="border-muted/60 bg-card/80">
                                    <CardHeader>
                                        <CardTitle className="text-lg">随时学习</CardTitle>
                                        <CardDescription>精选视频与 FAQ，快速避开常见误区，拉伸、静站都更安全。</CardDescription>
                                    </CardHeader>
                                </Card>
                            </div>
                        </div>
                        <div className="relative overflow-hidden rounded-3xl border bg-card shadow-xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
                            <div className="relative space-y-4 p-6">
                                <p className="text-sm font-semibold text-primary">示例视频 · 本地高清</p>
                                <div className="overflow-hidden rounded-2xl border bg-muted/40">
                                    <video
                                        key={featuredVideoSrc}
                                        src={featuredVideoSrc}
                                        controls
                                        preload="metadata"
                                        className="aspect-video w-full"
                                        poster=""
                                    >
                                        你的浏览器不支持视频播放。
                                    </video>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    {featuredVideo.title} · {featuredVideo.highlight}
                                </p>
                                <div className="flex flex-wrap gap-2 text-xs font-medium text-muted-foreground">
                                    <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">{featuredVideo.theme}</span>
                                    <span className="rounded-full bg-secondary px-3 py-1 text-foreground/80">本地存储 · 快速加载</span>
                                    <span className="rounded-full bg-accent/20 px-3 py-1 text-foreground/80">呼吸口令</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="container mx-auto px-4 pb-16">
                    <div className="mb-8 space-y-3">
                        <p className="text-sm font-semibold text-primary">分节视频 · 名称 · 注意事项</p>
                        <h2 className="text-3xl font-bold text-foreground">八段锦十节分开展示（含口令视频）</h2>
                        <p className="text-muted-foreground">
                            每一节单独命名、列出注意事项和对应视频，方便搜索、收藏与按节复习，也利于 SEO。
                        </p>
                    </div>
                    <div className="grid gap-6">
                        {segmentVideos.map((segment) => {
                            const orderLabel =
                                segment.id === 1 ? "起势" : segment.id === 10 ? "收势" : `第 ${segment.id - 1} 式`
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
                                                <p className="text-sm font-semibold text-primary">注意事项</p>
                                                <ul className="mt-2 space-y-2 text-sm leading-relaxed text-muted-foreground">
                                                    {segment.notes.map((note) => (
                                                        <li key={note}>• {note}</li>
                                                    ))}
                                                </ul>
                                                {segment.status ? (
                                                    <p className="mt-3 text-xs text-amber-600">{segment.status}</p>
                                                ) : (
                                                    <p className="mt-3 text-xs text-muted-foreground">
                                                        建议结合口令与呼吸节奏，保持匀速不憋气。
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
                                                    你的浏览器不支持视频播放。
                                                </video>
                                            ) : (
                                                <div className="flex min-h-[240px] items-center justify-center px-6 text-sm leading-relaxed text-muted-foreground">
                                                    分节视频待上传，可先播放页面顶部的完整版或使用口令音频跟练。
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
                    <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="text-sm font-semibold text-primary">视频合集</p>
                            <h2 className="text-3xl font-bold text-foreground">按主题学习，随时播放</h2>
                            <p className="text-muted-foreground">
                                挑选几条常见示范：完整口令、分节讲解、站桩呼吸。可替换为你自己的视频链接。
                            </p>
                        </div>
                        <Link href="/ba-duan-jin" className="text-sm font-semibold text-primary hover:underline">
                            立即开练 →
                        </Link>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {videos.map((video) => (
                            <Card key={video.title} className="h-full overflow-hidden border-muted/70">
                                <div className="relative">
                                    <video
                                        key={video.fileName}
                                        src={`/audio/${encodeURIComponent(video.fileName)}`}
                                        controls
                                        preload="metadata"
                                        className="aspect-video w-full bg-black"
                                    >
                                        你的浏览器不支持视频播放。
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
                                    <span>时长 {video.duration}</span>
                                    <span>本地播放 · 可全屏</span>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                <section className="container mx-auto px-4 pb-16">
                    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                        <div>
                            <p className="text-sm font-semibold text-primary">常见问答</p>
                            <h2 className="mb-4 text-3xl font-bold text-foreground">练习前先看一眼，避免误区</h2>
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
                            <p className="text-sm font-semibold text-primary">练习提示</p>
                            <h3 className="text-2xl font-bold text-foreground">三条实用建议</h3>
                            <ul className="mt-4 space-y-3 leading-relaxed text-muted-foreground">
                                <li>• 热身 3-5 分钟后再进入八段锦，关节和筋膜更放松。</li>
                                <li>• 呼吸保持“先呼后吸”或“先吸后呼”均可，关键是匀速、不憋气。</li>
                                <li>• 练习后补水、做几次肩颈绕环，避免突然坐下造成头晕。</li>
                            </ul>
                            <div className="mt-6 flex flex-wrap gap-3">
                                <Button asChild variant="secondary">
                                    <Link href="/ba-duan-jin">查看八段锦节奏</Link>
                                </Button>
                                <Button asChild variant="outline">
                                    <Link href="/zhan-zhuang">查看站桩计时</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="container mx-auto px-4 pb-20">
                    <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="text-sm font-semibold text-primary">练习反馈</p>
                            <h2 className="text-3xl font-bold text-foreground">听听大家怎么说</h2>
                        </div>
                        <Link href="/zhan-zhuang" className="text-sm font-semibold text-primary hover:underline">
                            开始一段站桩 →
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
