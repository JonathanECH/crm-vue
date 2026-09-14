# 🧾 CRM Vue

Aplicación web para gestionar clientes desde una interfaz sencilla y responsive. El proyecto permite consultar, agregar, editar, activar o desactivar y eliminar registros de clientes.

## 🚀 Demo

Prueba la aplicación publicada en Vercel:

👉 [crm-vue-lemon.vercel.app](https://crm-vue-lemon.vercel.app/)

## ✨ Funcionalidades

- 📋 Visualización del listado de clientes.
- ➕ Registro de nuevos clientes mediante formularios con validaciones.
- ✏️ Edición de la información de un cliente.
- 🔄 Cambio rápido entre estados activo e inactivo.
- 🗑️ Eliminación de clientes con confirmación.
- 📱 Interfaz adaptable a dispositivos móviles y escritorio.

## 🛠️ Tecnologías y librerías

### Frontend

- [Vue 3](https://vuejs.org/) con `script setup` para construir la interfaz.
- [Vite](https://vite.dev/) como herramienta de desarrollo y build.
- [Vue Router](https://router.vuejs.org/) para la navegación entre vistas.
- [Tailwind CSS](https://tailwindcss.com/) para los estilos responsive.
- [FormKit](https://formkit.com/) y [@formkit/themes](https://formkit.com/guides/themes) para formularios y validaciones.
- [Axios](https://axios-http.com/) para las peticiones HTTP a la API.

### Calidad y desarrollo

- [ESLint](https://eslint.org/) y `eslint-plugin-vue` para revisar el código.
- [oxlint](https://oxc.rs/docs/guide/usage/linter) como linter adicional.
- [Prettier](https://prettier.io/) para mantener un formato consistente.
- [Vue DevTools](https://devtools.vuejs.org/) para inspeccionar la aplicación durante el desarrollo.
- [pnpm](https://pnpm.io/) como gestor de paquetes.

## 📦 Requisitos

- Node.js `22.18+` o `24.12+`.
- pnpm instalado globalmente.

## ⚙️ Instalación

Clona el repositorio y entra en la carpeta del proyecto:

```bash
git clone <URL_DEL_REPOSITORIO>
cd crm-vue
```

Instala las dependencias:

```bash
pnpm install
```

## 🔌 Configuración de la API

La aplicación utiliza la variable `VITE_API_URL` como URL base de la API. Si no se define, Axios utiliza `http://localhost:4000`.

Crea un archivo `.env` en la raíz del proyecto cuando necesites apuntar a otra API:

```env
VITE_API_URL=http://localhost:4000
```

Para trabajar localmente con los datos incluidos en `db.json`, inicia un servidor compatible con JSON Server en el puerto `4000`:

```bash
pnpm dlx json-server --watch db.json --port 4000
```

## ▶️ Comandos disponibles

Iniciar el servidor de desarrollo con hot reload:

```bash
pnpm dev
```

Crear la versión optimizada para producción:

```bash
pnpm build
```

Previsualizar localmente el build de producción:

```bash
pnpm preview
```

Ejecutar ESLint, oxlint y sus correcciones automáticas:

```bash
pnpm lint
```

Formatear los archivos de `src/`:

```bash
pnpm format
```

## 🗂️ Estructura principal

```text
src/
├── assets/       # Estilos y recursos globales
├── components/   # Componentes reutilizables de la interfaz
├── lib/           # Configuración de Axios
├── router/        # Rutas de la aplicación
├── services/     # Servicios para comunicarse con la API
└── views/         # Vistas de listado, creación y edición
db.json            # Datos locales para desarrollo
```

## 🧭 Rutas principales

| Ruta | Descripción |
| --- | --- |
| `/` | Listado de clientes |
| `/agregar-cliente` | Formulario para agregar un cliente |
| `/editar-cliente/:id` | Formulario para editar un cliente |

## 📄 Licencia

Este proyecto es de uso educativo y puede adaptarse libremente para prácticas de desarrollo con Vue.
