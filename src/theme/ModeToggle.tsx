import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { IconButton, Tooltip } from "@mui/material";
import { useThemeMode } from "./ModeProvider";

export default function ModeToggle() {
  const { mode, toggle } = useThemeMode();
  return (
    <Tooltip title={mode === "dark" ? "Light mode" : "Dark mode"}>
      <IconButton
        onClick={toggle}
        sx={{
          position: "fixed",
          top: 16,
          right: 16,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
          backdropFilter: "blur(8px)",
          zIndex: 50,
        }}
      >
        {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  );
}
