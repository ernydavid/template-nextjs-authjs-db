import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import './globals.css'
import React from 'react'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme-provider'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import { Toaster } from '@/components/ui/sonner'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})

export const metadata: Metadata = {
  title: 'NextJs Template with AuthJs and DB',
  description: 'Template with authJS and Vercel DB',
  icons: {
    // add favicon here
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        href: '/icon-light.svg',
        url: '/icon-light.svg'
      },
      {
        media: '(prefers-color-scheme: dark)',
        href: '/icon-dark.svg',
        url: '/icon-dark.svg'
      }
    ]
  }
}

export default async function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  return (
    <html
      lang='en'
      suppressHydrationWarning
    >
      <body className={cn(
        'h-full w-full bg-background font-sans antialiased',
        fontSans.variable
      )}
      >
        <SessionProvider
          session={session}
        >
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
          >
            <div className='w-full h-full'>
              <Toaster />
              {children}
            </div>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
