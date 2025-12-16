"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { ContentData } from "../admin-dashboard"

type HomeEditorProps = {
  content: ContentData
  updateContent: (sectionId: string, content: Record<string, any>) => void
  saveSection: (sectionId: string) => Promise<boolean>
}

export function HomeEditor({ content, updateContent, saveSection }: HomeEditorProps) {
  const [saving, setSaving] = useState<string | null>(null)

  const handleSave = async (sectionId: string) => {
    setSaving(sectionId)
    await saveSection(sectionId)
    setSaving(null)
  }

  const handleFieldChange = (sectionId: string, field: string, value: string) => {
    const currentContent = content[sectionId]?.content || {}
    updateContent(sectionId, { ...currentContent, [field]: value })
  }

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <Card className="border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-serif font-light">Hero Section</CardTitle>
          <Button
            onClick={() => handleSave("hero")}
            disabled={saving === "hero"}
            variant="outline"
            size="sm"
            className="font-sans bg-transparent"
          >
            {saving === "hero" ? "Saving..." : "Save"}
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="font-sans text-sm">Tagline</Label>
            <Input
              value={content.hero?.content?.tagline || ""}
              onChange={(e) => handleFieldChange("hero", "tagline", e.target.value)}
              className="font-sans"
            />
          </div>
        </CardContent>
      </Card>

      {/* Introduction */}
      <Card className="border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-serif font-light">Introduction</CardTitle>
          <Button
            onClick={() => handleSave("introduction")}
            disabled={saving === "introduction"}
            variant="outline"
            size="sm"
            className="font-sans bg-transparent"
          >
            {saving === "introduction" ? "Saving..." : "Save"}
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="font-sans text-sm">Bio Text</Label>
            <Textarea
              value={content.introduction?.content?.text || ""}
              onChange={(e) => handleFieldChange("introduction", "text", e.target.value)}
              className="font-serif min-h-32 resize-y"
            />
          </div>
        </CardContent>
      </Card>

      {/* Current Work */}
      <Card className="border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-serif font-light">Current Work</CardTitle>
          <Button
            onClick={() => handleSave("current_work")}
            disabled={saving === "current_work"}
            variant="outline"
            size="sm"
            className="font-sans bg-transparent"
          >
            {saving === "current_work" ? "Saving..." : "Save"}
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="font-sans text-sm">Book Title</Label>
            <Input
              value={content.current_work?.content?.title || ""}
              onChange={(e) => handleFieldChange("current_work", "title", e.target.value)}
              className="font-sans"
            />
          </div>
          <div className="space-y-2">
            <Label className="font-sans text-sm">Description</Label>
            <Textarea
              value={content.current_work?.content?.description || ""}
              onChange={(e) => handleFieldChange("current_work", "description", e.target.value)}
              className="font-serif min-h-24 resize-y"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-sans text-sm">Link Text</Label>
              <Input
                value={content.current_work?.content?.link_text || ""}
                onChange={(e) => handleFieldChange("current_work", "link_text", e.target.value)}
                className="font-sans"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-sans text-sm">Link URL</Label>
              <Input
                value={content.current_work?.content?.link_url || ""}
                onChange={(e) => handleFieldChange("current_work", "link_url", e.target.value)}
                className="font-sans"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Read Invitation */}
      <Card className="border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-serif font-light">Read Invitation</CardTitle>
          <Button
            onClick={() => handleSave("read_invitation")}
            disabled={saving === "read_invitation"}
            variant="outline"
            size="sm"
            className="font-sans bg-transparent"
          >
            {saving === "read_invitation" ? "Saving..." : "Save"}
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="font-sans text-sm">Invitation Text</Label>
            <Textarea
              value={content.read_invitation?.content?.text || ""}
              onChange={(e) => handleFieldChange("read_invitation", "text", e.target.value)}
              className="font-serif min-h-24 resize-y"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-sans text-sm">Link Text</Label>
              <Input
                value={content.read_invitation?.content?.link_text || ""}
                onChange={(e) => handleFieldChange("read_invitation", "link_text", e.target.value)}
                className="font-sans"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-sans text-sm">Link URL</Label>
              <Input
                value={content.read_invitation?.content?.link_url || ""}
                onChange={(e) => handleFieldChange("read_invitation", "link_url", e.target.value)}
                className="font-sans"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Newsletter */}
      <Card className="border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-serif font-light">Newsletter Section</CardTitle>
          <Button
            onClick={() => handleSave("newsletter")}
            disabled={saving === "newsletter"}
            variant="outline"
            size="sm"
            className="font-sans bg-transparent"
          >
            {saving === "newsletter" ? "Saving..." : "Save"}
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="font-sans text-sm">Heading</Label>
            <Input
              value={content.newsletter?.content?.heading || ""}
              onChange={(e) => handleFieldChange("newsletter", "heading", e.target.value)}
              className="font-sans"
            />
          </div>
          <div className="space-y-2">
            <Label className="font-sans text-sm">Description</Label>
            <Textarea
              value={content.newsletter?.content?.text || ""}
              onChange={(e) => handleFieldChange("newsletter", "text", e.target.value)}
              className="font-serif min-h-20 resize-y"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-sans text-sm">Email Placeholder</Label>
              <Input
                value={content.newsletter?.content?.placeholder || ""}
                onChange={(e) => handleFieldChange("newsletter", "placeholder", e.target.value)}
                className="font-sans"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-sans text-sm">Button Text</Label>
              <Input
                value={content.newsletter?.content?.button_text || ""}
                onChange={(e) => handleFieldChange("newsletter", "button_text", e.target.value)}
                className="font-sans"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
