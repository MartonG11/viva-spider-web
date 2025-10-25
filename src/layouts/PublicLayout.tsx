import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <Container sx={{ py: 4 }}>
      <Outlet />
    </Container>
  );
}
