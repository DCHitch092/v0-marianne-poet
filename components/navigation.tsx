import Link from "next/link"
import { getNavItems } from "@/lib/content"

export async function Navigation() {
  const navItems = await getNavItems()

  // Fallback if no items from database
  const items =
    navItems.length > 0
      ? navItems
      : [
          { id: "read", label: "Read", href: "/read", enabled: true, order: 1 },
          { id: "listen", label: "Listen", href: "/listen", enabled: true, order: 2 },
          { id: "books", label: "Books", href: "/books", enabled: true, order: 3 },
          { id: "about", label: "About", href: "/about", enabled: true, order: 4 },
          { id: "intervals", label: "Intervals", href: "/intervals", enabled: true, order: 5 },
        ]

  return (
    <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2 py-8 md:py-12">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-base md:text-lg font-sans font-normal text-muted-foreground hover:text-primary transition-colors tracking-wide"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
