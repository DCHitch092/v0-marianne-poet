"use client"

import type React from "react"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
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

    if (!file.type.startsWith("audio/")) {
      setError("Please select an audio file")
      return
    }

    if (file.size > 100 * 1024 * 1024) {
      setError("File size must be less than 100MB")
      return
    }

    setUploading(true)
    setError(null)
    setSuccess(false)

    try {
      const supabase = createClient()
      const file_name = `${recording_id}_${Date.now()}_${file.name}`

      const { data, error: upload_error } = await supabase.storage.from("audio").upload(file_name, file, {
        upsert: false,
      })

      if (upload_error) {
        throw new Error(upload_error.message)
      }

      const { data: url_data } = supabase.storage.from("audio").getPublicUrl(file_name)

      on_upload(url_data.publicUrl, file.name)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed")
      console.log("[v0] Upload error:", err)
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
