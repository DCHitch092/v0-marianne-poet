import Link from "next/link"
import type { Metadata } from "next"
import { getContent } from "@/lib/content"

export const metadata: Metadata = {
  title: "Intervals — Marianne MacRae",
  description: "Occasional prose: essays, reflections, and considered pieces written between longer works.",
}

export const revalidate = false // Use ISR instead of "use cache"

export default async function IntervalsPage() {
  const pageContent = await getContent("intervals_page")

  const title = pageContent?.title || "Intervals"
  const paragraphs = pageContent?.paragraphs || [
    "Intervals is a place for occasional prose: essays, reflections, and considered pieces written between longer works.",
    "The writing here is irregular by design. It is not a record of process, nor a space for drafts, but a continuation of themes that run through the poetry and current memoir work — grief, memory, attention, and the persistence of the everyday.",
  ]
  const ctaIntro = pageContent?.cta_intro || "Intervals lives elsewhere."
  const ctaText =
    pageContent?.cta_text || "If you would like to read these pieces as they appear, they are published via Substack."
  const linkText = pageContent?.link_text || "Read Intervals"
  const linkUrl = pageContent?.link_url || "https://mochatheweek.substack.com/"

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-xl mx-auto px-6 md:px-8 py-16 md:py-24">
        <nav className="mb-16 md:mb-20">
          <Link
            href="/"
            className="font-display text-lg tracking-tight text-foreground/30 hover:text-foreground/70 transition-colors duration-300 md:text-foreground/30 md:hover:text-foreground/70"
          >
            Marianne <em>MacRae</em>
          </Link>
        </nav>

        <header className="mb-12 md:mb-16">
          <h1 className="font-display text-2xl md:text-3xl tracking-tight text-foreground">{title}</h1>
        </header>

        <div className="space-y-6 text-foreground/80 leading-relaxed">
          {paragraphs.map((para: string, index: number) => (
            <p key={index}>{para}</p>
          ))}

          <p className="pt-4">{ctaIntro}</p>

          <p>{ctaText}</p>

          <p className="pt-6">
            <a
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors"
            >
              <span className="text-muted-foreground">→</span>
              <span>{linkText}</span>
              <span className="text-muted-foreground/60 text-sm">↗</span>
            </a>
          </p>
        </div>

        <footer className="mt-20 md:mt-24 pt-8 border-t border-border">
          <Link
            href="/"
            className="font-display text-lg tracking-tight text-foreground/40 hover:text-foreground/70 transition-colors duration-300"
          >
            Back to Marianne <em>MacRae</em>
          </Link>
        </footer>
      </div>
    </main>
  )
}
