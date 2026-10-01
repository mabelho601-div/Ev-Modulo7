<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const usuarioActivo = computed(() => store.state.usuarios.usuarioActivo)
</script>

<template>
  <header class="sitio-header">
    <div class="logo-container">
      <span class="subtitulo-head">EDITORIAL NOVA</span>
      <h1 class="logo-titulo">BookList SPA</h1>
    </div>

    <nav class="nav-links">
      <router-link to="/">Inicio</router-link>
      <router-link to="/libros">Catálogo de Libros</router-link>
    </nav>

    <div class="perfil-header">
      <div class="badge-perfil" title="Usuario activo actualmente">
        <i class="fa-solid fa-user icono-user"></i>
        <span class="nombre-user">{{ usuarioActivo }}</span>
      </div>
      <router-link to="/usuarios" class="btn-cambiar-perfil" title="Ir a administrar perfiles">
        <i class="fa-solid fa-id-card"></i>
        <span>Perfil</span>
      </router-link>
    </div>
  </header>
</template>

<style scoped>
.sitio-header {
  background: linear-gradient(135deg, #1e1b4b, #312e81);
  color: #ffffff;
  padding: 1.25rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px 8px 0 0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  flex-wrap: wrap;
  gap: 1rem;
}

.subtitulo-head {
  color: #c084fc;
  font-size: 0.75rem;
  letter-spacing: 1.5px;
  font-weight: 700;
  display: block;
}

.logo-titulo {
  margin: 0;
  font-size: 1.6rem;
  color: #ffffff;
  font-weight: 800;
}

.nav-links {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.nav-links a {
  color: #e0e7ff;
  text-decoration: none;
  font-weight: 600;
  padding: 0.45rem 0.9rem;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.nav-links a:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-links a.router-link-exact-active {
  background-color: #7e22ce;
  color: #ffffff;
}

.link-rota {
  color: #fca5a5 !important;
}

.perfil-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.badge-perfil {
  background-color: rgba(255, 255, 255, 0.12);
  padding: 0.45rem 0.9rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  border: 1px solid rgba(192, 132, 252, 0.3);
  backdrop-filter: blur(4px);
}

.icono-user {
  font-size: 0.85rem;
  color: #c084fc;
}

.nombre-user {
  font-weight: 600;
  color: #ffffff;
}

.btn-cambiar-perfil {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background-color: #7e22ce;
  color: #ffffff;
  text-decoration: none;
  padding: 0.45rem 0.9rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.2s ease;
}

.btn-cambiar-perfil:hover {
  background-color: #a855f7;
  transform: translateY(-1px);
}

.btn-cambiar-perfil.router-link-exact-active {
  background-color: #c084fc;
  color: #1e1b4b;
  font-weight: 700;
}
</style>