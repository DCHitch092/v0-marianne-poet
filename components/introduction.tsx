type IntroductionProps = {
  text?: string
}

export function Introduction({
  text = "Marianne MacRae writes poetry that explores landscape, memory, and the quiet spaces between words. Based in Scotland, her work draws from the natural world and the stories held within it.",
}: IntroductionProps) {
  return (
    <section className="py-16 md:py-24">
      <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-foreground text-center font-light max-w-3xl mx-auto text-balance">
        {text}
      </p>
    </section>
  )
}
