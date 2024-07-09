'use client'

import { forwardRef } from 'react'
import HTMLFlipBook from 'react-pageflip'

const items = ['/news/magazine/portada.png', '/news/magazine/page-1.png', 'page 3', 'page 4']

const Pages = forwardRef(function Page ({ src, index }: {
  src: string
  index: number
}, ref: any) {
  return (
    <div
      className='demoPage'
      ref={ref}
    >
      <img
        className='w-full h-full object-cover'
        src={src}
        alt={`image page ${index + 1}`}
      />
    </div>
  )
})

export default function MagazinePage (props: any) {
  return (
    <div className='w-full h-full md:py-6'>
      <div className='w-full flex justify-center'>
        <HTMLFlipBook
          width={350}
          height={500}
          minHeight={400}
          minWidth={300}
          size='fixed'
          showPageCorners
          useMouseEvents
          autoSize
          mobileScrollSupport
          maxHeight={500}
          flippingTime={1000}
          usePortrait
          maxShadowOpacity={0.5}
          className='demo-book'
          style={{
            accentColor: '#082c50'
          }}
          {...props}
        >
          {items.map((item, index) => (
            <Pages
              key={index}
              src={item}
              index={index}
            />
          ))}
        </HTMLFlipBook>
      </div>
    </div>
  )
}
