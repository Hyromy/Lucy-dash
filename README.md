# Lucy Dash

Dashboard de administración para [Lucy](https://github.com/Hyromy/Lucy)

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?logo=vite)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript)
![Docker](https://img.shields.io/badge/Docker-Container-blue?logo=docker)

## Índice
- [Lucy Dash](#lucy-dash)
  - [Índice](#índice)
  - [Estructura del proyecto](#estructura-del-proyecto)
  - [Variables de entrono](#variables-de-entrono)
  - [Despliegue](#despliegue)
    - [Local](#local)
    - [Docker](#docker)

## Estructura del proyecto

Se posee una estructura típica de un proyecto React + TypeScript + Vite

```sh
public/            # contenido público

src/               # proyecto
├── assets/        # recursos estáticos
├── components/    # componentes
├── context/       # contextos
├── hooks/         # hooks
├── pages/         # vistas
├── services/      # servicios
│
├── App.tsx        # aplicación
└── main.tsx       # punto de entrada

package.json       # dependencias
```

## Variables de entrono

Es necesario configurar `VITE_DISCORD_CLIENT_ID` con el id de la aplicación de discord que se vaya a usar para el dashboard.

Obten tu id de cliente en [Discord developer portal](https://discord.com/developers/applications) en la sección OAuth2.

Adicionalmente es necesario que el backend que se vaya a emplear tenga configurado el __Client Secret__ para el correcto funcionamiento del dashboard.

El resto de variables de entorno tienen valores por defecto.

| Clave | Valor por defecto | Descripción |
| - | - | - |
| `VITE_DISCORD_CLIENT_ID` | `undefined` | Id de cliente de aplicación de discord |
| `VITE_DISCORD_REDIRECT_URI` | `"auth/callback"` | Endpoint de redirección para oauth2 |
| `VITE_API_URL` | `"http://localhost:8000"` | Api rest para intercambio de tokens |

## Despliegue

### Local

1. Dependencias
   
   Instala las [dependencias](./package.json).
   ```sh
   npm i
   ```

2. Ejecución
   
   Ejecuta le proyecto.
   ```sh
   npm run dev
   ```

---

### Docker

Puedes construir una imagen y contenedor con el [Dockerfile](./Dockerfile).
```sh
docker build -t app_image .

docker run --name app_container -e 'VITE_DISCORD_CLIENT_ID=your_id_here' -p 5173:5173 app_image
```
