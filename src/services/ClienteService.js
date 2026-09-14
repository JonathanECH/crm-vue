import api from "@/lib/axios";

export default {
  agregarCliente(data){
    return api.post('/clientes', data)
  },
  obtenerClientes(){
    return api.get('/clientes')
  }
}
