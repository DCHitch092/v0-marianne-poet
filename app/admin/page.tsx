import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AdminDashboard } from "./components/admin-dashboard"

export const dynamic = "force-dynamic"

export default async function AdminPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: contentData } = await supabase.from("site_content").select("id, content, updated_at").order("id")

  const content =
    contentData?.reduce(
      (acc, item) => {
        acc[item.id] = {
          content: item.content as Record<string, string>,
          updated_at: item.updated_at,
        }
        return acc
      },
      {} as Record<string, { content: Record<string, string>; updated_at: string }>,
    ) || {}

  return <AdminDashboard initialContent={content} userEmail={user.email || ""} />
}
