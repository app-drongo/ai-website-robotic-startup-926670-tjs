import Hero from '@/components/sections/home/Hero'
import Features from '@/components/sections/home/Features'
import CallToAction from '@/components/sections/home/CallToAction'

export default function HomePage() {
  return (
    <>
      <section id="hero">
        <Hero />
      </section>
      <section id="features">
        <Features />
      </section>
      <section id="cta">
        <CallToAction />
      </section>
    </>
  )
}