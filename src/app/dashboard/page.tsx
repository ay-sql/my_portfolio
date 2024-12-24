'use client'

import { useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import DashboardHeader from '@/components/dashboard/dashboard-header'
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar'
import { DashboardContent } from '@/components/dashboard/dashboard-content'
import { SidebarProvider } from '@/components/ui/sidebar'

export default function DashboardPage() {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/auth')
    },
  })

  const [activeSection, setActiveSection] = useState('hero')

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' })
  }

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-gray-100">
        <DashboardSidebar 
          activeSection={activeSection} 
          setActiveSection={setActiveSection}
          handleLogout={handleLogout}
        />
        <div className="flex flex-col flex-1 overflow-hidden">
          <DashboardHeader />
          <DashboardContent activeSection={activeSection} />
        </div>
      </div>
    </SidebarProvider>
  )
}
