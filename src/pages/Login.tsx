import { useState } from "react";
import { Button } from "../shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../shared/ui/card";
import { Input } from "../shared/ui/input";
import { Label } from "../shared/ui/label";
import { useAuthStore } from "../auth/store/auth.store";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    // Nota: remember es visual por ahora; el store ya persiste en localStorage
    login({ email, token });
    navigate("/characters", { replace: true });
  };

  return (
    <div className="min-h-screen grid place-items-center p-6 bg-gray-100">
      <Card className="w-full max-w-xl shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl">INICIAR SESIÓN</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-5" onSubmit={onSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">NOMBRE DE USUARIO O CORREO</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingrese sus datos de acceso"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">CONTRASEÑA</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={show ? "text" : "password"}
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="Ingrese su contraseña"
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShow((v) => !v)}
                  aria-label={
                    show ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                >
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-indigo-700 hover:bg-indigo-600"
            >
              INICIAR SESIÓN
            </Button>

            <div className="text-center text-[10px] text-gray-500">V 0.0.1</div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
