export default {
  namespaced: true,
  state: () => ({
    lista: [
      { id: '1', nombre: 'Invitado' },
      { id: '2', nombre: 'Marbelous' }
    ],
    usuarioActivo: 'Invitado'
  }),
  mutations: {
    SET_USUARIOS(state, usuarios) {
      if (Array.isArray(usuarios) && usuarios.length > 0) {
        state.lista = usuarios
      }
    },
    ADD_USUARIO(state, usuario) {
      state.lista.push(usuario)
    },
    REMOVE_USUARIO(state, id) {
      state.lista = state.lista.filter(u => String(u.id) !== String(id))
    },
    SET_USUARIO_ACTIVO(state, nombre) {
      state.usuarioActivo = nombre
    }
  },
  actions: {
    async obtenerUsuarios({ commit }) {
      try {
        const res = await fetch('http://localhost:3000/usuarios')
        if (res.ok) {
          const data = await res.json()
          commit('SET_USUARIOS', data)
        }
      } catch (error) {
        console.warn('Servidor no disponible, usando usuarios iniciales:', error)
      }
    },
    async crearUsuario({ commit }, nombre) {
      const nuevoUsuario = { id: String(Date.now()), nombre }
      
      try {
        const res = await fetch('http://localhost:3000/usuarios', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(nuevoUsuario)
        })
        
        if (res.ok) {
          const data = await res.json()
          commit('ADD_USUARIO', data)
        } else {
          commit('ADD_USUARIO', nuevoUsuario)
        }
      } catch (error) {
        commit('ADD_USUARIO', nuevoUsuario)
      }
      
      commit('SET_USUARIO_ACTIVO', nombre)
    },
    async eliminarUsuario({ commit, state }, usuario) {
      try {
        await fetch(`http://localhost:3000/usuarios/${usuario.id}`, {
          method: 'DELETE'
        })
      } catch (error) {
        console.warn('Error eliminando de API, removiendo localmente:', error)
      }

      commit('REMOVE_USUARIO', usuario.id)

      if (state.usuarioActivo === usuario.nombre) {
        const SiguienteActivo = state.lista[0]?.nombre || 'Invitado'
        commit('SET_USUARIO_ACTIVO', SiguienteActivo)
      }
    },
    seleccionarActivo({ commit }, nombre) {
      commit('SET_USUARIO_ACTIVO', nombre)
    }
  }
}