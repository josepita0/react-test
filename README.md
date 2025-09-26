## React Test — LOTR Personajes

Prueba para gestionar personajes de LOTR (The One API) con arquitectura por dominios (screaming architecture).

### Stack

- React 18 (CRA) + TypeScript
- Zustand (auth + overlays locales persistidos en localStorage)
- React Query (cache/queries)
- Axios (cliente con interceptor Authorization)
- Tailwind CSS 3 + UI tipo shadcn (Radix Select/Dialog/Button/etc.)
- React Router (ProtectedRoute y PublicOnlyRoute)

### Funcionalidades

- Login local (email) persistido y protección de rutas
- Listado de personajes con filtros: Nombre, Raza, Género y Estatus
- Valores “Todos” en Raza/Género; Estatus por defecto “Activo”
- Crear y editar personajes locales (overlay) y ocultar/mostrar (Activo/Inactivo)
- Tabla con header sticky, scroll interno, paginación y Select de tamaño
- Estados vacíos y de carga dentro de la tabla (“Sin información” / “Cargando…”)
- Sidebar/Topbar estilizados; sidebar colapsable con botones iconificados

### Estructura (resumen)

```
src/
  app/        # providers y rutas (ProtectedRoute, PublicOnlyRoute)
  auth/       # store de autenticación
  core/       # http (axiosClient)
  characters/ # api, store local (overlay), componentes y tipos
  pages/      # Login, Characters
  shared/     # ui atómica (button, input, select, dialog, table, etc.)
  App.tsx, index.tsx, main.css
```

### Variables de entorno

- REACT_APP_ONE_API_TOKEN

### Scripts

- pnpm install — instala dependencias
- pnpm start — arranca en desarrollo
- pnpm build — build de producción
