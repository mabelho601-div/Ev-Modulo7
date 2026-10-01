<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue'
import { useStore } from 'vuex'

const props = defineProps({
  mostrar: { type: Boolean, default: false },
  libroParaEditar: { type: Object, default: null }
})

const emit = defineEmits(['cerrar'])
const store = useStore()

const form = ref({ id: null, titulo: '', autor: '', categoria: '', descripcion: '', publicado: false })

watch(() => props.libroParaEditar, (nuevoLibro) => {
  if (nuevoLibro) {
    form.value = { ...nuevoLibro }
  }
}, { immediate: true })

const guardarCambios = async () => {
  try {
    await store.dispatch('productos/editarLibro', form.value)
    emit('cerrar')
  } catch (error) {
    console.error('Error al editar:', error)
  }
}
</script>

<template>
  <div v-if="mostrar" class="modal-backdrop" @click.self="$emit('cerrar')">
    <div class="modal-contenido">
      <h2>Editar Libro</h2>

      <form @submit.prevent="guardarCambios" class="form-modal">
        <div class="campo">
          <label>Título:</label>
          <input v-model="form.titulo" required class="input-modal" />
        </div>

        <div class="campo">
          <label>Autor:</label>
          <input v-model="form.autor" required class="input-modal" />
        </div>

        <div class="campo">
          <label>Categoría:</label>
          <input v-model="form.categoria" required class="input-modal" />
        </div>

        <div class="campo">
          <label>Descripción:</label>
          <textarea v-model="form.descripcion" rows="3" required class="input-modal textarea-modal"></textarea>
        </div>

        <div class="acciones">
          <button type="submit" class="btn-guardar">Guardar Cambios</button>
          <button type="button" @click="$emit('cerrar')" class="btn-cancelar">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0; 
  left: 0; 
  width: 100vw; 
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex; 
  justify-content: center; 
  align-items: center;
  z-index: 1000;
}

.modal-contenido {
  background: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 450px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.modal-contenido h2 {
  margin: 0 0 1.5rem 0;
  color: #101010;
  font-size: 1.4rem;
  font-weight: 700;
}

.form-modal {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.campo {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  text-align: left;
}

.campo label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #374151;
}

.input-modal {
  width: 100%;
  padding: 0.65rem 0.85rem;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 0.9rem;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s;
}

.input-modal:focus {
  border-color: #8b5cf6;
}

.textarea-modal {
  resize: vertical;
}

.acciones {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.btn-guardar {
  flex: 1;
  background-color: #8b5cf6;
  color: white;
  border: none;
  padding: 0.7rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-guardar:hover {
  background-color: #7c3aed;
}

.btn-cancelar {
  background-color: #e2e8f0;
  color: #475569;
  border: none;
  padding: 0.7rem 1.25rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-cancelar:hover {
  background-color: #cbd5e1;
}
</style>