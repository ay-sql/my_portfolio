'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import type { ComponentPropsWithoutRef } from 'react'

type SidebarProps = ComponentPropsWithoutRef<'div'>;
type SidebarHeaderProps = ComponentPropsWithoutRef<'div'>;
type SidebarContentProps = ComponentPropsWithoutRef<'div'>;
type SidebarFooterProps = ComponentPropsWithoutRef<'div'>;
type SidebarMenuProps = ComponentPropsWithoutRef<'nav'>;
type SidebarMenuItemProps = ComponentPropsWithoutRef<'div'>;
type SidebarMenuButtonProps = ComponentPropsWithoutRef<'button'> & {
  isActive?: boolean
};
type SidebarGroupProps = ComponentPropsWithoutRef<'div'>;
type SidebarGroupContentProps = ComponentPropsWithoutRef<'div'>;
type SidebarInsetProps = ComponentPropsWithoutRef<'div'>;

type SidebarContextType = {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

const SidebarContext = React.createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [collapsed, setCollapsed] = React.useState(false)
  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}

export function Sidebar({ className, ...props }: SidebarProps) {
  return (
    <div
      className={cn('flex h-screen w-64 flex-col border-r bg-background', className)}
      {...props}
    />
  )
}

export function SidebarHeader({ className, ...props }: SidebarHeaderProps) {
  return <div className={cn('', className)} {...props} />
}

export function SidebarContent({ className, ...props }: SidebarContentProps) {
  return <div className={cn('flex-1 overflow-auto', className)} {...props} />
}

export function SidebarFooter({ className, ...props }: SidebarFooterProps) {
  return <div className={cn('', className)} {...props} />
}

export function SidebarMenu({ className, ...props }: SidebarMenuProps) {
  return <nav className={cn('space-y-1', className)} {...props} />
}

export function SidebarMenuItem({ className, ...props }: SidebarMenuItemProps) {
  return <div className={cn('px-3', className)} {...props} />
}

export function SidebarMenuButton({
  className,
  isActive,
  ...props
}: SidebarMenuButtonProps) {
  return (
    <button
      className={cn(
        'flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium',
        {
          'bg-muted text-foreground': isActive,
          'text-muted-foreground hover:bg-muted hover:text-foreground': !isActive,
        },
        className
      )}
      {...props}
    />
  )
}

export function SidebarGroup({ className, ...props }: SidebarGroupProps) {
  return <div className={cn('', className)} {...props} />
}

export function SidebarGroupContent({ className, ...props }: SidebarGroupContentProps) {
  return <div className={cn('space-y-1 p-2', className)} {...props} />
}

export function SidebarInset({ className, ...props }: SidebarInsetProps) {
  return (
    <div
      className={cn(
        'absolute inset-x-0 bottom-0 border-t bg-background px-3 py-3',
        className
      )}
      {...props}
    />
  )
}
