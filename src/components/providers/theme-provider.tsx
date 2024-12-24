"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Use mounted to prevent hydration mismatch
  if (!mounted) {
    return null
  }

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      value={{
        light: "light",
        dark: "dark",
        system: "system"
      }}
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  )
}
