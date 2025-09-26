import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";

export function RouterProvider({ children }: { children: ReactNode }) {
  return <BrowserRouter>{children}</BrowserRouter>;
}
