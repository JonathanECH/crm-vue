<script setup>
import { computed} from 'vue';
import {RouterLink} from 'vue-router';
import ClienteService from '@/services/ClienteService';
const props = defineProps({
  cliente: {
    type: Object,
    required: true
  }
})
const nombreCliente = computed(() => {
  return `${props.cliente.nombre} ${props.cliente.apellido}`
})

const clienteEstado = computed(() => {
  return props.cliente.estado === 1 ? 'Activo' : 'Inactivo'
})
</script>

<template>
  <tr>

    <td class="whitespace-nowrap p-4 truncate">
      <p class="text-xl font-bold text-gray-900">{{ nombreCliente }}</p>
      <p class="text-sm text-gray-500">{{ cliente.correo }}</p>
    </td>
    <td class="whitespace-nowrap p-4 truncate">
      <p class="text-xl font-bold text-gray-900">{{ cliente.empresa }}</p>
      <p class="text-sm text-gray-500">{{ cliente.puesto }}</p>
    </td>
    <td class="whitespace-nowrap p-4 truncate text-center">
      <button class="block w-fit mx-auto px-4 py-1 text-sm font-bold rounded-full cursor-pointer"
        :class="[cliente.estado === 1 ? 'bg-green-200 text-green-900' : 'bg-red-200 text-red-900']" @click="cambiarEstado(cliente.id)">{{ clienteEstado }}</button>
    </td>
    <td class="whitespace-nowrap p-4">

      <div class="flex gap-2 justify-center"><!-- ? params es un objeto que se pasa a la ruta ej: clientes/7FjaonAe7KM-->
        <RouterLink :to="{ name: 'editar-cliente', params: { id: cliente.id } }"
          class="bg-blue-500 hover:bg-blue-600 text-indigo-100 font-bold py-2 px-4 rounded text-xs">Editar</RouterLink>
        <button class="bg-red-500 hover:bg-red-600 text-indigo-100 font-bold py-2 px-4 rounded text-xs">Eliminar</button>
      </div>
    </td>
  </tr>
</template>
