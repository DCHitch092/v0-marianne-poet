import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

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

    // Upload to Supabase Storage
    const file_extension = file.name.split(".").pop()
    const file_path = `audio/${recording_id}/${Date.now()}.${file_extension}`

    const { data, error } = await supabase.storage.from("audio").upload(file_path, file, {
      upsert: false,
    })

    if (error) {
      console.error("Storage upload error:", error)
      return NextResponse.json({ error: "Upload failed" }, { status: 500 })
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
    return NextResponse.json({ error: error instanceof Error ? error.message : "Upload failed" }, { status: 500 })
  }
}
