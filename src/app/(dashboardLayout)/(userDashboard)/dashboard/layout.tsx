import type { Metadata } from 'next'

import { UserLayout } from './layout/userLayout'

export const metadata: Metadata = {
  title: 'Dashboard - Digital DIY Depot',
  description: 'Next Level Tech Tips and Tricks',
}

export default function UserDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <UserLayout>{children}</UserLayout>
    </div>
  )
}
