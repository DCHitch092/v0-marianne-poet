"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { ChevronUp, ChevronDown } from "lucide-react"
import type { ContentData } from "../admin-dashboard"

type NavItem = {
  id: string
  label: string
  href: string
  enabled: boolean
  order: number
}

type NavigationEditorProps = {
  content: ContentData
  updateContent: (sectionId: string, content: Record<string, any>) => void
  saveSection: (sectionId: string) => Promise<boolean>
}

export function NavigationEditor({ content, updateContent, saveSection }: NavigationEditorProps) {
  const [saving, setSaving] = useState(false)

  const navContent = content.nav_items?.content || { items: [] }
  const items: NavItem[] = (navContent.items || []).sort((a: NavItem, b: NavItem) => a.order - b.order)

  const handleSave = async () => {
    setSaving(true)
    await saveSection("nav_items")
    setSaving(false)
  }

  const toggleEnabled = (itemId: string) => {
    const updatedItems = items.map((item) => (item.id === itemId ? { ...item, enabled: !item.enabled } : item))
    updateContent("nav_items", { items: updatedItems })
  }

  const moveItem = (itemId: string, direction: "up" | "down") => {
    const index = items.findIndex((item) => item.id === itemId)
    if (index === -1) return
    if (direction === "up" && index === 0) return
    if (direction === "down" && index === items.length - 1) return

    const newItems = [...items]
    const swapIndex = direction === "up" ? index - 1 : index + 1

    // Swap order values
    const tempOrder = newItems[index].order
    newItems[index] = { ...newItems[index], order: newItems[swapIndex].order }
    newItems[swapIndex] = { ...newItems[swapIndex], order: tempOrder }

    // Sort by order
    newItems.sort((a, b) => a.order - b.order)

    updateContent("nav_items", { items: newItems })
  }

  return (
    <div className="space-y-6">
      <Card className="border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg font-serif font-light">Navigation Items</CardTitle>
            <p className="text-sm text-muted-foreground font-sans mt-1">
              Enable or disable pages in the main navigation. Reorder using the arrows.
            </p>
          </div>
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
        <CardContent>
          <div className="space-y-2">
            {items.map((item, index) => (
              <div
                key={item.id}
                className={`flex items-center justify-between p-3 rounded-md border ${
                  item.enabled ? "border-border bg-background" : "border-border/50 bg-muted/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex flex-col gap-0.5">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5"
                      onClick={() => moveItem(item.id, "up")}
                      disabled={index === 0}
                    >
                      <ChevronUp className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5"
                      onClick={() => moveItem(item.id, "down")}
                      disabled={index === items.length - 1}
                    >
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </div>
                  <div>
                    <p className={`font-sans font-medium ${!item.enabled && "text-muted-foreground"}`}>{item.label}</p>
                    <p className="font-sans text-xs text-muted-foreground">{item.href}</p>
                  </div>
                </div>
                <Switch checked={item.enabled} onCheckedChange={() => toggleEnabled(item.id)} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
