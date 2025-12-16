"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type Field = {
  key: string
  label: string
  type: "text" | "textarea"
}

type ContentEditorProps = {
  sectionId: string
  title: string
  fields: Field[]
  content: Record<string, string>
  onContentChange: (sectionId: string, fieldKey: string, value: string) => void
  onSave: () => void
  isSaving: boolean
}

export function ContentEditor({
  sectionId,
  title,
  fields,
  content,
  onContentChange,
  onSave,
  isSaving,
}: ContentEditorProps) {
  return (
    <Card className="border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-serif font-light">{title}</CardTitle>
        <Button onClick={onSave} disabled={isSaving} variant="outline" size="sm" className="font-sans bg-transparent">
          {isSaving ? "Saving..." : "Save"}
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {fields.map((field) => (
          <div key={field.key} className="space-y-2">
            <Label htmlFor={`${sectionId}-${field.key}`} className="font-sans text-sm">
              {field.label}
            </Label>
            {field.type === "textarea" ? (
              <Textarea
                id={`${sectionId}-${field.key}`}
                value={content[field.key] || ""}
                onChange={(e) => onContentChange(sectionId, field.key, e.target.value)}
                className="font-serif min-h-32 resize-y"
              />
            ) : (
              <Input
                id={`${sectionId}-${field.key}`}
                value={content[field.key] || ""}
                onChange={(e) => onContentChange(sectionId, field.key, e.target.value)}
                className="font-sans"
              />
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
