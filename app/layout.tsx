import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import './globals.css'
import React from 'react'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme-provider'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import { Toaster } from '@/components/ui/sonner'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})

export const metadata: Metadata = {
  title: '5999Cargo | Employeer Portal',
  description: 'The all-in-one employeer portal of 5999Cargo Group©',
  icons: {
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
        'h-full w-full bg-background text-foreground font-sans antialiased overflow-x-hidden',
        fontSans.variable
      )}
      >
        <SessionProvider
          session={session}
        >
          <ThemeProvider
            attribute='class'
            defaultTheme='light'
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <div className='md:p-6 p-0 pt-20 mx-auto w-full h-full md:pt-20 overflow-y-auto scrollbar-hide'>
              <Toaster />
              {children}
            </div>
          </ThemeProvider>
        </SessionProvider>
        <Footer />
      </body>
    </html>
  )
}
