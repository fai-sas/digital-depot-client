import 'react-quill/dist/quill.snow.css'
import '@/src/styles/globals.css'
import { Metadata, Viewport } from 'next'
import clsx from 'clsx'

import { Providers } from '../lib/Providers'

import { siteConfig } from '@/src/config/site'
import { fontSans } from '@/src/config/fonts'
import { Navbar } from '@/src/components/navbar'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/public/favicon.ico',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning lang='en'>
      <head />
      <body
        className={clsx(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
          <div className='relative flex flex-col h-screen'>
            <Navbar />
            <main className='container flex-grow px-6 pt-16 mx-auto max-w-7xl'>
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
