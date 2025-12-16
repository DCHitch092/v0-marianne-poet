import { getPublicClient } from "@/lib/supabase/public"

export type ContentSection = {
  id: string
  content: Record<string, any>
  updated_at: string
}

const DEFAULT_CONTENT: Record<string, Record<string, any>> = {
  hero: {
    tagline: "Poet & Writer",
  },
  introduction: {
    text: "Marianne MacRae is a Scottish poet whose work explores landscape, memory, and the quiet spaces between words. Her poetry has appeared in leading literary journals and her debut collection, Recital, is now available.",
  },
  current_work: {
    title: "Recital",
    description:
      "A debut collection exploring voice, silence, and the landscapes that shape us. Published by Polygon Books.",
    link_text: "Find the book",
    link_url: "/books",
  },
  read_invitation: {
    text: "A selection of poems from journals and forthcoming work.",
    link_text: "Read selected work",
    link_url: "/read",
  },
  newsletter: {
    heading: "Intervals",
    text: "Occasional notes on writing, reading, and work in progress. Sent infrequently, unsubscribe anytime.",
    placeholder: "Your email",
    button_text: "Subscribe",
  },
  nav_items: {
    items: [
      { id: "read", label: "Read", href: "/read", enabled: true, order: 1 },
      { id: "listen", label: "Listen", href: "/listen", enabled: true, order: 2 },
      { id: "books", label: "Books", href: "/books", enabled: true, order: 3 },
      { id: "about", label: "About", href: "/about", enabled: true, order: 4 },
      { id: "intervals", label: "Intervals", href: "/intervals", enabled: true, order: 5 },
    ],
  },
  read_page: {
    title: "Read",
    intro: "A small selection of poems and fragments.",
    footer_text: "Some pieces find their way into books.",
    poems: [],
  },
  listen_page: {
    title: "Listen",
    intro: "These recordings offer a sense of how the work sounds when read aloud.",
    description:
      "They are brief, unadorned readings, intended to reflect the pace and tone of the writing rather than performance.",
    recordings: [],
  },
  books_page: {
    title: "Books",
    books: [],
  },
  about_page: {
    title: "About",
    opening: [],
    statement_of_practice: [],
    selected_publications: [],
    current_work: "",
    readings_collaborations: "",
    bio_50: "",
    bio_100: "",
  },
  archive_page: {
    title: "Archive",
    intro: "A record of published work.",
    categories: [],
  },
  intervals_page: {
    title: "Intervals",
    paragraphs: [],
    cta_intro: "",
    cta_text: "",
    link_text: "",
    link_url: "",
  },
}

function isSupabaseConfigured(): boolean {
  return !!(
    (process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL) &&
    (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY)
  )
}

export async function getContent(id: string): Promise<Record<string, any> | null> {
  if (!isSupabaseConfigured()) {
    return DEFAULT_CONTENT[id] || null
  }

  const supabase = getPublicClient()
  if (!supabase) {
    return DEFAULT_CONTENT[id] || null
  }

  const { data, error } = await supabase.from("site_content").select("content").eq("id", id).single()

  if (error || !data) {
    console.error(`Error fetching content for ${id}:`, error)
    return DEFAULT_CONTENT[id] || null
  }

  return data.content as Record<string, any>
}

export async function getAllContent(): Promise<Record<string, Record<string, any>>> {
  if (!isSupabaseConfigured()) {
    return DEFAULT_CONTENT
  }

  const supabase = getPublicClient()
  if (!supabase) {
    return DEFAULT_CONTENT
  }

  const { data, error } = await supabase.from("site_content").select("id, content")

  if (error || !data) {
    console.error("Error fetching all content:", error)
    return DEFAULT_CONTENT
  }

  const dbContent = data.reduce(
    (acc, item) => {
      acc[item.id] = item.content as Record<string, any>
      return acc
    },
    {} as Record<string, Record<string, any>>,
  )

  // Merge with defaults to ensure all keys exist
  return { ...DEFAULT_CONTENT, ...dbContent }
}

export async function updateContent(id: string, content: Record<string, any>): Promise<boolean> {
  const { createClient } = await import("@/lib/supabase/server")
  const supabase = await createClient()
  const { error } = await supabase
    .from("site_content")
    .update({ content, updated_at: new Date().toISOString() })
    .eq("id", id)

  if (error) {
    console.error(`Error updating content for ${id}:`, error)
    return false
  }

  return true
}

export async function getNavItems(): Promise<
  Array<{ id: string; label: string; href: string; enabled: boolean; order: number }>
> {
  const navContent = await getContent("nav_items")
  if (!navContent?.items) return []
  return (navContent.items as any[]).filter((item: any) => item.enabled).sort((a: any, b: any) => a.order - b.order)
}
