/* eslint-disable no-empty */
/* eslint-disable react-refresh/only-export-components */
import { CssBaseline, ThemeProvider } from "@mui/material";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createAppTheme, type Mode } from "./appTheme";

type Ctx = { mode: Mode; toggle: () => void; set: (m: Mode) => void };
const ThemeModeCtx = createContext<Ctx>({
  mode: "light",
  toggle: () => {},
  set: () => {},
});

export function ModeProvider({ children }: { children: React.ReactNode }) {
  const initial: Mode = (() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "light" || saved === "dark") return saved;
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    } catch {
      return "light";
    }
  })();

  const [mode, setMode] = useState<Mode>(initial);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "dark");
    try {
      localStorage.setItem("theme", mode);
    } catch {}
  }, [mode]);

  const theme = useMemo(() => createAppTheme(mode), [mode]);
  const value = useMemo(
    () => ({
      mode,
      toggle: () => setMode((m) => (m === "dark" ? "light" : "dark")),
      set: setMode,
    }),
    [mode]
  );

  return (
    <ThemeModeCtx.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeCtx.Provider>
  );
}

export const useThemeMode = () => useContext(ThemeModeCtx);
