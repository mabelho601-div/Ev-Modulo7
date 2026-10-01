<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const nuevoNombre = ref('')

const usuarios = computed(() => store.state.usuarios.lista)
const usuarioActivoNombre = computed(() => store.state.usuarios.usuarioActivo)

onMounted(() => {
  store.dispatch('usuarios/obtenerUsuarios')
})

const crearUsuario = async () => {
  const nombreLimpio = nuevoNombre.value.trim()
  if (!nombreLimpio) return

  await store.dispatch('usuarios/crearUsuario', nombreLimpio)
  nuevoNombre.value = ''
}

const seleccionarUsuario = (nombre) => {
  store.dispatch('usuarios/seleccionarActivo', nombre)
}

const eliminarUsuario = (usuario) => {
  if (confirm(`¿Estás seguro de que deseas eliminar el perfil "${usuario.nombre}"?`)) {
    store.dispatch('usuarios/eliminarUsuario', usuario)
  }
}
</script>

<template>
  <div class="contenedor-vista">
    <div class="encabezado-perfiles">
      <div class="icono-titulo">
        <i class="fa-solid fa-users-gear"></i>
      </div>
      <div>
        <h1>Gestión de Perfiles</h1>
        <p>Crea o selecciona un usuario para gestionar tu biblioteca personal.</p>
        <span class="badge-prueba">
          <i class="fa-solid fa-flask"></i> Este gestionador de perfiles es de prueba
        </span>
      </div>
    </div>

    <div class="grid-perfiles">
      <div class="card-seccion">
        <h3><i class="fa-solid fa-user-plus"></i> Crear nuevo usuario</h3>
        <form @submit.prevent="crearUsuario" class="formulario-perfil">
          <div class="caja-input">
            <i class="fa-solid fa-user input-icon"></i>
            <input 
              v-model="nuevoNombre" 
              type="text" 
              placeholder="Ingresa un nombre..." 
              required
            />
          </div>
          <button type="submit" class="btn-crear">
            <i class="fa-solid fa-plus"></i> Crear Perfil
          </button>
        </form>
      </div>

      <div class="card-seccion">
        <h3><i class="fa-solid fa-address-card"></i> Perfiles disponibles</h3>
        <div class="lista-usuarios">
          <div 
            v-for="usuario in usuarios" 
            :key="usuario.id" 
            class="item-usuario"
            :class="{ active: usuario.nombre === usuarioActivoNombre }"
            @click="seleccionarUsuario(usuario.nombre)"
          >
            <div class="info-usuario">
              <div class="avatar-circle">
                <i class="fa-solid fa-user"></i>
              </div>
              <span class="nombre-usuario">{{ usuario.nombre }}</span>
            </div>

            <div class="acciones-usuario">
              <span v-if="usuario.nombre === usuarioActivoNombre" class="badge-activo">
                <i class="fa-solid fa-circle-check"></i> Activo
              </span>
              <span v-else class="btn-seleccionar">
                Seleccionar
              </span>

              <button 
                v-if="usuario.nombre !== 'Invitado'" 
                class="btn-eliminar" 
                title="Eliminar usuario"
                @click.stop="eliminarUsuario(usuario)"
              >
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="acciones-inferiores">
      <router-link to="/libros" class="btn-catalogo">
        <i class="fa-solid fa-book-open"></i> Ir al Catálogo de Libros →
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.contenedor-vista {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.encabezado-perfiles {
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
  margin-bottom: 2rem;
}

.icono-titulo {
  width: 56px;
  height: 56px;
  background: #f3e8ff;
  color: #8b5cf6;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.encabezado-perfiles h1 {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 800;
  color: #0f172a;
}

.encabezado-perfiles p {
  margin: 0.25rem 0 0.5rem;
  color: #64748b;
  font-size: 0.95rem;
}

.badge-prueba {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background-color: #fef3c7;
  color: #b45309;
  font-size: 0.78rem;
  font-weight: 600;
  padding: 0.25rem 0.65rem;
  border-radius: 6px;
  border: 1px solid #fde68a;
}

.grid-perfiles {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.card-seccion {
  background: #ffffff;
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.card-seccion h3 {
  margin: 0 0 1.25rem;
  font-size: 1.05rem;
  font-weight: 700;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.card-seccion h3 i {
  color: #8b5cf6;
}

.formulario-perfil {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.caja-input {
  position: relative;
  flex: 1;
  min-width: 240px;
}

.input-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
}

.caja-input input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.6rem;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  font-size: 0.95rem;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.caja-input input:focus {
  border-color: #8b5cf6;
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.15);
}

.btn-crear {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #0f172a;
  color: #ffffff;
  border: none;
  padding: 0.75rem 1.4rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
}

.btn-crear:hover {
  background-color: #1e293b;
  transform: translateY(-1px);
}

.lista-usuarios {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.item-usuario {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 1.2rem;
  border-radius: 12px;
  border: 1.5px solid #e2e8f0;
  background: #f8fafc;
  cursor: pointer;
  transition: all 0.2s ease;
}

.item-usuario:hover {
  border-color: #c084fc;
  background: #ffffff;
  transform: translateY(-1px);
}

.item-usuario.active {
  border-color: #8b5cf6;
  background: #f3e8ff;
}

.info-usuario {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.avatar-circle {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #ffffff;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  border: 1px solid #cbd5e1;
}

.item-usuario.active .avatar-circle {
  background: #8b5cf6;
  color: #ffffff;
  border-color: #8b5cf6;
}

.nombre-usuario {
  font-weight: 600;
  color: #1e293b;
  font-size: 0.95rem;
}

.acciones-usuario {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.badge-activo {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: #dcfce7;
  color: #15803d;
  padding: 0.35rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
}

.btn-seleccionar {
  color: #64748b;
  font-size: 0.85rem;
  font-weight: 600;
}

.btn-eliminar {
  background: transparent;
  border: none;
  color: #ef4444;
  padding: 0.4rem 0.6rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s, color 0.2s;
}

.btn-eliminar:hover {
  background-color: #fee2e2;
  color: #dc2626;
}

.acciones-inferiores {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
}

.btn-catalogo {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background-color: #8b5cf6;
  color: #ffffff;
  padding: 0.85rem 2rem;
  border-radius: 12px;
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
  transition: background-color 0.2s, transform 0.1s;
}

.btn-catalogo:hover {
  background-color: #7c3aed;
  transform: translateY(-1px);
}
</style>