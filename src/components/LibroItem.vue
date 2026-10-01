<script setup>
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps({
  libro: { type: Object, required: true },
  vistaPrevia: { type: Boolean, default: false },
  esFavorito: { type: Boolean, default: false }
})

const emit = defineEmits(['eliminar', 'alternar-publicado', 'favorito', 'editar'])

const mostrarDescripcion = ref(props.vistaPrevia)
</script>

<template>
  <li class="tarjeta-libro" :class="{ 'es-vista-previa': vistaPrevia }">
    <div class="fila-titulo">
      <span v-if="vistaPrevia" class="titulo-libro">{{ libro.titulo }}</span>
      <router-link v-else :to="`/libros/${libro.id}`" class="titulo-libro">{{ libro.titulo }}</router-link>
      
      <button 
        v-if="!vistaPrevia" 
        class="boton-favorito" 
        :title="esFavorito ? 'Quitar de favoritos' : 'Agregar a favoritos'"
        @click="emit('favorito', libro.id)"
      >
        <i :class="esFavorito ? 'fa-solid fa-star' : 'fa-regular fa-star'"></i>
      </button>
    </div>

    <p class="autor-libro">{{ libro.autor }}</p>

    <div class="chips">
      <span class="chip-categoria">{{ libro.categoria }}</span>
      <span v-if="!vistaPrevia" class="chip-estado" :class="{ publicado: libro.publicado }">
        {{ libro.publicado ? 'Publicado' : 'En revisión' }}
      </span>
    </div>

    <p v-show="mostrarDescripcion && libro.descripcion" class="descripcion">{{ libro.descripcion }}</p>

    <div v-if="!vistaPrevia" class="acciones">
      <button
        v-if="libro.descripcion"
        class="boton-descripcion"
        :title="mostrarDescripcion ? 'Ocultar el resumen del libro' : 'Desplegar el resumen del libro'"
        @click="mostrarDescripcion = !mostrarDescripcion"
      >
        <i :class="mostrarDescripcion ? 'fa-solid fa-eye-slash' : 'fa-solid fa-file-lines'"></i>
        <span>{{ mostrarDescripcion ? 'Ocultar descripción' : 'Ver descripción' }}</span>
      </button>

      <button 
        class="boton-editar" 
        title="Editar datos de este libro"
        @click="emit('editar', libro)"
      >
        <i class="fa-solid fa-pen-to-square"></i>
        <span>Editar</span>
      </button>

      <button 
        class="boton-estado" 
        :title="libro.publicado ? 'Cambiar estado a en revisión' : 'Publicar en el catálogo'"
        @click="emit('alternar-publicado', libro.id)"
      >
        <i :class="libro.publicado ? 'fa-solid fa-box-archive' : 'fa-solid fa-circle-check'"></i>
        <span>{{ libro.publicado ? 'Volver a revisión' : 'Publicar' }}</span>
      </button>

      <button 
        class="boton-eliminar" 
        title="Eliminar este libro permanentemente"
        @click.once="emit('eliminar', libro.id)"
      >
        <i class="fa-solid fa-trash-can"></i>
        <span>Eliminar</span>
      </button>
    </div>
  </li>
</template>

<style scoped>
.tarjeta-libro {
  background: #ffffff;
  border-radius: 12px;
  padding: 1.25rem;
  border: 1px solid #cbd5e1;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  list-style: none;
}

.es-vista-previa {
  box-shadow: none;
  border: 1.5px dashed #a7f3d0;
  background: #f0fdf4;
}

.fila-titulo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.titulo-libro {
  font-weight: 700;
  color: #0f172a;
  text-decoration: none;
  font-size: 1.1rem;
}

a.titulo-libro:hover {
  color: #8b5cf6;
}

.boton-favorito {
  border: none;
  background: none;
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
  color: #f59e0b;
  padding: 0;
  flex-shrink: 0;
  transition: transform 0.15s ease;
}

.boton-favorito:hover {
  transform: scale(1.2);
}

.autor-libro {
  color: #64748b;
  margin: 0;
  font-size: 0.9rem;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.chip-estado {
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
  background: #fef3c7;
  color: #d97706;
}

.chip-estado.publicado {
  background: #dcfce7;
  color: #15803d;
}

.chip-categoria {
  background: #f3e8ff;
  color: #8b5cf6;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
}

.descripcion {
  margin: 0.4rem 0 0;
  color: #334155;
  font-size: 0.875rem;
  line-height: 1.5;
}

.acciones {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.boton-descripcion,
.boton-editar,
.boton-estado,
.boton-eliminar {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  border: none;
  font-weight: 600;
  font-size: 0.85rem;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
}

.boton-descripcion:hover,
.boton-editar:hover,
.boton-estado:hover,
.boton-eliminar:hover {
  transform: translateY(-1px);
}

.boton-descripcion {
  background: #f3e8ff;
  color: #8b5cf6;
}

.boton-descripcion:hover {
  background: #e9d5ff;
}

.boton-editar {
  background: #e0f2fe;
  color: #0284c7;
}

.boton-editar:hover {
  background: #bae6fd;
}

.boton-estado {
  background: #dcfce7;
  color: #15803d;
}

.boton-estado:hover {
  background: #bbf7d0;
}

.boton-eliminar {
  background: #fee2e2;
  color: #dc2626;
}

.boton-eliminar:hover {
  background: #fecaca;
}
</style>