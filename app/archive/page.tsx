import type React from "react"
import Link from "next/link"
import { getContent } from "@/lib/content"

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <h2 className="font-sans text-xs uppercase tracking-widest text-muted-foreground mb-6">{children}</h2>
}

function Section({ children }: { children: React.ReactNode }) {
  return <section className="py-10 md:py-12 border-b border-border/30 last:border-b-0">{children}</section>
}

type ArchiveEntry = {
  title: string
  publication: string
  date: string
  url: string | null
  enabled: boolean
}

type Category = {
  id: string
  label: string
  sublabel: string
  entries: ArchiveEntry[]
}

// Default categories with hardcoded entries as fallback
const DEFAULT_CATEGORIES: Category[] = [
  {
    id: "poetry_journals",
    label: "Poetry",
    sublabel: "Journals & Magazines",
    entries: [
      { title: "Past Walden Pond", publication: "Acumen", date: "September 2018", url: null, enabled: true },
      {
        title: "Confessions Urbana",
        publication: "Manchester Metropolitan University (#WWWAN)",
        date: "April 2020",
        url: null,
        enabled: true,
      },
      { title: "Unknown", publication: "The Edinburgh Review", date: "October 2014", url: null, enabled: true },
      {
        title: "Watchers",
        publication: "Until Only the Mountain Remains",
        date: "August 2015",
        url: null,
        enabled: true,
      },
      {
        title: "A Kind of Fretful Speech",
        publication: "Decorating Dissidence (Issue 3)",
        date: "August 2019",
        url: null,
        enabled: true,
      },
      { title: "The Pervert", publication: "Popshot (Issue 13)", date: "April 2016", url: null, enabled: true },
    ],
  },
  {
    id: "poetry_anthologies",
    label: "Poetry",
    sublabel: "Anthologies",
    entries: [
      {
        title: "Multiverse: An International Anthology of Science Fiction Poetry",
        publication: "",
        date: "December 2018",
        url: null,
        enabled: true,
      },
      { title: "Umbrellas of Edinburgh", publication: "", date: "November 2016", url: null, enabled: true },
      { title: "January Diary", publication: "From Arthur's Seat", date: "May 2016", url: null, enabled: true },
      { title: "The Book Of", publication: "From Arthur's Seat", date: "May 2016", url: null, enabled: true },
    ],
  },
  {
    id: "poetry_pamphlets",
    label: "Poetry",
    sublabel: "Pamphlets",
    entries: [
      { title: "Joseph Lister Is My New Flatmate", publication: "", date: "January 2018", url: null, enabled: true },
    ],
  },
  {
    id: "nonfiction_academic",
    label: "Non-fiction",
    sublabel: "Academic",
    entries: [
      { title: "Animals", publication: "Elizabeth Bishop in Context", date: "August 2021", url: null, enabled: true },
    ],
  },
  {
    id: "nonfiction_creative",
    label: "Non-fiction",
    sublabel: "Creative",
    entries: [
      { title: "My Life in Crisps", publication: "The Skinny", date: "April 2021", url: null, enabled: true },
      {
        title: "Eight Poems… with Marianne MacRae",
        publication: "poetryasfuck",
        date: "April 2019",
        url: null,
        enabled: true,
      },
      {
        title: "Good Grief… with Marianne MacRae",
        publication: "poetryasfuck",
        date: "November 2018",
        url: null,
        enabled: true,
      },
    ],
  },
]

export const revalidate = false

export default async function ArchivePage() {
  // Removed cacheTag call since cacheComponents is disabled

  const pageContent = await getContent("archive_page")

  const title = pageContent?.title || "Archive"
  const categories: Category[] =
    pageContent?.categories?.length > 0 ? (pageContent.categories as Category[]) : DEFAULT_CATEGORIES

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
          <h1 className="font-serif text-3xl md:text-4xl text-foreground">{title}</h1>
        </header>

        {/* Categories */}
        {categories.map((category) => {
          const enabledEntries = category.entries.filter((e) => e.enabled)
          if (enabledEntries.length === 0) return null

          return (
            <Section key={category.id}>
              <SectionLabel>
                {category.label} — {category.sublabel}
              </SectionLabel>
              <ul className="space-y-2">
                {enabledEntries.map((entry, index) => (
                  <li key={index} className="font-serif text-base text-foreground">
                    {entry.url ? (
                      <a
                        href={entry.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                      >
                        <em>{entry.title}</em>
                      </a>
                    ) : (
                      <em>{entry.title}</em>
                    )}
                    {entry.publication && (
                      <span className="text-muted-foreground">
                        , {entry.publication}
                        {entry.date && `, ${entry.date}`}
                      </span>
                    )}
                    {!entry.publication && entry.date && <span className="text-muted-foreground">, {entry.date}</span>}
                  </li>
                ))}
              </ul>
            </Section>
          )
        })}

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
