<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import LibroItem from '@/components/LibroItem.vue'
import FormularioLibro from '@/components/FormularioLibro.vue'
import EditarLibroModal from '@/components/EditarLibroModal.vue'

const store = useStore()
const favoritos = ref([])

const libros = computed(() => store.getters['productos/libros'])

const busqueda = computed({
  get: () => store.getters['filtros/titulo'],
  set: (val) => store.commit('filtros/SET_TITULO', val)
})

const librosFiltrados = computed(() => {
  if (!busqueda.value.trim()) return libros.value
  const termino = busqueda.value.toLowerCase()
  return libros.value.filter(libro => 
    libro.titulo.toLowerCase().includes(termino) ||
    libro.autor.toLowerCase().includes(termino) ||
    libro.categoria.toLowerCase().includes(termino)
  )
})

const mostrarModal = ref(false)
const libroAEditar = ref(null)

const agregarLibro = (nuevoLibro) => {
  store.dispatch('productos/agregarLibro', nuevoLibro)
}

const abrirEdicion = (libro) => {
  libroAEditar.value = libro
  mostrarModal.value = true
}

const eliminarLibro = (id) => {
  store.dispatch('productos/eliminarLibro', id)
}

const handleAlternarPublicado = (id) => {
  const libro = store.getters['productos/libroPorId'](id)
  if (libro) {
    store.dispatch('productos/editarLibro', { ...libro, publicado: !libro.publicado })
  }
}

const handleFavorito = (id) => {
  if (favoritos.value.includes(id)) {
    favoritos.value = favoritos.value.filter(favId => favId !== id)
  } else {
    favoritos.value.push(id)
  }
}

onMounted(() => {
  store.dispatch('productos/cargarLibros')
})
</script>

<template>
  <div class="contenedor-vista">
    <div class="hero-container">
      <img src="@/assets/img/bannerlibros.jpg" alt="Banner Libros" class="hero-imagen" />
      <div class="hero-overlay"></div>
      <div class="hero-texto">
        <span class="subtitulo-hero">CATÁLOGO E INVENTARIO</span>
        <h1>Gestión de Libros</h1>
        <p>Administra los libros de tu plataforma, agrega nuevos títulos, edítalos o filtra por término.</p>
      </div>
    </div>

    <section class="seccion-formulario">
      <FormularioLibro @agregar-libro="agregarLibro" />
    </section>

    <section class="seccion-catalogo">
      <div class="encabezado-catalogo">
        <h3>Catálogo de Libros ({{ librosFiltrados.length }})</h3>

        <div class="caja-busqueda">
          <i class="fa-solid fa-magnifying-glass icono-busqueda"></i>
          <input 
            v-model="busqueda" 
            type="text" 
            placeholder="Buscar por título, autor o categoría..." 
            class="input-busqueda"
          />
        </div>
      </div>

      <p v-if="librosFiltrados.length === 0" class="sin-resultados">
        No se encontraron libros que coincidan con "{{ busqueda }}".
      </p>

      <ul v-else class="grid-libros">
        <LibroItem 
          v-for="libro in librosFiltrados" 
          :key="libro.id" 
          :libro="libro"
          :es-favorito="favoritos.includes(libro.id)"
          @eliminar="eliminarLibro"
          @alternar-publicado="handleAlternarPublicado"
          @favorito="handleFavorito"
          @editar="abrirEdicion"
        />
      </ul>
    </section>

    <EditarLibroModal 
      :mostrar="mostrarModal" 
      :libroParaEditar="libroAEditar" 
      @cerrar="mostrarModal = false" 
    />
  </div>
</template>

<style scoped>
.contenedor-vista {
  max-width: 1100px;
  margin: 0 auto;
  padding: 1.5rem;
}

.hero-container {
  position: relative;
  width: 100%;
  height: 200px;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 2rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15);
  background-color: #1e1b4b;
}

.hero-imagen {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 27, 75, 0.6) 60%, rgba(0, 0, 0, 0.2) 100%);
}

.hero-texto {
  position: absolute;
  top: 50%;
  left: 2.5rem;
  transform: translateY(-50%);
  color: #ffffff;
  z-index: 2;
  max-width: 600px;
}

.subtitulo-hero {
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  color: #a78bfa;
  text-transform: uppercase;
}

.hero-texto h1 {
  margin: 0.3rem 0 0.4rem;
  font-size: 2.1rem;
  font-weight: 800;
  color: #ffffff;
  line-height: 1.2;
}

.hero-texto p {
  margin: 0;
  color: #cbd5e1;
  font-size: 0.95rem;
}

.seccion-formulario {
  margin-bottom: 2.5rem;
}

.encabezado-catalogo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.caja-busqueda {
  position: relative;
  display: flex;
  align-items: center;
}

.icono-busqueda {
  position: absolute;
  left: 0.85rem;
  color: #94a3b8;
  font-size: 0.85rem;
  pointer-events: none;
}

.input-busqueda {
  padding: 0.65rem 1.1rem;
  padding-left: 2.2rem;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  font-size: 0.9rem;
  width: 280px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.input-busqueda:focus {
  border-color: #8b5cf6;
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.15);
}

.grid-libros {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.25rem;
  padding: 0;
  margin-top: 1rem;
}
</style>