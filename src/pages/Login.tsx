/* eslint-disable @typescript-eslint/no-explicit-any */
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Zoom,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useAuth } from "../auth/AuthContext";
import { api } from "../lib/axios";

type FieldErrors = Partial<Record<"email" | "password", string>>;

const schema = yup.object({
  email: yup.string().email("Hibás Email formátum").required("Kötelező mező"),
  password: yup
    .string()
    .min(6, "Legalább 6 karakter")
    .required("Kötelező mező"),
});

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation() as { state?: { from?: Location } };
  const redirectTo = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formErrs, setFormErrs] = useState<FieldErrors>({});
  const [serverErr, setServerErr] = useState<string | null>(null);
  const [shake, setShake] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerErr(null);
    setFormErrs({});
    setSubmitting(true);

    try {
      await schema.validate({ email, password }, { abortEarly: false });
      const { data } = await api.post<{
        token: string;
        user: { id: number | string; email: string };
      }>("/users/login", { email, password });

      login(data.token, data.user);
      navigate(redirectTo, { replace: true });
    } catch (err: unknown) {
      setShake(true);
      setTimeout(() => setShake(false), 600);

      if (err instanceof yup.ValidationError) {
        const fe: FieldErrors = {};
        err.inner.forEach((e) => {
          if (e.path) fe[e.path as keyof FieldErrors] = e.message;
        });
        setFormErrs(fe);
      } else if (axios.isAxiosError(err)) {
        const msg =
          (err.response?.data as any)?.message ||
          (err.response?.data as any)?.error ||
          err.message ||
          "Login failed";
        setServerErr(msg);
      } else if (err instanceof Error) setServerErr(err.message);
      else setServerErr("Login failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-10 grid place-items-center overflow-hidden px-4">
      <Zoom in>
        <div className="w-full max-w-md">
          <Paper
            elevation={0}
            className={`surface p-6 sm:p-8 transition-all duration-500 ${
              shake ? "animate-shake" : ""
            }`}
          >
            {serverErr && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {serverErr}
              </Alert>
            )}

            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-5"
            >
              <TextField
                fullWidth
                label="Email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!formErrs.email}
                helperText={formErrs.email}
                sx={(theme) => ({
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    "&.Mui-focused fieldset": {
                      borderColor:
                        theme.palette.mode === "dark"
                          ? "rgb(110 231 183)"
                          : "rgb(16 185 129)",
                    },
                  },
                })}
              />

              <TextField
                fullWidth
                label="Jelszó"
                type={showPw ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!formErrs.password}
                helperText={formErrs.password}
                sx={(theme) => ({
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    "&.Mui-focused fieldset": {
                      borderColor:
                        theme.palette.mode === "dark"
                          ? "rgb(110 231 183)"
                          : "rgb(16 185 129)",
                    },
                  },
                })}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        aria-label={showPw ? "Hide password" : "Show password"}
                        onClick={() => setShowPw((s) => !s)}
                      >
                        {showPw ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={submitting}
                sx={{
                  borderRadius: "12px",
                  py: 1.4,
                  textTransform: "none",
                  fontSize: "15px",
                  fontWeight: 600,
                  background:
                    "linear-gradient(135deg, rgb(16 185 129), rgb(5 150 105))",
                  ":hover": {
                    background:
                      "linear-gradient(135deg, rgb(5 150 105), rgb(4 120 87))",
                  },
                }}
              >
                {submitting ? "Bejelentkezés…" : "Bejelentkezés"}
              </Button>
            </form>
          </Paper>
        </div>
      </Zoom>
    </div>
  );
}
