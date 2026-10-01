<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import iconoLibros from '@/assets/img/icono-libros.gif'
import iconoLibro from '@/assets/img/icono-libro.gif'
import iconoLeer from '@/assets/img/icono-leer.gif'

const router = useRouter()
const store = useStore()

const libros = computed(() => store.getters['productos/libros'])
const enRevision = computed(() => libros.value.filter(libro => !libro.publicado))
const publicados = computed(() => libros.value.filter(libro => libro.publicado))

const tarjetas = computed(() => [
  { icono: iconoLibros, numero: libros.value.length, etiqueta: 'Libros registrados' },
  { icono: iconoLibro, numero: enRevision.value.length, etiqueta: 'En revisión' },
  { icono: iconoLeer, numero: publicados.value.length, etiqueta: 'Publicados' }
])

function irAlCatalogo() {
  router.push({ name: 'libros' })
}

function alternarPublicado(id) {
  const libro = store.getters['productos/libroPorId'](id)
  if (libro) {
    store.dispatch('productos/editarLibro', {
      ...libro,
      publicado: !libro.publicado
    })
  }
}
</script>

<template>
  <div class="dashboard-view">
    <h1>Panel de Control</h1>

    <div class="tarjetas-grid">
      <div 
        v-for="(tarjeta, index) in tarjetas" 
        :key="index" 
        class="tarjeta-info"
      >
        <img :src="tarjeta.icono" :alt="tarjeta.etiqueta" />
        <div class="tarjeta-datos">
          <h3>{{ tarjeta.numero }}</h3>
          <p>{{ tarjeta.etiqueta }}</p>
        </div>
      </div>
    </div>

    <div class="seccion-revision">
      <h2>Gestión de Publicaciones</h2>
      <ul>
        <li v-for="libro in libros" :key="libro.id">
          <span>{{ libro.titulo }} - <strong>{{ libro.publicado ? 'Publicado' : 'En revisión' }}</strong></span>
          <button @click="alternarPublicado(libro.id)">
            {{ libro.publicado ? 'Desmarcar' : 'Publicar' }}
          </button>
        </li>
      </ul>
    </div>

    <button @click="irAlCatalogo" class="btn-catalogo">
      Ver Catálogo Completo
    </button>
  </div>
</template>