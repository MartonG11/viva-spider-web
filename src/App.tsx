import AppRouter from "./routes/Router";
import ModeToggle from "./theme/ModeToggle";

export default function App() {
  return (
    <div className="app-bg min-h-screen">
      <ModeToggle />
      <AppRouter />
    </div>
  );
}
