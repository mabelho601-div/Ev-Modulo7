<script setup>
import { ref, onMounted } from 'vue'

const emit = defineEmits(['usuario-cambiado'])

const usuarios = ref([])
const usuarioActual = ref('')
const nuevoNombre = ref('')

onMounted(() => {
  usuarios.value = JSON.parse(localStorage.getItem('usuarios_app')) || ['Evaluador / Profe']
  usuarioActual.value = localStorage.getItem('usuario_activo') || usuarios.value[0]
  
  guardarYNotificar()
})

const crearUsuario = () => {
  const nombreLimpio = nuevoNombre.value.trim()
  if (!nombreLimpio) return

  if (!usuarios.value.includes(nombreLimpio)) {
    usuarios.value.push(nombreLimpio)
    localStorage.setItem('usuarios_app', JSON.stringify(usuarios.value))
  }

  usuarioActual.value = nombreLimpio
  nuevoNombre.value = ''
  guardarYNotificar()
}

const cambiarUsuario = () => {
  guardarYNotificar()
}

const guardarYNotificar = () => {
  localStorage.setItem('usuario_activo', usuarioActual.value)
  emit('usuario-cambiado', usuarioActual.value)
}
</script>

<template>
  <div class="panel-usuario">
    <div class="usuario-seccion">
      <label><strong>Usuario actual:</strong></label>
      <select v-model="usuarioActual" @change="cambiarUsuario">
        <option v-for="u in usuarios" :key="u" :value="u">{{ u }}</option>
      </select>
    </div>

    <div class="usuario-seccion">
      <input 
        v-model="nuevoNombre" 
        type="text" 
        placeholder="Nombre de nuevo usuario..." 
        @keyup.enter="crearUsuario"
      />
      <button @click="crearUsuario" class="btn-crear">Crear Usuario</button>
    </div>
  </div>
</template>

<style scoped>
.panel-usuario {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 1rem;
  border-radius: 10px;
  display: flex;
  gap: 1.5rem;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.usuario-seccion {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

input, select {
  padding: 0.5rem 0.8rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 0.9rem;
}

.btn-crear {
  background: #8b5cf6;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}

.btn-crear:hover {
  background: #7c3aed;
}
</style>