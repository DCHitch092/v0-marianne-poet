"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2 } from "lucide-react"
import type { ContentData } from "../admin-dashboard"

type Publication = {
  text: string
  link: string | null
}

type AboutEditorProps = {
  content: ContentData
  updateContent: (sectionId: string, content: Record<string, any>) => void
  saveSection: (sectionId: string) => Promise<boolean>
}

export function AboutEditor({ content, updateContent, saveSection }: AboutEditorProps) {
  const [saving, setSaving] = useState(false)

  const pageContent = content.about_page?.content || {}

  const handleSave = async () => {
    setSaving(true)
    await saveSection("about_page")
    setSaving(false)
  }

  const updateField = (field: string, value: any) => {
    updateContent("about_page", { ...pageContent, [field]: value })
  }

  const updateOpeningParagraph = (index: number, value: string) => {
    const opening = [...(pageContent.opening || [])]
    opening[index] = value
    updateField("opening", opening)
  }

  const updateStatementParagraph = (index: number, value: string) => {
    const statement = [...(pageContent.statement_of_practice || [])]
    statement[index] = value
    updateField("statement_of_practice", statement)
  }

  const updatePublication = (index: number, field: "text" | "link", value: string) => {
    const pubs = [...(pageContent.selected_publications || [])]
    pubs[index] = { ...pubs[index], [field]: value || null }
    updateField("selected_publications", pubs)
  }

  const addPublication = () => {
    const pubs = [...(pageContent.selected_publications || []), { text: "", link: null }]
    updateField("selected_publications", pubs)
  }

  const removePublication = (index: number) => {
    const pubs = (pageContent.selected_publications || []).filter((_: Publication, i: number) => i !== index)
    updateField("selected_publications", pubs)
  }

  return (
    <div className="space-y-6">
      <Card className="border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-serif font-light">About Page</CardTitle>
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
        <CardContent className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label className="font-sans text-sm">Page Title</Label>
            <Input
              value={pageContent.title || ""}
              onChange={(e) => updateField("title", e.target.value)}
              className="font-sans"
            />
          </div>

          {/* Opening paragraphs */}
          <div className="space-y-3">
            <Label className="font-sans text-sm">Opening Paragraphs</Label>
            {(pageContent.opening || []).map((para: string, index: number) => (
              <Textarea
                key={index}
                value={para}
                onChange={(e) => updateOpeningParagraph(index, e.target.value)}
                className="font-serif min-h-24 resize-y"
                placeholder={`Paragraph ${index + 1}`}
              />
            ))}
          </div>

          {/* Statement of Practice */}
          <div className="space-y-3">
            <Label className="font-sans text-sm">Statement of Practice</Label>
            {(pageContent.statement_of_practice || []).map((para: string, index: number) => (
              <Textarea
                key={index}
                value={para}
                onChange={(e) => updateStatementParagraph(index, e.target.value)}
                className="font-serif min-h-24 resize-y"
                placeholder={`Paragraph ${index + 1}`}
              />
            ))}
          </div>

          {/* Selected Publications */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="font-sans text-sm">Selected Publications</Label>
              <Button onClick={addPublication} variant="ghost" size="sm" className="font-sans">
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
            {(pageContent.selected_publications || []).map((pub: Publication, index: number) => (
              <div key={index} className="flex gap-2 items-start">
                <div className="flex-1 grid grid-cols-2 gap-2">
                  <Input
                    value={pub.text}
                    onChange={(e) => updatePublication(index, "text", e.target.value)}
                    className="font-sans"
                    placeholder="Publication text"
                  />
                  <Input
                    value={pub.link || ""}
                    onChange={(e) => updatePublication(index, "link", e.target.value)}
                    className="font-sans"
                    placeholder="URL (optional)"
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 shrink-0"
                  onClick={() => removePublication(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Current Work */}
          <div className="space-y-2">
            <Label className="font-sans text-sm">Current Work</Label>
            <Textarea
              value={pageContent.current_work || ""}
              onChange={(e) => updateField("current_work", e.target.value)}
              className="font-serif min-h-20 resize-y"
            />
          </div>

          {/* Readings & Collaborations */}
          <div className="space-y-2">
            <Label className="font-sans text-sm">Readings & Collaborations</Label>
            <Textarea
              value={pageContent.readings_collaborations || ""}
              onChange={(e) => updateField("readings_collaborations", e.target.value)}
              className="font-serif min-h-20 resize-y"
            />
          </div>

          {/* Bios */}
          <div className="space-y-3">
            <Label className="font-sans text-sm">Short Bios</Label>
            <div className="space-y-2">
              <Label className="font-sans text-xs text-muted-foreground">50-word bio</Label>
              <Textarea
                value={pageContent.bio_50 || ""}
                onChange={(e) => updateField("bio_50", e.target.value)}
                className="font-serif min-h-20 resize-y"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-sans text-xs text-muted-foreground">100-word bio</Label>
              <Textarea
                value={pageContent.bio_100 || ""}
                onChange={(e) => updateField("bio_100", e.target.value)}
                className="font-serif min-h-24 resize-y"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
