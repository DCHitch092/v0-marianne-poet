import { getAllContent } from "@/lib/content"
import { Hero } from "@/components/hero"
import { Introduction } from "@/components/introduction"
import { Navigation } from "@/components/navigation"
import { CurrentWork } from "@/components/current-work"
import { ReadInvitation } from "@/components/read-invitation"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"

export const revalidate = false // Only revalidate when triggered manually

export default async function HomePage() {
  const content = await getAllContent()

  return (
    <main className="min-h-screen">
      {/* Hero is now full-width */}
      <Hero tagline={content.hero?.tagline} />

      {/* Content sections have their own max-width */}
      <div className="px-6 md:px-8">
        <div className="max-w-2xl mx-auto">
          <Introduction text={content.introduction?.text} />
          <Navigation />
          <CurrentWork
            title={content.current_work?.title}
            description={content.current_work?.description}
            linkText={content.current_work?.link_text}
            linkUrl={content.current_work?.link_url}
          />
          <ReadInvitation
            text={content.read_invitation?.text}
            linkText={content.read_invitation?.link_text}
            linkUrl={content.read_invitation?.link_url}
          />
          <Newsletter
            heading={content.newsletter?.heading}
            text={content.newsletter?.text}
            placeholder={content.newsletter?.placeholder}
            buttonText={content.newsletter?.button_text}
          />
          <Footer />
        </div>
      </div>
    </main>
  )
}
