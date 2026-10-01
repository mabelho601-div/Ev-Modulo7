<script setup>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import SitioHeader from './components/SitioHeader.vue'
import SitioFooter from './components/SitioFooter.vue'

const store = useStore()

onMounted(() => {
  store.dispatch('productos/cargarLibros')
})
</script>

<template>
  <div class="app-layout">
    <SitioHeader />

    <main class="contenedor-principal">
      <router-view />
    </main>

    <SitioFooter />
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
  background-color: #f8fafc;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  color: #334155;
}

.app-layout {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.contenedor-principal {
  flex: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  box-sizing: border-box;
}

@media (max-width: 768px) {
  .contenedor-principal {
    padding: 1rem;
  }
}
</style>
