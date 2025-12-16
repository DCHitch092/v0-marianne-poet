"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Plus, Trash2, ChevronDown, ChevronRight } from "lucide-react"
import type { ContentData } from "../admin-dashboard"

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

type ArchiveEditorProps = {
  content: ContentData
  updateContent: (sectionId: string, content: Record<string, any>) => void
  saveSection: (sectionId: string) => Promise<boolean>
}

export function ArchiveEditor({ content, updateContent, saveSection }: ArchiveEditorProps) {
  const [saving, setSaving] = useState(false)
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  const pageContent = content.archive_page?.content || { title: "Archive", intro: "", categories: [] }
  const categories: Category[] = pageContent.categories || []

  const handleSave = async () => {
    setSaving(true)
    await saveSection("archive_page")
    setSaving(false)
  }

  const updatePageField = (field: string, value: string) => {
    updateContent("archive_page", { ...pageContent, [field]: value })
  }

  const updateCategory = (categoryId: string, entries: ArchiveEntry[]) => {
    const updated = categories.map((cat) => (cat.id === categoryId ? { ...cat, entries } : cat))
    updateContent("archive_page", { ...pageContent, categories: updated })
  }

  const addEntry = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId)
    if (!category) return
    const newEntry: ArchiveEntry = {
      title: "",
      publication: "",
      date: "",
      url: null,
      enabled: true,
    }
    updateCategory(categoryId, [...category.entries, newEntry])
  }

  const updateEntry = (categoryId: string, entryIndex: number, field: string, value: any) => {
    const category = categories.find((cat) => cat.id === categoryId)
    if (!category) return
    const entries = [...category.entries]
    entries[entryIndex] = { ...entries[entryIndex], [field]: value }
    updateCategory(categoryId, entries)
  }

  const removeEntry = (categoryId: string, entryIndex: number) => {
    const category = categories.find((cat) => cat.id === categoryId)
    if (!category) return
    const entries = category.entries.filter((_, i) => i !== entryIndex)
    updateCategory(categoryId, entries)
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
              className="font-serif min-h-16 resize-y"
            />
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      {categories.map((category) => (
        <Card key={category.id} className="border-border">
          <CardHeader>
            <button
              onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
              className="flex items-center gap-2 w-full text-left"
            >
              {expandedCategory === category.id ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
              <CardTitle className="text-lg font-serif font-light">
                {category.label} — {category.sublabel}
              </CardTitle>
              <span className="text-sm text-muted-foreground font-sans ml-2">({category.entries.length} entries)</span>
            </button>
          </CardHeader>

          {expandedCategory === category.id && (
            <CardContent className="space-y-4">
              {category.entries.map((entry, index) => (
                <div
                  key={index}
                  className={`p-3 border rounded-md space-y-3 ${
                    entry.enabled ? "border-border" : "border-border/50 bg-muted/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-sans text-sm text-muted-foreground">Entry {index + 1}</p>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-destructive hover:text-destructive"
                        onClick={() => removeEntry(category.id, index)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                      <Switch
                        checked={entry.enabled}
                        onCheckedChange={(checked) => updateEntry(category.id, index, "enabled", checked)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="font-sans text-xs text-muted-foreground">Title</Label>
                      <Input
                        value={entry.title}
                        onChange={(e) => updateEntry(category.id, index, "title", e.target.value)}
                        className="font-sans h-8"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="font-sans text-xs text-muted-foreground">Publication</Label>
                      <Input
                        value={entry.publication}
                        onChange={(e) => updateEntry(category.id, index, "publication", e.target.value)}
                        className="font-sans h-8"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="font-sans text-xs text-muted-foreground">Date</Label>
                      <Input
                        value={entry.date}
                        onChange={(e) => updateEntry(category.id, index, "date", e.target.value)}
                        className="font-sans h-8"
                        placeholder="2024"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="font-sans text-xs text-muted-foreground">URL (optional)</Label>
                      <Input
                        value={entry.url || ""}
                        onChange={(e) => updateEntry(category.id, index, "url", e.target.value || null)}
                        className="font-sans h-8"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button
                onClick={() => addEntry(category.id)}
                variant="outline"
                size="sm"
                className="font-sans bg-transparent w-full"
              >
                <Plus className="h-4 w-4 mr-1" /> Add Entry
              </Button>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  )
}
