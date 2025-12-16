import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "100mb",
    },
    maxDuration: 300, // Added maxDuration config
  },
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Check authentication
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const form_data = await request.formData()
    const file = form_data.get("file") as File
    const recording_id = form_data.get("recording_id") as string

    if (!file || !recording_id) {
      return NextResponse.json({ error: "Missing file or recording_id" }, { status: 400 })
    }

    const MAX_FILE_SIZE = 100 * 1024 * 1024 // 100MB
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File too large (max 100MB)" }, { status: 400 })
    }

    const buffer = await file.arrayBuffer()

    const file_extension = file.name.split(".").pop()
    const file_path = `audio/${recording_id}/${Date.now()}.${file_extension}`

    const { data, error } = await supabase.storage.from("audio").upload(file_path, buffer, {
      upsert: false,
      contentType: file.type,
    })

    if (error) {
      console.error("Storage upload error:", error)
      return NextResponse.json({ error: error.message || "Upload failed" }, { status: 500 })
    }

    // Get public URL
    const { data: public_data } = supabase.storage.from("audio").getPublicUrl(file_path)

    return NextResponse.json({
      file_url: public_data.publicUrl,
      file_path: file_path,
      file_name: file.name,
    })
  } catch (error) {
    console.error("Upload error:", error)
    const errorMessage = error instanceof Error ? error.message : "Upload failed"
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
