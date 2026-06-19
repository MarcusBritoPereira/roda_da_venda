"use client"

import * as React from "react"
import { useTheme } from "next-themes"

interface VulpLogoProps {
  className?: string;
  size?: number;
}

export function VulpLogo({ className, size = 32 }: VulpLogoProps) {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Evita erros de hidratação (hydration mismatch)
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div style={{ width: size, height: size }} />
  }

  // Define qual ícone usar com base no tema resolvido
  const isDark = resolvedTheme === "dark"
  const logoSrc = isDark ? "/logo/vulp-branco.png" : "/logo/vulp-roxo.png"

  return (
    <img
      src={logoSrc}
      alt="Vulp Logo"
      width={size}
      height={size}
      className={`${className} object-contain transition-all duration-300`}
    />
  )
}
