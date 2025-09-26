import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login";
import CharactersPage from "./pages/Characters";
import { ProtectedRoute } from "./app/routes/ProtectedRoute";
import { PublicOnlyRoute } from "./app/routes/PublicOnlyRoute";

function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicOnlyRoute>
            <LoginPage />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/characters"
        element={
          <ProtectedRoute>
            <CharactersPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/characters" replace />} />
    </Routes>
  );
}

export default App;
