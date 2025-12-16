"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Check, X } from "lucide-react"

type AudioUploaderProps = {
  recording_id: string
  current_file?: string
  on_upload: (file_url: string, file_name: string) => void
}

export function AudioUploader({ recording_id, current_file, on_upload }: AudioUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handle_upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("audio/")) {
      setError("Please select an audio file")
      return
    }

    setUploading(true)
    setError(null)
    setSuccess(false)

    try {
      const form_data = new FormData()
      form_data.append("file", file)
      form_data.append("recording_id", recording_id)

      const response = await fetch("/api/upload-audio", {
        method: "POST",
        body: form_data,
      })

      if (!response.ok) {
        const error_data = await response.json()
        throw new Error(error_data.error || "Upload failed")
      }

      const data = await response.json()
      on_upload(data.file_url, file.name)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      <Label className="font-sans text-xs text-muted-foreground">Audio File</Label>
      <div className="flex items-center gap-2">
        <Input
          type="file"
          accept="audio/*"
          onChange={handle_upload}
          disabled={uploading}
          className="font-sans h-8 text-xs"
        />
        <Button variant="outline" size="sm" disabled={uploading} className="font-sans bg-transparent">
          {uploading && <Loader2 className="h-3 w-3 mr-1 animate-spin" />}
          {success && <Check className="h-3 w-3 mr-1 text-green-600" />}
          {uploading ? "Uploading..." : success ? "Uploaded" : "Upload"}
        </Button>
      </div>
      {current_file && <p className="text-xs text-muted-foreground">Current: {current_file}</p>}
      {error && (
        <p className="text-xs text-destructive flex items-center gap-1">
          <X className="h-3 w-3" /> {error}
        </p>
      )}
    </div>
  )
}
