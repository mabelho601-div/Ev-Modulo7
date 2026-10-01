<script setup>
import { ref } from 'vue'

const emailPrueba = ref('')
const mensaje = ref('')

const enviarSuscripcion = () => {
  if (emailPrueba.value) {
    mensaje.value = '¡Suscripción enviada con éxito!'
    emailPrueba.value = ''
    setTimeout(() => { mensaje.value = '' }, 3000)
  }
}
</script>

<template>
  <footer class="sitio-footer">
    <div class="footer-grid">
      <div class="columna">
        <h4>EDITORIAL NOVA</h4>
        <p>Sistema interno de gestión de catálogo y títulos corporativos.</p>
      </div>
      <div class="columna">
        <h4>Navegación</h4>
        <ul>
          <li><router-link to="/libros">Gestión de Libros</router-link></li>
          <li><router-link to="/">Panel Principal</router-link></li>
        </ul>
      </div>
      <div class="columna">
        <h4>BOLETÍN DE PRUEBAS</h4>
        <p>Ingresa un email para probar la suscripción:</p>
        <form @submit.prevent="enviarSuscripcion" class="form-suscripcion">
          <input 
            v-model="emailPrueba" 
            type="email" 
            placeholder="correo@ejemplo.com" 
            required 
          />
          <button type="submit">Enviar</button>
        </form>
        <span v-if="mensaje" class="mensaje-exito">{{ mensaje }}</span>
      </div>
    </div>
    <div class="footer-copy">
      <p>&copy; 2026 Editorial Nova - Sistema de Gestión Vue 3</p>
    </div>
  </footer>
</template>

<style scoped>
.sitio-footer {
  background-color: #0f172a;
  color: #94a3b8;
  padding: 2.5rem 2rem 1.5rem;
  border-radius: 0 0 8px 8px;
  margin-top: 3rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
  border-bottom: 1px solid #334155;
  padding-bottom: 2rem;
}

.columna h4 {
  color: #ffffff;
  font-size: 0.9rem;
  letter-spacing: 1px;
  margin-bottom: 1rem;
}

.columna ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.columna ul li {
  margin-bottom: 0.5rem;
}

.columna a {
  color: #cbd5e1;
  text-decoration: none;
  font-size: 0.9rem;
}

.form-suscripcion {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.form-suscripcion input {
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #475569;
  background-color: #1e293b;
  color: white;
  width: 100%;
}

.form-suscripcion button {
  background-color: #7e22ce;
  color: white;
  border: none;
  padding: 0.5rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
}

.mensaje-exito {
  color: #4ade80;
  font-size: 0.8rem;
  margin-top: 0.5rem;
  display: block;
}

.footer-copy {
  text-align: center;
  padding-top: 1.5rem;
  font-size: 0.85rem;
}
</style>