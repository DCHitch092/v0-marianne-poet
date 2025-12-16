import Link from "next/link"

type CurrentWorkProps = {
  title?: string
  description?: string
  linkText?: string
  linkUrl?: string
}

export function CurrentWork({
  title = "Recital",
  description = "A collection of poems exploring voice, silence, and the act of speaking into being.",
  linkText = "Find the book",
  linkUrl = "#",
}: CurrentWorkProps) {
  return (
    <section className="py-12 md:py-16 border-t border-border">
      <div className="flex flex-col items-center text-center">
        <span className="text-sm font-sans uppercase tracking-widest text-muted-foreground mb-4">Current Work</span>
        <h2 className="text-2xl md:text-3xl font-light italic text-foreground mb-4">{title}</h2>
        <p className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-lg mb-6 font-light">
          {description}
        </p>
        <Link
          href={linkUrl}
          className="text-base font-sans text-primary hover:text-accent transition-colors underline underline-offset-4"
        >
          {linkText}
        </Link>
      </div>
    </section>
  )
}
