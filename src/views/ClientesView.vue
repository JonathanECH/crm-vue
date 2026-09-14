<script setup>
import { onMounted, ref, reactive, computed } from 'vue';
import ClienteService from '@/services/ClienteService';
import Clientes from '@/components/Clientes.vue';
import RouterLink from '@/components/UI/RouterLink.vue';
import Heading from '@/components/UI/HeadingVue.vue';
import ConfirmModal from '@/components/UI/ConfirmModal.vue';
import Alerta from '@/components/UI/AlertaVue.vue';

// Variables
const clientes = ref([]);

// Estado para el modal de confirmación
const modalEliminar = ref(false);
const clienteAEliminar = ref(null);
const cargandoEliminar = ref(false);

// Estado para alertas y notificaciones
const alerta = reactive({
  mostrar: false,
  tipo: 'success',
  mensaje: ''
});

// Hook onMounted
onMounted(async () => {
  try {
    const { data } = await ClienteService.obtenerClientes();
    clientes.value = data;
  } catch (error) {
    console.error('Error al obtener clientes:', error);
  }
});

// Props
defineProps({
  titulo: {
    type: String
  }
});

// --- Métodos ---
const existenClientes = computed(() => clientes.value.length > 0);

// Cuando se ejecuta un cambio de estado se actualiza el estado del cliente en el array
const cambiarEstado = (id, estado) => {
  ClienteService.cambiarEstado(id, !estado)
    .then(({ data }) => {
      clientes.value = clientes.value.map(cliente => cliente.id === id ? data : cliente);
    })
    .catch(error => console.error('Error al cambiar estado: ', error));
};

// Abrir modal de confirmación con los datos del cliente
const abrirModalEliminar = (id, nombre) => {
  const cliente = clientes.value.find(c => c.id === id);
  clienteAEliminar.value = {
    id,
    nombre: nombre || (cliente ? `${cliente.nombre} ${cliente.apellido}` : '')
  };
  modalEliminar.value = true;
};

// Cancelar eliminación y cerrar modal
const cancelarEliminar = () => {
  modalEliminar.value = false;
  clienteAEliminar.value = null;
};

// Confirmar y procesar la eliminación en la API
const confirmarEliminar = async () => {
  if (!clienteAEliminar.value) return;

  cargandoEliminar.value = true;
  try {
    await ClienteService.eliminarCliente(clienteAEliminar.value.id);
    clientes.value = clientes.value.filter(cliente => cliente.id !== clienteAEliminar.value.id);
    modalEliminar.value = false;
    clienteAEliminar.value = null;

    alerta.tipo = 'success';
    alerta.mensaje = '¡El cliente ha sido eliminado exitosamente!';
    alerta.mostrar = true;
  } catch (error) {
    console.error('Error al eliminar cliente: ', error);
    alerta.tipo = 'error';
    alerta.mensaje = 'Hubo un error al intentar eliminar el cliente. Por favor, intenta de nuevo.';
    alerta.mostrar = true;
  } finally {
    cargandoEliminar.value = false;
  }
};
</script>

<template>
  <div>
    <div class="flex justify-end mb-6">
      <RouterLink to="agregar-cliente">Agregar Cliente</RouterLink>
    </div>
    <Heading>{{ titulo }}</Heading>

    <!-- Componente de Alerta UX para feedback -->
    <div class="mt-6">
      <Alerta
        v-if="alerta.mostrar"
        :tipo="alerta.tipo"
        :duracion="4000"
        @close="alerta.mostrar = false"
      >
        {{ alerta.mensaje }}
      </Alerta>
    </div>

    <div v-if="existenClientes">
      <div class="flow-root mx-auto mt-8 p-5 bg-white shadow rounded-xl border border-gray-100">
        <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table class="w-full table-fixed divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" class="w-4/12 p-2 text-left text-sm font-extrabold text-gray-600">Nombre</th>
                  <th scope="col" class="w-3/12 p-2 text-left text-sm font-extrabold text-gray-600">Empresa</th>
                  <th scope="col" class="w-2/12 p-2 text-center text-sm font-extrabold text-gray-600">Estado</th>
                  <th scope="col" class="w-3/12 p-2 text-center text-sm font-extrabold text-gray-600">Acciones</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <!-- Componente Clientes -->
                <Clientes
                  v-for="cliente in clientes"
                  :key="cliente.id"
                  :cliente="cliente"
                  @cambiar-estado="cambiarEstado"
                  @eliminar-cliente="abrirModalEliminar"
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="bg-white shadow py-10 px-5 text-center border border-gray-100 mt-10 rounded-xl">
      <p class="text-2xl font-bold text-gray-600">No hay clientes</p>
    </div>

    <!-- Modal de confirmación estilizado -->
    <ConfirmModal
      :open="modalEliminar"
      :nombre-cliente="clienteAEliminar?.nombre || ''"
      :cargando="cargandoEliminar"
      @confirmar="confirmarEliminar"
      @cancelar="cancelarEliminar"
    />
  </div>
</template>
