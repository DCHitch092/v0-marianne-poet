"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HomeEditor } from "./editors/home-editor"
import { NavigationEditor } from "./editors/navigation-editor"
import { ReadEditor } from "./editors/read-editor"
import { ListenEditor } from "./editors/listen-editor"
import { BooksEditor } from "./editors/books-editor"
import { AboutEditor } from "./editors/about-editor"
import { ArchiveEditor } from "./editors/archive-editor"
import { IntervalsEditor } from "./editors/intervals-editor"

export type ContentData = Record<
  string,
  {
    content: Record<string, any>
    updated_at: string
  }
>

type AdminDashboardProps = {
  initialContent: ContentData
  userEmail: string
}

export function AdminDashboard({ initialContent, userEmail }: AdminDashboardProps) {
  const [content, setContent] = useState<ContentData>(initialContent)
  const [publishing, setPublishing] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/auth/login")
  }

  const updateContent = (sectionId: string, newContent: Record<string, any>) => {
    setContent((prev) => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        content: newContent,
      },
    }))
    setHasChanges(true)
  }

  const saveSection = async (sectionId: string) => {
    const supabase = createClient()
    console.log("[v0] Saving section:", sectionId)
    console.log("[v0] Content being saved:", JSON.stringify(content[sectionId]?.content, null, 2))
    const { error } = await supabase.from("site_content").upsert({
      id: sectionId,
      content: content[sectionId]?.content,
      updated_at: new Date().toISOString(),
    })

    if (error) {
      console.error("Error saving:", error)
      alert("Failed to save. Please try again.")
      return false
    }
    console.log("[v0] Save successful for:", sectionId)
    return true
  }

  const handlePublish = async () => {
    setPublishing(true)
    try {
      const response = await fetch("/api/revalidate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paths: ["/", "/read", "/listen", "/books", "/about", "/archive", "/intervals", "/contact"],
        }),
      })

      if (!response.ok) throw new Error("Failed to publish")

      setHasChanges(false)
      alert("Changes published successfully!")
    } catch (error) {
      console.error("Error publishing:", error)
      alert("Failed to publish. Please try again.")
    } finally {
      setPublishing(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-6 py-4 sticky top-0 bg-background z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-serif font-light text-foreground">Site Editor</h1>
            <p className="text-sm font-sans text-muted-foreground">{userEmail}</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={handlePublish}
              disabled={publishing || !hasChanges}
              className="font-sans"
              variant={hasChanges ? "default" : "secondary"}
            >
              {publishing ? "Publishing..." : "Publish Changes"}
            </Button>
            <Button onClick={handleLogout} variant="outline" className="font-sans bg-transparent">
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="px-6 py-8">
        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="home" className="w-full">
            <TabsList className="w-full justify-start mb-8 flex-wrap h-auto gap-1">
              <TabsTrigger value="home" className="font-sans">
                Home
              </TabsTrigger>
              <TabsTrigger value="navigation" className="font-sans">
                Navigation
              </TabsTrigger>
              <TabsTrigger value="read" className="font-sans">
                Read
              </TabsTrigger>
              <TabsTrigger value="listen" className="font-sans">
                Listen
              </TabsTrigger>
              <TabsTrigger value="books" className="font-sans">
                Books
              </TabsTrigger>
              <TabsTrigger value="about" className="font-sans">
                About
              </TabsTrigger>
              <TabsTrigger value="archive" className="font-sans">
                Archive
              </TabsTrigger>
              <TabsTrigger value="intervals" className="font-sans">
                Intervals
              </TabsTrigger>
            </TabsList>

            <TabsContent value="home">
              <HomeEditor content={content} updateContent={updateContent} saveSection={saveSection} />
            </TabsContent>

            <TabsContent value="navigation">
              <NavigationEditor content={content} updateContent={updateContent} saveSection={saveSection} />
            </TabsContent>

            <TabsContent value="read">
              <ReadEditor content={content} updateContent={updateContent} saveSection={saveSection} />
            </TabsContent>

            <TabsContent value="listen">
              <ListenEditor content={content} updateContent={updateContent} saveSection={saveSection} />
            </TabsContent>

            <TabsContent value="books">
              <BooksEditor content={content} updateContent={updateContent} saveSection={saveSection} />
            </TabsContent>

            <TabsContent value="about">
              <AboutEditor content={content} updateContent={updateContent} saveSection={saveSection} />
            </TabsContent>

            <TabsContent value="archive">
              <ArchiveEditor content={content} updateContent={updateContent} saveSection={saveSection} />
            </TabsContent>

            <TabsContent value="intervals">
              <IntervalsEditor content={content} updateContent={updateContent} saveSection={saveSection} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
