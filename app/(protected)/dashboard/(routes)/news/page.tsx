import { StoryCard } from '@/components/news/story-card'
import { TopStoryCard } from '@/components/news/top-story-card'

export default function NewsPage () {
  return (
    <div className='w-full h-full flex flex-col items-center justify-center py-3 md:py-0'>
      <div className='w-full h-full grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-6 gap-3'>
        <div className='col-span-1 xl:col-span-2'>
          <TopStoryCard
            title='New hub available!'
            subtitle='Guyana'
            cardImage='/news/guyana-flag.jpg'
          />
        </div>
        <div className='col-span-1 xl:col-span-4'>
          <StoryCard
            title='Explore our'
            subtitle='Magazine'
            cardImage='/news/magazine/portada.png'
            storyLink='/dashboard/news/magazine'
          />
        </div>
      </div>
    </div>
  )
}
