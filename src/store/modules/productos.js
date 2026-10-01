import api from '@/api'

export default {
  namespaced: true,
  state: () => ({
    libros: [],
    loading: false,
    error: null
  }),
  mutations: {
    SET_LIBROS(state, libros) {
      state.libros = libros
    },
    AGREGAR_LIBRO(state, libro) {
      state.libros.push(libro)
    },
    EDITAR_LIBRO(state, libroActualizado) {
      const index = state.libros.findIndex(l => String(l.id) === String(libroActualizado.id))
      if (index !== -1) state.libros[index] = libroActualizado
    },
    ELIMINAR_LIBRO(state, id) {
      state.libros = state.libros.filter(l => String(l.id) !== String(id))
    },
    SET_LOADING(state, val) {
      state.loading = val
    },
    SET_ERROR(state, val) {
      state.error = val
    }
  },
  actions: {
    async cargarLibros({ commit }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        const { data } = await api.get('/libros')
        commit('SET_LIBROS', data)
      } catch (e) {
        commit('SET_ERROR', 'No se pudieron cargar los libros desde la API.')
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async agregarLibro({ commit }, datos) {
      const libroNuevo = {
        ...datos,
        portada: datos.portada || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&q=80',
        publicado: false
      }
      const { data } = await api.post('/libros', libroNuevo)
      commit('AGREGAR_LIBRO', data)
    },
    async editarLibro({ commit }, libro) {
      const { data } = await api.put(`/libros/${libro.id}`, libro)
      commit('EDITAR_LIBRO', data)
    },
    async eliminarLibro({ commit }, id) {
      try {
        await api.delete(`/libros/${id}`)
        commit('ELIMINAR_LIBRO', id)
      } catch (error) {
        console.error('Error al eliminar el libro:', error)
      }
    }
  },
  getters: {
    libros: state => state.libros,
    totalLibros: state => state.libros.length,
    loading: state => state.loading,
    error: state => state.error,
    libroPorId: state => id => state.libros.find(l => String(l.id) === String(id))
  }
}