"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ChevronUp, ChevronDown, Plus, Trash2 } from "lucide-react"
import type { ContentData } from "../admin-dashboard"

type Book = {
  id: string
  title: string
  publisher: string
  type: string
  description: string
  description2: string
  link_text: string
  link_url: string
  enabled: boolean
  order: number
}

type BooksEditorProps = {
  content: ContentData
  updateContent: (sectionId: string, content: Record<string, any>) => void
  saveSection: (sectionId: string) => Promise<boolean>
}

export function BooksEditor({ content, updateContent, saveSection }: BooksEditorProps) {
  const [saving, setSaving] = useState(false)
  const [expandedBook, setExpandedBook] = useState<string | null>(null)

  const pageContent = content.books_page?.content || { title: "Books", books: [] }
  const books: Book[] = (pageContent.books || []).sort((a: Book, b: Book) => a.order - b.order)

  const handleSave = async () => {
    setSaving(true)
    await saveSection("books_page")
    setSaving(false)
  }

  const updatePageField = (field: string, value: string) => {
    updateContent("books_page", { ...pageContent, [field]: value })
  }

  const toggleBookEnabled = (bookId: string) => {
    const updated = books.map((book) => (book.id === bookId ? { ...book, enabled: !book.enabled } : book))
    updateContent("books_page", { ...pageContent, books: updated })
  }

  const moveBook = (bookId: string, direction: "up" | "down") => {
    const index = books.findIndex((book) => book.id === bookId)
    if (index === -1) return
    if (direction === "up" && index === 0) return
    if (direction === "down" && index === books.length - 1) return

    const newBooks = [...books]
    const swapIndex = direction === "up" ? index - 1 : index + 1
    const tempOrder = newBooks[index].order
    newBooks[index] = { ...newBooks[index], order: newBooks[swapIndex].order }
    newBooks[swapIndex] = { ...newBooks[swapIndex], order: tempOrder }
    newBooks.sort((a, b) => a.order - b.order)

    updateContent("books_page", { ...pageContent, books: newBooks })
  }

  const updateBook = (bookId: string, field: string, value: string) => {
    const updated = books.map((book) => (book.id === bookId ? { ...book, [field]: value } : book))
    updateContent("books_page", { ...pageContent, books: updated })
  }

  const addBook = () => {
    const newBook: Book = {
      id: `book_${Date.now()}`,
      title: "New Book",
      publisher: "",
      type: "Poetry collection",
      description: "",
      description2: "",
      link_text: "Find the book",
      link_url: "#",
      enabled: true,
      order: books.length + 1,
    }
    updateContent("books_page", { ...pageContent, books: [...books, newBook] })
    setExpandedBook(newBook.id)
  }

  const deleteBook = (bookId: string) => {
    if (!confirm("Are you sure you want to delete this book?")) return
    const updated = books.filter((book) => book.id !== bookId)
    updateContent("books_page", { ...pageContent, books: updated })
  }

  return (
    <div className="space-y-6">
      {/* Page Settings */}
      <Card className="border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-serif font-light">Page Settings</CardTitle>
          <Button
            onClick={handleSave}
            disabled={saving}
            variant="outline"
            size="sm"
            className="font-sans bg-transparent"
          >
            {saving ? "Saving..." : "Save All"}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label className="font-sans text-sm">Page Title</Label>
            <Input
              value={pageContent.title || ""}
              onChange={(e) => updatePageField("title", e.target.value)}
              className="font-sans"
            />
          </div>
        </CardContent>
      </Card>

      {/* Books */}
      <Card className="border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-serif font-light">Books</CardTitle>
          <Button onClick={addBook} variant="outline" size="sm" className="font-sans bg-transparent">
            <Plus className="h-4 w-4 mr-1" /> Add Book
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {books.map((book, index) => (
            <div
              key={book.id}
              className={`border rounded-md ${book.enabled ? "border-border" : "border-border/50 bg-muted/30"}`}
            >
              <div className="flex items-center justify-between p-3">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col gap-0.5">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5"
                      onClick={() => moveBook(book.id, "up")}
                      disabled={index === 0}
                    >
                      <ChevronUp className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5"
                      onClick={() => moveBook(book.id, "down")}
                      disabled={index === books.length - 1}
                    >
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </div>
                  <button
                    onClick={() => setExpandedBook(expandedBook === book.id ? null : book.id)}
                    className="text-left"
                  >
                    <p className={`font-serif font-medium ${!book.enabled && "text-muted-foreground"}`}>{book.title}</p>
                    <p className="font-sans text-xs text-muted-foreground">{book.publisher}</p>
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => deleteBook(book.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Switch checked={book.enabled} onCheckedChange={() => toggleBookEnabled(book.id)} />
                </div>
              </div>

              {expandedBook === book.id && (
                <div className="border-t border-border p-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="font-sans text-sm">Title</Label>
                      <Input
                        value={book.title}
                        onChange={(e) => updateBook(book.id, "title", e.target.value)}
                        className="font-sans"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-sans text-sm">Publisher</Label>
                      <Input
                        value={book.publisher}
                        onChange={(e) => updateBook(book.id, "publisher", e.target.value)}
                        className="font-sans"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-sans text-sm">Type</Label>
                    <Input
                      value={book.type}
                      onChange={(e) => updateBook(book.id, "type", e.target.value)}
                      className="font-sans"
                      placeholder="Poetry collection"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-sans text-sm">Description (Paragraph 1)</Label>
                    <Textarea
                      value={book.description}
                      onChange={(e) => updateBook(book.id, "description", e.target.value)}
                      className="font-serif min-h-24 resize-y"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-sans text-sm">Description (Paragraph 2)</Label>
                    <Textarea
                      value={book.description2}
                      onChange={(e) => updateBook(book.id, "description2", e.target.value)}
                      className="font-serif min-h-20 resize-y"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="font-sans text-sm">Link Text</Label>
                      <Input
                        value={book.link_text}
                        onChange={(e) => updateBook(book.id, "link_text", e.target.value)}
                        className="font-sans"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-sans text-sm">Link URL</Label>
                      <Input
                        value={book.link_url}
                        onChange={(e) => updateBook(book.id, "link_url", e.target.value)}
                        className="font-sans"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
