import Link from "next/link"
import { getContent } from "@/lib/content"

type Book = {
  id: string
  title: string
  publisher: string
  type: string
  description: string
  description2: string
  link_text: string
  link_url: string
  enabled: boolean
  order: number
}

const DEFAULT_BOOKS: Book[] = [
  {
    id: "recital",
    title: "Recital",
    publisher: "Blue Diode Press",
    type: "Poetry collection",
    description:
      "Recital is a poetry collection concerned with grief, memory, and the quiet persistence of love. The poems move between lyric fragments and narrative moments, attending to the small, often surreal details that surface in the aftermath of loss.",
    description2: "The collection resists resolution, allowing humour and tenderness to exist alongside absence.",
    link_text: "Find the book",
    link_url: "https://www.bluediode.co.uk/product-page/recital-by-marianne-macrae",
    enabled: true,
    order: 1,
  },
]

export const revalidate = false // Use ISR instead of "use cache"

export default async function BooksPage() {
  const pageContent = await getContent("books_page")

  const title = pageContent?.title || "Books"
  const books: Book[] =
    pageContent?.books?.length > 0
      ? (pageContent.books as Book[]).filter((b) => b.enabled).sort((a, b) => a.order - b.order)
      : DEFAULT_BOOKS

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

        <header className="mb-16 md:mb-24">
          <h1 className="font-serif text-3xl md:text-4xl text-foreground">{title}</h1>
        </header>

        {books.map((book) => (
          <article key={book.id} className="mb-16 md:mb-24">
            <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-3">
              <span className="italic">{book.title}</span>
            </h2>

            <p className="font-serif text-base text-muted-foreground mb-8">
              {book.type} — {book.publisher}
            </p>

            <div className="space-y-4 mb-8">
              <p className="font-serif text-lg leading-relaxed text-foreground">
                <span className="italic">{book.title}</span> {book.description.replace(book.title, "").trim()}
              </p>
              {book.description2 && (
                <p className="font-serif text-lg leading-relaxed text-foreground">{book.description2}</p>
              )}
            </div>

            <Link
              href={book.link_url}
              target={book.link_url.startsWith("http") ? "_blank" : undefined}
              rel={book.link_url.startsWith("http") ? "noopener noreferrer" : undefined}
              className="font-serif text-base text-primary hover:text-primary/80 transition-colors"
            >
              {book.link_text}
            </Link>
          </article>
        ))}

        <footer className="pt-12 md:pt-16 border-t border-border/30">
          <Link
            href="/"
            className="font-display text-base tracking-tight text-muted-foreground/60 hover:text-foreground transition-colors duration-300"
          >
            Back to Marianne <span className="italic">MacRae</span>
          </Link>
        </footer>
      </div>
    </main>
  )
}
