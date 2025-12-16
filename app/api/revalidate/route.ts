import { revalidatePath } from "next/cache"
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

    const { paths } = await request.json()

    if (!paths || !Array.isArray(paths)) {
      return NextResponse.json({ error: "Paths array is required" }, { status: 400 })
    }

    paths.forEach((path: string) => {
      revalidatePath(path)
    })

    return NextResponse.json({ revalidated: true, paths, now: Date.now() })
  } catch (error) {
    console.error("Revalidation error:", error)
    return NextResponse.json({ error: "Failed to revalidate" }, { status: 500 })
  }
}
