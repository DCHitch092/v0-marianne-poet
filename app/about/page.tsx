import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { getContent } from "@/lib/content"

export const revalidate = false

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <h2 className="font-sans text-xs uppercase tracking-widest text-muted-foreground mb-6">{children}</h2>
}

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`py-12 md:py-16 border-b border-border/30 last:border-b-0 ${className}`}>{children}</section>
  )
}

// Default content as fallback
const DEFAULT_ABOUT = {
  title: "About",
  opening: [
    "Marianne MacRae is a poet and writer whose work sits in the space where grief, memory, and dark humour meet. Her writing is concerned with what remains after loss — the strange persistence of love, the quiet absurdities of survival, and the landscapes that hold our lives long after we have left them.",
    "Her poems move between the surreal and the ordinary, often rooted in lived experience and attentive to the small, unsettling details that refuse to be forgotten.",
  ],
  statement_of_practice: [
    "Marianne's work explores grief not as a singular event, but as a long, evolving condition — one shaped by place, repetition, and memory. She is interested in how language behaves under emotional pressure, and how humour can coexist with tenderness without diminishing it.",
    "Her debut poetry collection, Recital, engages with these themes through lyric fragments and narrative moments that resist easy resolution. She is currently working on a memoir rooted in a remembered journey along the north coast of Scotland, written from the perspective of the last surviving participant.",
  ],
  selected_publications: [
    { text: "Recital — Blue Diode Press, poetry collection", link: null },
    {
      text: "Personal Shopper — Poem of the Week, The Scotsman, September 2025",
      link: "https://www.pressreader.com/uk/the-scotsman/20250906/282918096590400",
    },
    { text: "Selected poems published online and in print", link: null },
  ],
  current_work:
    "Marianne is currently writing a memoir based on a formative holiday taken along the north coast of Scotland, exploring memory, survival, and the distortions of time and grief.",
  readings_collaborations:
    "Marianne is available for poetry readings, panel discussions, and collaborative events. Her work is well suited to intimate venues, interdisciplinary settings, and spaces that value reflective, audience-focused engagement.",
  bio_50:
    "Marianne MacRae is a poet and writer whose work explores grief, memory, and dark humour. She is the author of the poetry collection Recital and is currently working on a memoir rooted in landscape and survival.",
  bio_100:
    "Marianne MacRae is a poet and writer based in Scotland. Her work explores grief, memory, and the quiet absurdities of survival, often moving between lyric intimacy and dark humour. Her debut poetry collection, Recital, was published by Blue Diode Press. She is currently writing a memoir based on a remembered journey along the north coast of Scotland.",
}

