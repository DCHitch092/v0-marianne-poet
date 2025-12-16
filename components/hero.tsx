import Image from "next/image"

type HeroProps = {
  tagline?: string
}

export function Hero({ tagline = "Writer & Poet" }: HeroProps) {
  return (
    <header className="w-full pt-12 md:pt-20 pb-16 md:pb-24 px-6 md:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Two-column layout on larger screens: text + image side by side */}
        <div className="flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-16">
          {/* Title and tagline - expressive but literary */}
          <div className="lg:flex-1 lg:pb-4">
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 md:mb-6">{tagline}</p>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl tracking-tight text-foreground leading-[0.9]">
              <span className="block">Marianne</span>
              <span className="block italic text-primary mt-1">MacRae</span>
            </h1>
          </div>

          {/* Portrait - prominent but contained, editorial feel */}
          <div className="lg:flex-1">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src="/images/hero-portrait.jpg"
                alt="Marianne MacRae gazing upward against a Scottish moorland sky"
                fill
                className="object-cover object-center"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
