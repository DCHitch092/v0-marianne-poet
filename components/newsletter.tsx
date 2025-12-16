"use client"

import type React from "react"

import { useState } from "react"

type NewsletterProps = {
  heading?: string
  text?: string
  placeholder?: string
  buttonText?: string
}

export function Newsletter({
  heading = "Intervals",
  text = "Occasional correspondence on writing, reading, and the life between drafts.",
  placeholder = "Your email",
  buttonText = "Subscribe",
}: NewsletterProps) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    // Placeholder for newsletter integration
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setStatus("success")
    setEmail("")
  }

  return (
    <section className="py-12 md:py-16 border-t border-border">
      <div className="flex flex-col items-center text-center">
        <h2 className="text-2xl md:text-3xl font-light text-foreground mb-4">{heading}</h2>
        <p className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-lg mb-8 font-light">{text}</p>

        {status === "success" ? (
          <p className="text-primary font-sans text-sm">Thank you for subscribing.</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              required
              className="flex-1 px-4 py-2 bg-transparent border border-border rounded-sm font-sans text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-6 py-2 bg-primary text-primary-foreground font-sans text-sm rounded-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {status === "loading" ? "..." : buttonText}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
