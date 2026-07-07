import { Toaster } from "react-hot-toast";

import RutaPrivada from "@/components/auth/RutaPrivada";
import { AppProvider } from "@/context/AppContext";
import Inicio from "@/layouts/Inicio";

export default function ProtectedLayout() {
  return (
    <RutaPrivada>
      <AppProvider>
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        <Inicio />
      </AppProvider>
    </RutaPrivada>
  );
}
