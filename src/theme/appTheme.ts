import { createTheme } from "@mui/material/styles";

export type Mode = "light" | "dark";

export function createAppTheme(mode: Mode) {
  return createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            background: { default: "#f5f5f7", paper: "#ffffff" },
            primary: { main: "#0f0f10" },
          }
        : {
            background: { default: "#000000", paper: "rgba(255,255,255,0.04)" },
            primary: { main: "#ffffff" },
          }),
    },
    shape: { borderRadius: 12 },
    typography: {
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        "SF Pro Text",
        "SF Pro Display",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "system-ui",
        "sans-serif",
      ].join(","),
    },
  });
}
