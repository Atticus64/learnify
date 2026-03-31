"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

/**
 * useAuthGate
 *
 * Devuelve una función `requireAuth` que envuelve cualquier acción.
 * - Si el usuario está autenticado → ejecuta la acción normalmente.
 * - Si no está autenticado → lo manda a /login guardando la página actual
 *   en el query param `redirect` para regresar después del login.
 *
 * Uso:
 *   const { requireAuth, isSignedIn } = useAuthGate();
 *   <button onClick={() => requireAuth(() => handleLike())}>❤️ Like</button>
 */
export function useAuthGate() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  const requireAuth = useCallback((action) => {
    if (!isLoaded) return;

    if (isSignedIn) {
      // Usuario autenticado → ejecutar acción directamente
      action?.();
    } else {
      // No autenticado → guardar ruta actual y mandar a login
      const currentPath = window.location.pathname + window.location.search;
      router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
    }
  }, [isSignedIn, isLoaded, router]);

  return { requireAuth, isSignedIn: !!isSignedIn, isLoaded };
}