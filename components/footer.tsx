import Link from "next/link"
import { Mail, BookOpen } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-12 md:py-16 border-t border-border">
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm font-sans text-muted-foreground/60">
        <Link href="/archive" className="hover:text-primary transition-colors">
          Archive
        </Link>
        <span className="text-muted-foreground/30">·</span>
        <Link href="/contact" className="hover:text-primary transition-colors">
          Contact
        </Link>
        <span className="text-muted-foreground/30">·</span>

        {/* Social icons inline */}
        <div className="flex items-center gap-3">
          <a href="mailto:hello@mariannemacrae.com" className="hover:text-primary transition-colors" aria-label="Email">
            <Mail className="w-4 h-4" />
          </a>
          <a
            href="https://mochatheweek.substack.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
            aria-label="Substack"
          >
            <BookOpen className="w-4 h-4" />
          </a>
          <a
            href="https://www.instagram.com/mariannemacrae1/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
            aria-label="Instagram"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </a>
        </div>

        <span className="text-muted-foreground/30">·</span>
        <span>Marianne MacRae · {currentYear}</span>
      </div>
    </footer>
  )
}
