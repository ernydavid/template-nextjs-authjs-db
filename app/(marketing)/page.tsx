import { Hero } from '@/components/marketing/hero'
import { Cards } from '@/components/marketing/hero-cards'
import { HeroFooter } from '@/components/marketing/hero-footer'

export default async function Home () {
  return (
    <main className='w-full max-w-7xl pb-10 flex flex-col gap-4 mx-auto px-3'>
      <Hero />
      <div className='py-16' />
      <Cards />
      <HeroFooter />
    </main>
  )
}
