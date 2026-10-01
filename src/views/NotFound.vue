<template>
  <div class="vista-not-found">
    <div class="banner-404">
      <img 
        src="@/assets/img/404libro.jpg" 
        alt="Página no encontrada"
        class="banner-imagen" 
      />
      
      <div class="banner-overlay">
        <span class="badge-404">404</span>
        <span class="subtitulo-banner">RECURSO NO ENCONTRADO</span>
        
        <h1>¡Ups! Te has perdido en la biblioteca</h1>
        <p>La página que estás intentando consultar no existe, cambió de ruta o fue eliminada de nuestro sistema.</p>

        <div class="contenedor-botones">
          <router-link to="/" class="btn-primario">
            &larr; Volver a la Página de Inicio
          </router-link>
          <router-link to="/libros" class="btn-secundario">
            Explorar Catálogo
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.vista-not-found {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem 0;
}

.banner-404 {
  position: relative;
  width: 100%;
  max-width: 900px;
  min-height: 420px;
  border-radius: 16px;
  overflow: hidden;
  background-color: #1a1a2e;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
}

.banner-imagen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.25) contrast(1.1);
}

.banner-overlay {
  position: relative;
  z-index: 1;
  padding: 3.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  min-height: 420px;
  box-sizing: border-box;
}

.badge-404 {
  font-size: 3.5rem;
  font-weight: 900;
  color: #a855f7;
  line-height: 1;
  margin-bottom: 0.25rem;
  text-shadow: 0 2px 10px rgba(168, 85, 247, 0.3);
}

.subtitulo-banner {
  background-color: rgba(168, 85, 247, 0.2);
  color: #c084fc;
  border: 1px solid rgba(168, 85, 247, 0.4);
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  padding: 0.3rem 0.9rem;
  border-radius: 20px;
  margin-bottom: 1.25rem;
  text-transform: uppercase;
}

.banner-overlay h1 {
  color: #ffffff;
  font-size: 2.2rem;
  font-weight: 800;
  margin: 0 0 0.75rem;
  line-height: 1.2;
}

.banner-overlay p {
  color: #e2e8f0;
  font-size: 1rem;
  max-width: 520px;
  margin: 0 0 2rem;
  line-height: 1.5;
}

.contenedor-botones {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.btn-primario {
  background-color: #8b5cf6;
  color: #ffffff;
  text-decoration: none;
  padding: 0.8rem 1.6rem;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  box-shadow: 0 4px 14px rgba(139, 92, 246, 0.4);
}

.btn-primario:hover {
  background-color: #7c3aed;
  transform: translateY(-2px);
}

.btn-secundario {
  background-color: rgba(255, 255, 255, 0.12);
  color: #ffffff;
  text-decoration: none;
  padding: 0.8rem 1.6rem;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.9rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.2s ease;
  backdrop-filter: blur(4px);
}

.btn-secundario:hover {
  background-color: rgba(255, 255, 255, 0.22);
  transform: translateY(-2px);
}

@media (max-width: 640px) {
  .banner-overlay {
    padding: 2.5rem 1.25rem;
  }
  .banner-overlay h1 {
    font-size: 1.6rem;
  }
  .badge-404 {
    font-size: 2.8rem;
  }
  .contenedor-botones {
    flex-direction: column;
    width: 100%;
  }
  .btn-primario, .btn-secundario {
    width: 100%;
    text-align: center;
    box-sizing: border-box;
  }
}
</style>