export default async function AboutPage() {
  const pageContent = await getContent("about_page")
  const content = { ...DEFAULT_ABOUT, ...pageContent }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-xl mx-auto px-6 md:px-8 py-16 md:py-24">
        {/* Header nav */}
        <nav className="mb-12 md:mb-16">
          <Link
            href="/"
            className="font-display text-lg md:text-xl tracking-tight text-muted-foreground/50 md:text-muted-foreground/30 hover:text-foreground transition-colors duration-300"
          >
            Marianne <span className="italic">MacRae</span>
          </Link>
        </nav>

        {/* Page title */}
        <header className="mb-8 md:mb-12">
          <h1 className="font-serif text-3xl md:text-4xl text-foreground">{content.title}</h1>
        </header>

        {/* Opening */}
        <Section>
          <div className="space-y-6">
            {(content.opening || []).map((para: string, index: number) => (
              <p key={index} className="font-serif text-lg md:text-xl leading-relaxed text-foreground">
                {para}
              </p>
            ))}
          </div>
        </Section>

        {/* Image */}
        <figure className="py-12 md:py-16 border-b border-border/30">
          <Image
            src="/images/img20250808133429-edit.jpg"
            alt="Marianne MacRae"
            width={800}
            height={600}
            className="w-full aspect-[4/3] object-cover"
            priority
          />
        </figure>

        {/* Statement of Practice */}
        <Section>
          <SectionLabel>Statement of Practice</SectionLabel>
          <div className="space-y-6">
            {(content.statement_of_practice || []).map((para: string, index: number) => (
              <p key={index} className="font-serif text-base md:text-lg leading-relaxed text-foreground">
                {index === 1 && para.includes("Recital") ? (
                  <>
                    Her debut poetry collection, <em>Recital</em>,{" "}
                    {para.replace("Her debut poetry collection, Recital,", "").trim()}
                  </>
                ) : (
                  para
                )}
              </p>
            ))}
          </div>
        </Section>

        {/* Selected Publications */}
        <Section>
          <SectionLabel>Selected Publications</SectionLabel>
          <ul className="space-y-3 pl-6">
            {(content.selected_publications || []).map((pub: { text: string; link: string | null }, index: number) => (
              <li key={index} className="font-serif text-base md:text-lg text-foreground">
                {pub.link ? (
                  <>
                    <em>{pub.text.split(" — ")[0]}</em>
                    <span className="text-muted-foreground">
                      {" "}
                      —{" "}
                      <a
                        href={pub.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2 hover:text-primary transition-colors"
                      >
                        {pub.text.split(" — ")[1]}
                      </a>
                    </span>
                  </>
                ) : pub.text.includes(" — ") ? (
                  <>
                    <em>{pub.text.split(" — ")[0]}</em>
                    <span className="text-muted-foreground"> — {pub.text.split(" — ")[1]}</span>
                  </>
                ) : (
                  <span className="text-muted-foreground">{pub.text}</span>
                )}
              </li>
            ))}
          </ul>
        </Section>

        {/* Current Work */}
        <Section>
          <SectionLabel>Current Work</SectionLabel>
          <p className="font-serif text-base md:text-lg leading-relaxed text-foreground">{content.current_work}</p>
        </Section>

        {/* Readings & Collaborations */}
        <Section>
          <SectionLabel>Readings & Collaborations</SectionLabel>
          <p className="font-serif text-base md:text-lg leading-relaxed text-foreground">
            {content.readings_collaborations}
          </p>
        </Section>

        {/* Short Bios */}
        <Section>
          <SectionLabel>Short Bios</SectionLabel>

          <div className="mb-8 flex items-start gap-4">
            <Image
              src="/images/img20251210135214-edit.jpg"
              alt="Marianne MacRae - Press photo"
              width={120}
              height={150}
              className="w-24 md:w-28 aspect-[4/5] object-cover object-top"
            />
            <div className="space-y-2">
              <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground">Press Photo</p>
              <a
                href="/images/img20251210135214-edit.jpg"
                download="marianne-macrae-press-photo.jpg"
                target="_blank"
                rel="noopener noreferrer"
                className="font-serif text-sm text-muted-foreground hover:text-foreground border-b border-muted-foreground/30 hover:border-foreground/50 transition-colors"
              >
                Download high resolution
              </a>
            </div>
          </div>

          <details className="group">
            <summary className="font-serif text-base text-muted-foreground cursor-pointer hover:text-foreground transition-colors list-none">
              <span className="border-b border-muted-foreground/30 group-hover:border-foreground/50 transition-colors">
                50-word bio
              </span>
            </summary>
            <p className="font-serif text-base leading-relaxed text-foreground mt-4 pl-4 border-l-2 border-border">
              {content.bio_50?.includes("Recital") ? (
                <>
                  {content.bio_50.split("Recital")[0]}
                  <em>Recital</em>
                  {content.bio_50.split("Recital")[1]}
                </>
              ) : (
                content.bio_50
              )}
            </p>
          </details>

          <details className="group mt-6">
            <summary className="font-serif text-base text-muted-foreground cursor-pointer hover:text-foreground transition-colors list-none">
              <span className="border-b border-muted-foreground/30 group-hover:border-foreground/50 transition-colors">
                100-word bio
              </span>
            </summary>
            <p className="font-serif text-base leading-relaxed text-foreground mt-4 pl-4 border-l-2 border-border">
              {content.bio_100?.includes("Recital") ? (
                <>
                  {content.bio_100.split("Recital")[0]}
                  <em>Recital</em>
                  {content.bio_100.split("Recital")[1]}
                </>
              ) : (
                content.bio_100
              )}
            </p>
          </details>
        </Section>

        {/* Footer */}
        <footer className="pt-12 md:pt-16">
          <Link
            href="/"
            className="inline-block font-display text-base tracking-tight text-muted-foreground/60 hover:text-foreground transition-colors duration-300"
          >
            Back to Marianne <span className="italic">MacRae</span>
          </Link>
        </footer>
      </div>
    </main>
  )
}
