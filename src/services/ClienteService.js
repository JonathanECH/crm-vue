import api from "@/lib/axios";

export default {
  agregarCliente(data){
    return api.post('/clientes', data)
  },
  obtenerClientes(){
    return api.get('/clientes')
  },
  cambiarEstado(data){
    return api.patch(`/clientes/${data.id}`, {estado: data.estado})
  }
}
