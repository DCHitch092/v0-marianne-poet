"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ChevronUp, ChevronDown, Plus, Trash2 } from "lucide-react"
import type { ContentData } from "../admin-dashboard"

type Poem = {
  id: string
  title: string
  enabled: boolean
  order: number
  stanzas: string[]
}

type ReadEditorProps = {
  content: ContentData
  updateContent: (sectionId: string, content: Record<string, any>) => void
  saveSection: (sectionId: string) => Promise<boolean>
}

export function ReadEditor({ content, updateContent, saveSection }: ReadEditorProps) {
  const [saving, setSaving] = useState(false)
  const [expandedPoem, setExpandedPoem] = useState<string | null>(null)

  const pageContent = content.read_page?.content || { title: "Read", intro: "", footer_text: "", poems: [] }
  const poems: Poem[] = (pageContent.poems || []).sort((a: Poem, b: Poem) => a.order - b.order)

  const handleSave = async () => {
    setSaving(true)
    await saveSection("read_page")
    setSaving(false)
  }

  const updatePageField = (field: string, value: string) => {
    updateContent("read_page", { ...pageContent, [field]: value })
  }

  const togglePoemEnabled = (poemId: string) => {
    const updatedPoems = poems.map((poem) => (poem.id === poemId ? { ...poem, enabled: !poem.enabled } : poem))
    updateContent("read_page", { ...pageContent, poems: updatedPoems })
  }

  const movePoem = (poemId: string, direction: "up" | "down") => {
    const index = poems.findIndex((poem) => poem.id === poemId)
    if (index === -1) return
    if (direction === "up" && index === 0) return
    if (direction === "down" && index === poems.length - 1) return

    const newPoems = [...poems]
    const swapIndex = direction === "up" ? index - 1 : index + 1
    const tempOrder = newPoems[index].order
    newPoems[index] = { ...newPoems[index], order: newPoems[swapIndex].order }
    newPoems[swapIndex] = { ...newPoems[swapIndex], order: tempOrder }
    newPoems.sort((a, b) => a.order - b.order)

    updateContent("read_page", { ...pageContent, poems: newPoems })
  }

  const updatePoem = (poemId: string, field: string, value: any) => {
    const updatedPoems = poems.map((poem) => (poem.id === poemId ? { ...poem, [field]: value } : poem))
    updateContent("read_page", { ...pageContent, poems: updatedPoems })
  }

  const addPoem = () => {
    const newPoem: Poem = {
      id: `poem_${Date.now()}`,
      title: "New Poem",
      enabled: true,
      order: poems.length + 1,
      stanzas: [""],
    }
    updateContent("read_page", { ...pageContent, poems: [...poems, newPoem] })
    setExpandedPoem(newPoem.id)
  }

  const deletePoem = (poemId: string) => {
    if (!confirm("Are you sure you want to delete this poem?")) return
    const updatedPoems = poems.filter((poem) => poem.id !== poemId)
    updateContent("read_page", { ...pageContent, poems: updatedPoems })
  }

  const updateStanza = (poemId: string, stanzaIndex: number, value: string) => {
    const poem = poems.find((p) => p.id === poemId)
    if (!poem) return
    const newStanzas = [...poem.stanzas]
    newStanzas[stanzaIndex] = value
    updatePoem(poemId, "stanzas", newStanzas)
  }

  const addStanza = (poemId: string) => {
    const poem = poems.find((p) => p.id === poemId)
    if (!poem) return
    updatePoem(poemId, "stanzas", [...poem.stanzas, ""])
  }

  const removeStanza = (poemId: string, stanzaIndex: number) => {
    const poem = poems.find((p) => p.id === poemId)
    if (!poem || poem.stanzas.length <= 1) return
    const newStanzas = poem.stanzas.filter((_, i) => i !== stanzaIndex)
    updatePoem(poemId, "stanzas", newStanzas)
  }

  return (
    <div className="space-y-6">
      {/* Page Settings */}
      <Card className="border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-serif font-light">Page Settings</CardTitle>
          <Button
            onClick={handleSave}
            disabled={saving}
            variant="outline"
            size="sm"
            className="font-sans bg-transparent"
          >
            {saving ? "Saving..." : "Save All"}
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="font-sans text-sm">Page Title</Label>
            <Input
              value={pageContent.title || ""}
              onChange={(e) => updatePageField("title", e.target.value)}
              className="font-sans"
            />
          </div>
          <div className="space-y-2">
            <Label className="font-sans text-sm">Introduction</Label>
            <Textarea
              value={pageContent.intro || ""}
              onChange={(e) => updatePageField("intro", e.target.value)}
              className="font-serif min-h-20 resize-y"
            />
          </div>
          <div className="space-y-2">
            <Label className="font-sans text-sm">Footer Text</Label>
            <Input
              value={pageContent.footer_text || ""}
              onChange={(e) => updatePageField("footer_text", e.target.value)}
              className="font-sans"
            />
          </div>
        </CardContent>
      </Card>

      {/* Poems */}
      <Card className="border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg font-serif font-light">Poems</CardTitle>
            <p className="text-sm text-muted-foreground font-sans mt-1">Manage poems displayed on the Read page.</p>
          </div>
          <Button onClick={addPoem} variant="outline" size="sm" className="font-sans bg-transparent">
            <Plus className="h-4 w-4 mr-1" /> Add Poem
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {poems.map((poem, index) => (
            <div
              key={poem.id}
              className={`border rounded-md ${poem.enabled ? "border-border" : "border-border/50 bg-muted/30"}`}
            >
              <div className="flex items-center justify-between p-3">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col gap-0.5">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5"
                      onClick={() => movePoem(poem.id, "up")}
                      disabled={index === 0}
                    >
                      <ChevronUp className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5"
                      onClick={() => movePoem(poem.id, "down")}
                      disabled={index === poems.length - 1}
                    >
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </div>
                  <button
                    onClick={() => setExpandedPoem(expandedPoem === poem.id ? null : poem.id)}
                    className="text-left"
                  >
                    <p className={`font-serif font-medium ${!poem.enabled && "text-muted-foreground"}`}>{poem.title}</p>
                    <p className="font-sans text-xs text-muted-foreground">
                      {poem.stanzas.length} stanza{poem.stanzas.length !== 1 && "s"}
                    </p>
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => deletePoem(poem.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Switch checked={poem.enabled} onCheckedChange={() => togglePoemEnabled(poem.id)} />
                </div>
              </div>

              {expandedPoem === poem.id && (
                <div className="border-t border-border p-4 space-y-4">
                  <div className="space-y-2">
                    <Label className="font-sans text-sm">Title</Label>
                    <Input
                      value={poem.title}
                      onChange={(e) => updatePoem(poem.id, "title", e.target.value)}
                      className="font-sans"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="font-sans text-sm">Stanzas</Label>
                    {poem.stanzas.map((stanza, stanzaIndex) => (
                      <div key={stanzaIndex} className="flex gap-2">
                        <Textarea
                          value={stanza}
                          onChange={(e) => updateStanza(poem.id, stanzaIndex, e.target.value)}
                          className="font-serif min-h-24 resize-y flex-1"
                          placeholder={`Stanza ${stanzaIndex + 1}`}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 shrink-0"
                          onClick={() => removeStanza(poem.id, stanzaIndex)}
                          disabled={poem.stanzas.length <= 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addStanza(poem.id)}
                      className="font-sans bg-transparent"
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add Stanza
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
