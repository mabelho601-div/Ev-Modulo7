<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import LibroItem from '@/components/LibroItem.vue'
import EditarLibroModal from '@/components/EditarLibroModal.vue'

const store = useStore()
const favoritos = ref([])

const mostrarModal = ref(false)
const libroSeleccionado = ref(null)

const libros = computed(() => store.getters['productos/libros'])
const totalLibros = computed(() => store.getters['productos/totalLibros'])

const librosEnRevision = computed(() => 
  libros.value.filter(libro => !libro.publicado).length
)

const librosPublicados = computed(() => 
  libros.value.filter(libro => libro.publicado).length
)

const handleEliminar = (id) => {
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

const handleAbrirEdicion = (libro) => {
  libroSeleccionado.value = { ...libro }
  mostrarModal.value = true
}

const handleCerrarModal = () => {
  mostrarModal.value = false
  libroSeleccionado.value = null
}

onMounted(() => {
  store.dispatch('productos/cargarLibros')
})
</script>

<template>
  <div class="vista-inicio">
    <div class="hero-container">
      <img src="@/assets/img/bannerautores.jpg" alt="Editorial Nova Banner" class="hero-imagen" />
      <div class="hero-overlay"></div>
      <div class="hero-texto">
        <span class="subtitulo-hero">EDITORIAL NOVA</span>
        <h1>Panel de Gestión</h1>
        <p>Bienvenido al sistema interno de administración del catálogo de libros.</p>
      </div>
    </div>

    <div class="panel-editorial">
      <div class="metricas-grid">
        <div class="card-metrica">
          <h3>Total en Catálogo</h3>
          <span class="numero-metrica">{{ totalLibros }}</span>
          <p>Libros registrados</p>
        </div>

        <div class="card-metrica metrica-revision">
          <h3>En Revisión</h3>
          <span class="numero-metrica">{{ librosEnRevision }}</span>
          <p>Pendientes de aprobación</p>
        </div>

        <div class="card-metrica metrica-publicados">
          <h3>Publicados</h3>
          <span class="numero-metrica">{{ librosPublicados }}</span>
          <p>Visibles en el catálogo</p>
        </div>
      </div>

      <!-- Catálogo Reciente -->
      <div class="seccion-recientes">
        <h2>Catálogo Reciente</h2>
        <ul class="lista-libros">
          <LibroItem
            v-for="libro in libros"
            :key="libro.id"
            :libro="libro"
            :es-favorito="favoritos.includes(libro.id)"
            @eliminar="handleEliminar"
            @alternar-publicado="handleAlternarPublicado"
            @favorito="handleFavorito"
            @editar="handleAbrirEdicion"
          />
        </ul>
      </div>

      <div class="acciones-rapidas">
        <router-link to="/libros" class="btn-dashboard">
          <i class="fa-solid fa-book"></i> Ir a Catálogo de Libros
        </router-link>
      </div>
    </div>

    <EditarLibroModal
      :mostrar="mostrarModal"
      :libro-para-editar="libroSeleccionado"
      @cerrar="handleCerrarModal"
    />
  </div>
</template>

<style scoped>
.vista-inicio {
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
  background: linear-gradient(90deg, rgba(15, 23, 42, 0.88) 0%, rgba(30, 27, 75, 0.65) 60%, rgba(0, 0, 0, 0.2) 100%);
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

.panel-editorial {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.metricas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.25rem;
}

.card-metrica {
  background: linear-gradient(135deg, #2A2869 0%, #1e1b4b 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem 1.25rem;
  text-align: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  color: #ffffff;
}

.card-metrica h3 {
  color: #a78bfa;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.card-metrica.metrica-revision h3 {
  color: #fbbf24;
}

.card-metrica.metrica-publicados h3 {
  color: #4ade80;
}

.numero-metrica {
  display: block;
  font-size: 3rem;
  font-weight: 800;
  color: #ffffff;
  line-height: 1;
  margin: 0.4rem 0;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.card-metrica p {
  color: #cbd5e1;
  font-size: 0.8rem;
  font-weight: 400;
  margin: 0;
}

.seccion-recientes h2 {
  font-size: 1.35rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
}

.lista-libros {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.25rem;
  padding: 0;
  margin: 0;
}

.acciones-rapidas {
  display: flex;
  justify-content: flex-start;
  margin-top: 0.5rem;
}

.btn-dashboard {
  display: inline-flex;
  align-items: center;
  background-color: #8b5cf6;
  color: #ffffff;
  padding: 0.85rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.2s ease, transform 0.1s ease;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25);
  gap: 0.6rem;
}

.btn-dashboard:hover {
  background-color: #4f46e5;
  transform: translateY(-1px);
}
</style>