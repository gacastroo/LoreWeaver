# LoreWeaver

> **Descripción:**
> LoreWeaver, consiste en una aplicación web dirigida a quienes quieren crear una historia: escritores, guionistas, creadores de contenido narrativo. La idea es proporcionar una herramienta que permita desarrollar historias de forma interactiva. La aplicación permitirá a los usuarios crear y gestionar fichas de personajes, eventos, universos, capítulos, escenas y relaciones entre ellos. A través de un sistema visual, se podrán visualizar las conexiones narrativas, ayudando a detectar incoherencias y ayudando a mantener la cohesión de la historia.

## Aspectos tecnologicos

| **Tecnología**                | **Descripción**                                                                 |
|-------------------------------|---------------------------------------------------------------------------------|
| **Frontend**                   |                                                                                 |
| React + Vite + Tailwind CSS    | Para realizar la interfaz de usuario.                                           |
| Axios                          | Para llamadas API (peticiones HTTP, para las conexiones entre backend y frontend). |
| Despliegue en Vercel           | Para el despliegue de la aplicación frontend.                                   |
| **Backend**                    |                                                                                 |
| Node.js + Express + Prisma     | Lógica del servidor, gestión de rutas y conexión con la base de datos.          |
| Bcrypt + JWT                   | Autenticación.                                                                  |
| Conexión con MySQL (Railway)   | Base de datos en MySQL usando Railway.                                           |
| Dotenv                         | Para la gestión de variables de entorno y seguridad.                            |
| Despliegue en Railway          | Para el despliegue del backend.                                                 |
| **Extras**                     |                                                                                 |
| Editor de texto (Quill/TipTap) | Para crear un editor de texto interactivo.                                       |
| Mapa de relaciones (Cytoscape.js) | Para crear un mapa de relaciones básico.                                      |
| Testing (Jest)                 | Para pruebas unitarias y de integración.                                        |

## Guia de Instalación

## 📦 Manual de Instalación

### ✅ 1. Requisitos Previos

#### 🖥️ Frontend (React)
- Node.js **v14 o superior**
- npm o yarn

#### 🔧 Backend (Node.js + Prisma)
- Node.js **v14 o superior**
- Prisma
- Base de datos configurada mediante `.env`

---

### 2. Procedimiento de Instalación

####  Clonar el repositorio

```bash
git clone https://github.com/gacastroo/LoreWeaver.git
```

---

#### 🔌 Backend (Express + Prisma)

```bash
cd LoreWeaver/backend

# Instalar dependencias
npm install

# Generar el cliente de Prisma
npx prisma generate
```

#### 🌐 Frontend (React + Vite)

```bash
cd ../frontend

# Instalar dependencias
npm install

# Iniciar la aplicación
npm run dev
```

### 💻 Accede a la aplicación

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend**: [http://localhost:3000](http://localhost:3000)

---

## 🌍 Sin Instalación Local (Producción)

Puedes acceder directamente sin instalar nada desde:

🔗 **[https://lore-weaver-1zpq.vercel.app](https://lore-weaver-1zpq.vercel.app)**

---

## 📁 Estructura del Proyecto

```
LoreWeaver/
├── backend/      # API REST con Express, Prisma y autenticación JWT
├── frontend/     # Interfaz React con Vite y rutas protegidas
└── README.md     # Este archivo
```

---

## 🧠 Características Clave

- 🧩 Gestión modular de historias, personajes, universos, capítulos y escenas
- ✨ Generador de nombres y de ideas con IA
- 🗺️ Mapa visual de relaciones narrativas con Cytoscape.js
- 🔐 Autenticación con JWT y recuperación de contraseña por email
- 📦 Backend Express con Prisma + MySQL
- ⚛️ Frontend React + Vite + Tailwind

---

## Autor

Guillermo Andrés Castro Abarca

## Bibliografía

ChatGPT. (2025). Asistencia generada por inteligencia artificial para el desarrollo de aplicaciones web fullstack. OpenAI. https://chat.openai.com

Express.js. (s.f.). Express – Node.js web application framework. https://expressjs.com

Prisma. (s.f.). Next-generation ORM for Node.js and TypeScript. https://www.prisma.io/docs

React. (s.f.). A JavaScript library for building user interfaces. Meta. https://reactjs.org

Tailwind CSS. (s.f.). Utility-first CSS framework. https://tailwindcss.com/docs

Tiptap. (s.f.). The headless editor framework for web applications. https://tiptap.dev

Cytoscape.js. (s.f.). Graph theory library for visualization and analysis. https://js.cytoscape.org

MySQL. (s.f.). MySQL Reference Manual. Oracle. https://dev.mysql.com/doc

Vite. (s.f.). Vite documentation. https://vitejs.dev

Axios. (s.f.). Axios – HTTP client for the browser and Node.js. https://axios-http.com

Auth0. (s.f.). JWT Authentication Explained. https://auth0.com/docs

Traversy Media. (2021). JWT Authentication Tutorial – Node.js. [Video]. YouTube. https://www.youtube.com/watch?v=7Q17ubqLfaM

FreeCodeCamp. (2022). Learn React in 1 Hour. [Video]. YouTube. https://www.youtube.com/watch?v=Ke90Tje7VS0

The Net Ninja. (2021). Tailwind CSS Tutorial for Beginners. [Video]. YouTube. https://www.youtube.com/playlist?list=PL4cUxeGkcC9gGrbtvASEZSlFEYBnPkmff

GitHub Copilot. (s.f.). Your AI pair programmer. GitHub. https://github.com/features/copilot

Figma. (s.f.). Collaborative interface design tool. https://www.figma.com

Scrivener. (s.f.). Powerful tools for authors. Literature and Latte. https://www.literatureandlatte.com/scrivener
