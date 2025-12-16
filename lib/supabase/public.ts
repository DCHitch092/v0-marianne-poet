import { createClient } from "@supabase/supabase-js"

let publicClient: ReturnType<typeof createClient> | null = null

export function getPublicClient() {
  if (publicClient) return publicClient

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY

  if (!url || !key) {
    return null
  }

  publicClient = createClient(url, key)
  return publicClient
}
