import { Alert, CircularProgress, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/axios";

export default function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["health"],
    queryFn: async () => {
      const res = await api.get("/health");
      return res.data as { status: string };
    },
  });

  if (isLoading) return <CircularProgress />;
  if (error) return <Alert severity="error">{(error as Error).message}</Alert>;

  return (
    <Stack gap={2}>
      <Typography variant="h5">Home</Typography>
      <Alert severity={data?.status === "ok" ? "success" : "warning"}>
        API status: {data?.status}
      </Alert>
    </Stack>
  );
}
