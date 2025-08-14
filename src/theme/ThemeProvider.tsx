import React, { createContext, useContext, useState, useEffect } from "react"

type ThemeShape = {
  name?: string
  primary?: string
  primary600?: string
  bg?: string
  text?: string
  fontHeading?: string
  fontBody?: string
  radius?: string
}

const DEFAULT_THEME: ThemeShape = {
  name: "light",
  primary: "#614B90",
  primary600: "#4b3a75",
  bg: "#ffffff",
  text: "#0f172a",
  fontHeading: `"Playfair Display", serif`,
  fontBody: `"Inter", sans-serif`,
  radius: "0.5rem",
}

const ThemeContext = createContext({
  theme: DEFAULT_THEME,
  setTheme: (_: Partial<ThemeShape>) => {},
  toggleDark: () => {},
})

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<ThemeShape>(() => {
    const raw = localStorage.getItem("theme")
    return raw ? JSON.parse(raw) : DEFAULT_THEME
  })

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty("--color-primary", theme.primary!)
    root.style.setProperty("--color-primary-600", theme.primary600!)
    root.style.setProperty("--bg", theme.bg!)
    root.style.setProperty("--text", theme.text!)
    root.style.setProperty("--font-heading", theme.fontHeading!)
    root.style.setProperty("--font-body", theme.fontBody!)
    root.style.setProperty("--radius", theme.radius!)
    if (theme.name === "dark") {
      root.setAttribute("data-theme", "dark")
    } else {
      root.removeAttribute("data-theme")
    }
    localStorage.setItem("theme", JSON.stringify(theme))
  }, [theme])

  function setTheme(values: Partial<ThemeShape>) {
    setThemeState((prev) => ({ ...prev, ...values }))
  }

  function toggleDark() {
    setTheme({ name: theme.name === "dark" ? "light" : "dark" })
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleDark }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
