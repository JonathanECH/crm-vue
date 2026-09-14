<script setup>
import { onMounted, ref, computed } from 'vue';
import ClienteService from '@/services/ClienteService';
import Clientes from '@/components/Clientes.vue';
import RouterLink from '@/components/UI/RouterLink.vue';
import Heading from '@/components/UI/HeadingVue.vue';

//Variables
const clientes = ref([]);

//Hook onMounted
onMounted(async () => {
  try {
    const { data } = await ClienteService.obtenerClientes()
    clientes.value = data
  } catch (error) {
    console.log(error)
  }
});

// Props
defineProps({
  titulo: {
    type: String
  }
});

//--- Métodos ---

const existenClientes = computed(() => clientes.value.length > 0)
//Cuando se ejecuta un cambio de estado se actualiza el estado del cliente en el array
const cambiarEstado = (id, estado) => {
  ClienteService.cambiarEstado(id, !estado)
    .then(({ data }) => {
      clientes.value = clientes.value.map(cliente => cliente.id === id ? data : cliente)
    })
    .catch(error => console.log('Error al cambiar estado: ', error))
};
</script>

<template>
  <div>
    <div class="flex justify-end mb-6">
      <RouterLink to="agregar-cliente">Agregar Cliente</RouterLink>
    </div>
    <Heading>{{ titulo }}</Heading>
    <div v-if="existenClientes">

      <div v-if="existenClientes" class="flow-root mx-auto  mt-10 p-5 bg-white shadow">
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
                <!--Componente Clientes-->
                <Clientes v-for="cliente in clientes" :key="cliente.id" :cliente="cliente"
                  @cambiar-estado="cambiarEstado" />
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </div>
    <div v-else class="bg-white shadow py-10 px-5 text-center border border-gray-100 mt-10">
      <p class="text-2xl font-bold text-gray-600">No hay clientes</p>
    </div>
  </div>
</template>
