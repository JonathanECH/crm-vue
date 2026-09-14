<script setup>
import { onMounted, ref, computed } from 'vue';

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
    <td class="whitespace-nowrap p-4 truncate">
      <p class="text-xl font-bold text-gray-900">{{ clienteEstado }}</p>
    </td>
    <td class="whitespace-nowrap p-4">

      <div class="flex gap-2 justify-center">
        <!-- <RouterLink :to="{ name: 'editar-cliente', params: { id: cliente.id } }"
          class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded text-xs">Editar</RouterLink> -->
        <button
          class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded text-xs">Eliminar</button>
      </div>
    </td>
  </tr>
</template>
