import { useEffect, useState } from "react";

export const THEME_STORAGE_KEY = "sokodigital-theme";

export type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

/**
 * Shared dark/light theme hook.
 * The actual class toggle on <html> happens instantly here and is
 * mirrored to localStorage so the choice persists across page loads
 * and route changes. A blocking boot script in __root.tsx applies the
 * stored preference (or system preference) before paint to avoid any
 * flash of the wrong theme.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // ignore write errors (e.g. private browsing)
    }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return { theme, setTheme, toggleTheme, isDark: theme === "dark" };
}
