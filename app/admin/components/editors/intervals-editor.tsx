"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { ContentData } from "../admin-dashboard"

type IntervalsEditorProps = {
  content: ContentData
  updateContent: (sectionId: string, content: Record<string, any>) => void
  saveSection: (sectionId: string) => Promise<boolean>
}

export function IntervalsEditor({ content, updateContent, saveSection }: IntervalsEditorProps) {
  const [saving, setSaving] = useState(false)

  const pageContent = content.intervals_page?.content || {}

  const handleSave = async () => {
    setSaving(true)
    await saveSection("intervals_page")
    setSaving(false)
  }

  const updateField = (field: string, value: any) => {
    updateContent("intervals_page", { ...pageContent, [field]: value })
  }

  const updateParagraph = (index: number, value: string) => {
    const paragraphs = [...(pageContent.paragraphs || [])]
    paragraphs[index] = value
    updateField("paragraphs", paragraphs)
  }

  return (
    <div className="space-y-6">
      <Card className="border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-serif font-light">Intervals Page</CardTitle>
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
              onChange={(e) => updateField("title", e.target.value)}
              className="font-sans"
            />
          </div>

          <div className="space-y-3">
            <Label className="font-sans text-sm">Body Paragraphs</Label>
            {(pageContent.paragraphs || []).map((para: string, index: number) => (
              <Textarea
                key={index}
                value={para}
                onChange={(e) => updateParagraph(index, e.target.value)}
                className="font-serif min-h-20 resize-y"
                placeholder={`Paragraph ${index + 1}`}
              />
            ))}
          </div>

          <div className="space-y-2">
            <Label className="font-sans text-sm">Call-to-action Intro</Label>
            <Input
              value={pageContent.cta_intro || ""}
              onChange={(e) => updateField("cta_intro", e.target.value)}
              className="font-sans"
              placeholder="e.g., Intervals lives elsewhere."
            />
          </div>

          <div className="space-y-2">
            <Label className="font-sans text-sm">Call-to-action Text</Label>
            <Textarea
              value={pageContent.cta_text || ""}
              onChange={(e) => updateField("cta_text", e.target.value)}
              className="font-serif min-h-16 resize-y"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-sans text-sm">Link Text</Label>
              <Input
                value={pageContent.link_text || ""}
                onChange={(e) => updateField("link_text", e.target.value)}
                className="font-sans"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-sans text-sm">Link URL</Label>
              <Input
                value={pageContent.link_url || ""}
                onChange={(e) => updateField("link_url", e.target.value)}
                className="font-sans"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
