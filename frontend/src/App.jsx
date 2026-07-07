import { lazy, Suspense } from "react";

const LoginRegister = lazy(() => import("./pages/LoginRegister"));
const ResetPassword = lazy(() => import("@/components/ResetPassword"));
const ProtectedRoutes = lazy(() => import("./ProtectedRoutes"));

function RouteLoader() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f7f6f3] text-gray-600">
      Cargando...
    </div>
  );
}

function loadRoute(Component) {
  return (
    <Suspense fallback={<RouteLoader />}>
      <Component />
    </Suspense>
  );
}

export default function App() {
  const path = window.location.pathname;

  if (path === "/" || path === "") {
    return loadRoute(LoginRegister);
  }

  if (path.startsWith("/reset-password/")) {
    return loadRoute(ResetPassword);
  }

  return loadRoute(ProtectedRoutes);
}
