import Link from "next/link"
import { getContent } from "@/lib/content"

type Poem = {
  id: string
  title: string
  enabled: boolean
  order: number
  stanzas: string[]
}

function Poem({ title, stanzas }: { title: string; stanzas: string[] }) {
  return (
    <article className="py-16 md:py-24">
      <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-8 md:mb-12">{title}</h2>
      <div className="space-y-6 md:space-y-8">
        {stanzas.map((stanza, index) => (
          <p key={index} className="font-serif text-lg md:text-xl leading-relaxed text-foreground whitespace-pre-line">
            {stanza}
          </p>
        ))}
      </div>
    </article>
  )
}

function PoemDivider() {
  return (
    <div className="flex justify-center py-4">
      <span className="text-muted-foreground/40 text-lg">*</span>
    </div>
  )
}

// Default poems as fallback
const DEFAULT_POEMS: Poem[] = [
  {
    id: "recital",
    title: "Recital",
    enabled: true,
    order: 1,
    stanzas: [
      `I am wearing a horse's head
and still you do not notice me. 
The nail varnish on my toes matches 
the mint-cream green of your t-shirt.
Neither of us are wearing socks.`,
      `I'm part of a much larger horse,
you'll see it soon;
handcrafted bamboo frames
wrinkled with white tissue paper,
a chorus line of horse parts
all singing the same horse song.`,
      `I spy you in the crowd, spilling 
a secret to someone who isn't me
as we clip-clop on stage 
for the opening number.`,
      `My horse head mouth does not move
but underneath it I am singing
with a mouth so wide and dark
I'm afraid of what will come out of it.`,
    ],
  },
  {
    id: "fox",
    title: "Fox",
    enabled: true,
    order: 2,
    stanzas: [
      `squashed meat glistens
against an unbroken
slick of tarmac
a solitary eyeball 
lying unhinged 
seeks its partner
amongst the debris`,
      `the wilting tongue 
a pink wing flapping
once lapped 
the rippling sheet 
of water that searches 
the far side of the woods`,
      `a fly comes now 
to identify the body 
lays eggs in folds
of soft midriff
embossed 
with tyre tread 
cross stitch`,
    ],
  },
  {
    id: "unwinding",
    title: "Unwinding",
    enabled: true,
    order: 3,
    stanzas: [
      `A half-drunk bottle of Hobgoblin
sat for days afterwards, unmoving 
from where you left it, until 
a shock of white mould 
gathered across the surface.`,
      `I don't recall who threw it away 
just that you opened it, smiling 
on a Friday night after work, 
assumed you had time to finish it,
your fingerprints ghosting the brown glass.`,
    ],
  },
]

export const revalidate = false // Use ISR instead of "use cache"

export default async function ReadPage() {
  const pageContent = await getContent("read_page")

  const title = pageContent?.title || "Read"
  const intro = pageContent?.intro || "A small selection of poems and fragments."
  const footerText = pageContent?.footer_text || "Some pieces find their way into books."

  const poems: Poem[] =
    pageContent?.poems?.length > 0
      ? (pageContent.poems as Poem[]).filter((p) => p.enabled).sort((a, b) => a.order - b.order)
      : DEFAULT_POEMS

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-xl mx-auto px-6 md:px-8 py-16 md:py-24">
        <nav className="mb-12 md:mb-16">
          <Link
            href="/"
            className="font-display text-lg md:text-xl tracking-tight text-muted-foreground/50 md:text-muted-foreground/30 hover:text-foreground transition-colors duration-300"
          >
            Marianne <span className="italic">MacRae</span>
          </Link>
        </nav>

        <header className="mb-8 md:mb-12">
          <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-6">{title}</h1>
          <p className="font-serif text-lg text-muted-foreground">{intro}</p>
        </header>

        <div className="divide-y divide-border/30">
          {poems.map((poem, index) => (
            <div key={poem.id}>
              <Poem title={poem.title} stanzas={poem.stanzas} />
              {index < poems.length - 1 && <PoemDivider />}
            </div>
          ))}
        </div>

        <footer className="pt-16 md:pt-24 border-t border-border/30 mt-16">
          <p className="font-serif text-base text-muted-foreground mb-4">{footerText}</p>
          <Link href="/books" className="font-serif text-base text-primary hover:text-primary/80 transition-colors">
            Books
          </Link>

          <div className="mt-12 pt-8 border-t border-border/30">
            <Link
              href="/"
              className="font-display text-base tracking-tight text-muted-foreground/60 hover:text-foreground transition-colors duration-300"
            >
              Back to Marianne <span className="italic">MacRae</span>
            </Link>
          </div>
        </footer>
      </div>
    </main>
  )
}
