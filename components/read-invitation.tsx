import Link from "next/link"

type ReadInvitationProps = {
  text?: string
  linkText?: string
  linkUrl?: string
}

export function ReadInvitation({
  text = "Poetry lives in the reading. Here you will find selected work—pieces that have found their way into the world through journals, anthologies, and quiet corners of the internet.",
  linkText = "Read selected work",
  linkUrl = "#",
}: ReadInvitationProps) {
  return (
    <section className="py-12 md:py-16 border-t border-border">
      <div className="flex flex-col items-center text-center">
        <p className="text-base md:text-lg leading-relaxed text-foreground max-w-lg mb-6 font-light">{text}</p>
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
