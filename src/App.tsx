import {
  AppBar,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

export default function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ gap: 2 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            viva-spider
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Container>
    </>
  );
}
