import api from '@/lib/axios';

export default {
  agregarCliente(data) {
    return api.post('/clientes', data)
  },
  obtenerClientes() {
    return api.get('/clientes')
  },
  cambiarEstado(id, estado) {
    return api.patch(`/clientes/${id}`, { estado: estado })
  },
  obtenerCliente(id) {
    return api.get(`/clientes/${id}`)
  },
  actualizarCliente(id, data) {
    return api.patch(`/clientes/${id}`, data)
  },
}
