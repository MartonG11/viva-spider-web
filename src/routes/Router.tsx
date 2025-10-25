import { CircularProgress } from "@mui/material";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateLayout from "../layouts/PrivateLayout";
import PublicLayout from "../layouts/PublicLayout";
import NotFound from "../pages/NotFound";
import { privateRoutes, publicRoutes } from "./config";
import { PrivateGuard, PublicGuard } from "./guards";

export default function AppRouter() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Routes>
        <Route element={<PublicGuard />}>
          <Route element={<PublicLayout />}>
            {publicRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>
        </Route>

        <Route element={<PrivateGuard />}>
          <Route element={<PrivateLayout />}>
            {privateRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
