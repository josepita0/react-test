import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../auth/store/auth.store";
import { ReactNode } from "react";

export function PublicOnlyRoute({ children }: { children: ReactNode }) {
  const isAuthed = useAuthStore((s) => Boolean(s.token));
  if (isAuthed) return <Navigate to="/characters" replace />;
  return <>{children}</>;
}
