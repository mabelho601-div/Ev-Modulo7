# Sistema de Gestion de Catalogo - Editorial Nova (BookList SPA)

Aplicación Web de Página Única (Single Page Application) desarrollada con Vue 3 para la administración interna del catálogo de libros de Editorial Nova. El sistema permite gestionar de manera reactiva el catálogo de publicaciones, autores, métricas del panel y filtrado por categorías.

---

## Tabla de Contenido

1. [Características del Proyecto](#caracteristicas-del-proyecto)
2. [Stack Tecnológico](#stack-tecnologico)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Requisitos Previos](#requisitos-previos)
5. [Instalación y Configuración](#instalacion-y-configuracion)
6. [Ejecución del Proyecto](#ejecucion-del-proyecto)
7. [Arquitectura de Estado Centralizado (Vuex)](#arquitectura-de-estado-centralizado-vuex)
8. [Rutas de la Aplicación](#rutas-de-la-aplicacion)

---

## Características del Proyecto

- **Panel de Control (Dashboard):** Visualización en tiempo real del total de libros registrados, estado de revisión y publicaciones.
- **Gestión CRUD de Libros:** Creación, edición, eliminación y cambio de estado de publicación (Publicado / En revisión).
- **Lista de Favoritos:** Marcado y gestión personalizada de títulos destacados.
- **Navegación Dinámica:** Detalle dinámico por libro mediante parámetros de ruta (`/libros/:id`).
- **Manejo de Errores 404:** Vista personalizada para rutas no existentes mediante captura comodín.
- **Persistencia y Simulación de API:** Consumo de datos mediante Axios conectado a `json-server`.

---

## Stack Tecnológico

- **Framework:** Vue 3 (Composition API con `<script setup>`)
- **Enrutamiento:** Vue Router 4
- **Gestión de Estado:** Vuex 4 (Arquitectura modular con `namespaced: true`)
- **Cliente HTTP:** Axios
- **Servidor Mock:** JSON Server
- **Estilos:** CSS3 / Scoped CSS (Diseño adaptativo e interfaz corporativa)

---

## Estructura del Proyecto

```text
ev-modulo-06/
├── public/
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── api/
│   │   └── index.js
│   ├── assets/
│   │   ├── css/
│   │   └── img/
│   ├── components/
│   │   ├── EditarLibroModal.vue
│   │   ├── FormularioLibro.vue
│   │   ├── LibroItem.vue
│   │   ├── SelectorUsuario.vue
│   │   ├── SitioFooter.vue
│   │   └── SitioHeader.vue
│   ├── data/
│   │   └── sesion.js
│   ├── router/
│   │   └── index.js
│   ├── store/
│   │   ├── index.js
│   │   └── modules/
│   │       ├── favoritos.js
│   │       ├── filtros.js
│   │       ├── productos.js
│   │       └── usuarios.js
│   ├── views/
│   │   ├── DashboardView.vue
│   │   ├── DetalleLibro.vue
│   │   ├── InicioView.vue
│   │   ├── ListaLibros.vue
│   │   ├── NotFound.vue
│   │   └── UsuariosView.vue
│   ├── App.vue
│   └── main.js
├── db.json
├── package.json
└── README.md