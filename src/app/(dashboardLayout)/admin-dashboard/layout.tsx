import type { Metadata } from 'next'

import { AdminLayout } from './layout/adminLayout'

export const metadata: Metadata = {
  title: 'Dashboard - Digital DIY Depot',
  description: 'Next Level Digital DIY Depot',
}

export default function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <AdminLayout>{children}</AdminLayout>
    </div>
  )
}
