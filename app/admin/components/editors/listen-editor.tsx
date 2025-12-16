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
import { AudioUploader } from "../audio-uploader"

type Recording = {
  id: string
  label: string
  filename: string
  file_url?: string
  enabled: boolean
  order: number
}

type ListenEditorProps = {
  content: ContentData
  updateContent: (sectionId: string, content: Record<string, any>) => void
  saveSection: (sectionId: string) => Promise<boolean>
}

export function ListenEditor({ content, updateContent, saveSection }: ListenEditorProps) {
  const [saving, setSaving] = useState(false)
  const [recordingsSaving, setRecordingsSaving] = useState(false)

  const pageContent = content.listen_page?.content || { title: "Listen", intro: "", description: "", recordings: [] }
  const recordings: Recording[] = (pageContent.recordings || []).sort((a: Recording, b: Recording) => a.order - b.order)

  const handleSave = async () => {
    setSaving(true)
    await saveSection("listen_page")
    setSaving(false)
  }

  const handleSaveRecordings = async () => {
    setRecordingsSaving(true)
    console.log("[v0] Saving recordings. Current content:", JSON.stringify(pageContent, null, 2))
    await saveSection("listen_page")
    setRecordingsSaving(false)
  }

  const updatePageField = (field: string, value: string) => {
    updateContent("listen_page", { ...pageContent, [field]: value })
  }

  const toggleRecordingEnabled = (recId: string) => {
    const updated = recordings.map((rec) => (rec.id === recId ? { ...rec, enabled: !rec.enabled } : rec))
    updateContent("listen_page", { ...pageContent, recordings: updated })
  }

  const moveRecording = (recId: string, direction: "up" | "down") => {
    const index = recordings.findIndex((rec) => rec.id === recId)
    if (index === -1) return
    if (direction === "up" && index === 0) return
    if (direction === "down" && index === recordings.length - 1) return

    const newRecs = [...recordings]
    const swapIndex = direction === "up" ? index - 1 : index + 1
    const tempOrder = newRecs[index].order
    newRecs[index] = { ...newRecs[index], order: newRecs[swapIndex].order }
    newRecs[swapIndex] = { ...newRecs[swapIndex], order: tempOrder }
    newRecs.sort((a, b) => a.order - b.order)

    updateContent("listen_page", { ...pageContent, recordings: newRecs })
  }

  const updateRecording = (recId: string, field: string, value: string) => {
    const updated = recordings.map((rec) => (rec.id === recId ? { ...rec, [field]: value } : rec))
    updateContent("listen_page", { ...pageContent, recordings: updated })
  }

  const addRecording = () => {
    const newRec: Recording = {
      id: `rec_${Date.now()}`,
      label: "New Recording",
      filename: "",
      enabled: true,
      order: recordings.length + 1,
    }
    updateContent("listen_page", { ...pageContent, recordings: [...recordings, newRec] })
  }

  const deleteRecording = (recId: string) => {
    if (!confirm("Are you sure you want to delete this recording?")) return
    const updated = recordings.filter((rec) => rec.id !== recId)
    updateContent("listen_page", { ...pageContent, recordings: updated })
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
            {saving ? "Saving..." : "Save"}
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
            <Label className="font-sans text-sm">Description</Label>
            <Textarea
              value={pageContent.description || ""}
              onChange={(e) => updatePageField("description", e.target.value)}
              className="font-serif min-h-20 resize-y"
            />
          </div>
        </CardContent>
      </Card>

      {/* Recordings */}
      <Card className="border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg font-serif font-light">Recordings</CardTitle>
            <p className="text-sm text-muted-foreground font-sans mt-1">
              Upload audio files and manage recording order, labels, and visibility
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={addRecording} variant="outline" size="sm" className="font-sans bg-transparent">
              <Plus className="h-4 w-4 mr-1" /> Add Recording
            </Button>
            <Button
              onClick={handleSaveRecordings}
              disabled={recordingsSaving}
              variant="outline"
              size="sm"
              className="font-sans bg-transparent"
            >
              {recordingsSaving ? "Saving..." : "Save Recordings"}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {recordings.map((rec, index) => (
            <div
              key={rec.id}
              className={`flex items-center gap-3 p-3 border rounded-md ${
                rec.enabled ? "border-border" : "border-border/50 bg-muted/30"
              }`}
            >
              <div className="flex flex-col gap-0.5">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5"
                  onClick={() => moveRecording(rec.id, "up")}
                  disabled={index === 0}
                >
                  <ChevronUp className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5"
                  onClick={() => moveRecording(rec.id, "down")}
                  disabled={index === recordings.length - 1}
                >
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="font-sans text-xs text-muted-foreground">Label</Label>
                  <Input
                    value={rec.label}
                    onChange={(e) => updateRecording(rec.id, "label", e.target.value)}
                    className="font-sans h-8"
                  />
                </div>
                <AudioUploader
                  recording_id={rec.id}
                  current_file={rec.filename}
                  on_upload={(file_url, file_name) => {
                    console.log("[v0] Upload callback triggered. file_url:", file_url, "file_name:", file_name)
                    updateRecording(rec.id, "file_url", file_url)
                    updateRecording(rec.id, "filename", file_name)
                  }}
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive"
                onClick={() => deleteRecording(rec.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <Switch checked={rec.enabled} onCheckedChange={() => toggleRecordingEnabled(rec.id)} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
