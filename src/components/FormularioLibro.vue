<script setup>
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['agregar-libro'])

const nuevoLibro = ref({
  titulo: '',
  autor: '',
  categoria: '',
  descripcion: ''
})

const procesarFormulario = () => {
  if (!nuevoLibro.value.titulo || !nuevoLibro.value.autor || !nuevoLibro.value.categoria) {
    return
  }

emit('agregar-libro', { ...nuevoLibro.value })

  nuevoLibro.value = {
    titulo: '',
    autor: '',
    categoria: '',
    descripcion: ''
  }
}
</script>

<template>
  <div class="card-formulario">
    <h3>Añadir Nuevo Libro</h3>
    
    <form @submit.prevent="procesarFormulario" class="formulario">
      <div class="form-group">
        <label for="titulo">Título:</label>
        <input 
          id="titulo" 
          v-model="nuevoLibro.titulo" 
          type="text" 
          placeholder="Ej: Cien años de soledad" 
          required 
        />
      </div>

      <div class="form-group">
        <label for="autor">Autor:</label>
        <input 
          id="autor" 
          v-model="nuevoLibro.autor" 
          type="text" 
          placeholder="Ej: Gabriel García Márquez" 
          required 
        />
      </div>

      <div class="form-group">
        <label for="categoria">Categoría:</label>
        <select id="categoria" v-model="nuevoLibro.categoria" required>
          <option value="" disabled selected>Seleccione una categoría</option>
          <option value="Fantasía">Fantasía</option>
          <option value="Romance">Romance</option>
          <option value="Ciencia Ficción">Ciencia Ficción</option>
          <option value="Novela">Novela</option>
          <option value="Ficción">Ficción</option>
        </select>
      </div>

      <div class="form-group">
        <label for="descripcion">Descripción / Detalle:</label>
        <textarea 
          id="descripcion" 
          v-model="nuevoLibro.descripcion" 
          rows="3" 
          placeholder="Escribe un breve resumen del libro..."
        ></textarea>
      </div>

      <button type="submit" class="btn-guardar">Agregar Libro</button>
    </form>
  </div>
</template>

<style scoped>
.card-formulario {
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #f1f5f9;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.card-formulario h3 {
  margin: 0 0 1.25rem;
  font-size: 1.1rem;
  color: #101010;
  font-weight: 700;
}

.formulario {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-group label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #475569;
}

.form-group input,
.form-group select {
  padding: 0.75rem 0.9rem;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 0.9rem;
  outline: none;
  background-color: #ffffff;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group select:focus {
  border-color: #8b5cf6;
}

.btn-guardar {
  background-color: #8b5cf6;
  color: #ffffff;
  border: none;
  padding: 0.8rem;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: background-color 0.2s;
}

.btn-guardar:hover {
  background-color: #7c3aed;
}
</style>