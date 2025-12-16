import { revalidateTag } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { tag } = await request.json()

    if (!tag) {
      return NextResponse.json({ error: "Tag is required" }, { status: 400 })
    }

    revalidateTag(tag, "max")

    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (error) {
    console.error("Revalidation error:", error)
    return NextResponse.json({ error: "Failed to revalidate" }, { status: 500 })
  }
}
