import Link from "next/link"
import { getContent } from "@/lib/content"

export const metadata = {
  title: "Listen — Marianne MacRae",
  description: "Audio recordings of selected poems by Marianne MacRae",
}

type Recording = {
  id: string
  label: string
  filename: string
  enabled: boolean
  order: number
}

const DEFAULT_RECORDINGS: Recording[] = [
  {
    id: "rec1",
    label: "Be Attitude (for Chumbo)",
    filename: "Marianne-MacRae_Be-Attitude-(for-Chumbo).m4a",
    enabled: true,
    order: 1,
  },
  {
    id: "rec2",
    label: "Stochastic Models",
    filename: "Marianne-MacRae_stoachastic-models.m4a",
    enabled: true,
    order: 2,
  },
  {
    id: "rec3",
    label: "They Came Back As Little Snapshots",
    filename: "Marianne-MacRae_They-Came-Back-As-Little-Snapshots.m4a",
    enabled: true,
    order: 3,
  },
]

export const revalidate = false // Use ISR instead of "use cache"

export default async function ListenPage() {
  const pageContent = await getContent("listen_page")

  const title = pageContent?.title || "Listen"
  const intro = pageContent?.intro || "These recordings offer a sense of how the work sounds when read aloud."
  const description =
    pageContent?.description ||
    "They are brief, unadorned readings, intended to reflect the pace and tone of the writing rather than performance."

  const recordings: Recording[] =
    pageContent?.recordings?.length > 0
      ? (pageContent.recordings as Recording[]).filter((r) => r.enabled).sort((a, b) => a.order - b.order)
      : DEFAULT_RECORDINGS

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-xl mx-auto px-6 md:px-8 py-16 md:py-24">
        <nav className="mb-16 md:mb-20">
          <Link
            href="/"
            className="font-display text-base text-muted-foreground/30 hover:text-muted-foreground/60 transition-colors md:opacity-30 md:hover:opacity-60"
          >
            Marianne <em>MacRae</em>
          </Link>
        </nav>

        <header className="mb-12 md:mb-16">
          <h1 className="font-display text-3xl md:text-4xl text-foreground">{title}</h1>
        </header>

        <section className="mb-16 md:mb-20 space-y-6">
          <p className="font-serif text-lg md:text-xl leading-relaxed text-foreground/90">{intro}</p>
          <p className="font-serif text-lg md:text-xl leading-relaxed text-foreground/90">{description}</p>
        </section>

        <section className="space-y-10 md:space-y-12">
          {recordings.map((recording) => (
            <div key={recording.id} className="space-y-3">
              <p className="font-sans text-xs tracking-widest uppercase text-muted-foreground/60">{recording.label}</p>
              <audio controls preload="none" className="w-full" aria-label={recording.label}>
                <source src={`/audio/${recording.filename}`} type="audio/mp4" />
                Your browser does not support the audio element.
              </audio>
            </div>
          ))}
        </section>

        <footer className="mt-20 md:mt-24 pt-8 border-t border-border">
          <Link href="/" className="font-display text-sm text-muted-foreground/40 hover:text-primary transition-colors">
            Back to <em>Marianne MacRae</em>
          </Link>
        </footer>
      </div>
    </main>
  )
}
