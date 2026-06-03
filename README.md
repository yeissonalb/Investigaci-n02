# Investigación 2 - JWT Auth (Frontend)

Frontend React + Vite con autenticación JWT contra el API backend.

## Repositorios

- **Frontend:** https://github.com/yeissonalb/Investigaci-n02.git
- **Backend:** https://github.com/yeissonalb/Investigaci-n002Backend.git

## Despliegue

| Entorno | URL |
|---------|-----|
| Frontend desplegado | _Pendiente: agregar URL de Netlify/Vercel_ |
| API desplegada | _Pendiente: agregar URL del backend_ |

## Desarrollo local

1. Copiar variables de entorno:

```bash
cp .env.example .env
```

2. Instalar dependencias:

```bash
npm install
```

3. Iniciar frontend (puerto 5173):

```bash
npm run dev
```

4. Asegúrate de que el backend esté corriendo en `http://localhost:5219`.

## Build de producción

```bash
npm run build
npm run preview
```

## Credenciales de prueba

- Email: `admin`
- Password: `1234`

## Flujo implementado

- Login vía POST `/api/auth/login`
- Token JWT guardado en `localStorage`
- Header `Authorization: Bearer <token>` en peticiones protegidas
- Rol `admin` leído desde el JWT decodificado
- Ruta `/users` protegida (solo admin)
- Persistencia de sesión al recargar la página
