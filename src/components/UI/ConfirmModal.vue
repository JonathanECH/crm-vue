<script setup>

</script>

<template>
  <div class="absolute inset-0 bg-black/40 z-10 flex items-center justify-center">
    <div class="relative bg-white py-6 px-10 rounded-md shadow-lg">
      <h2 class="text-center font-bold text-xl">Se elimina el cliente {{ nombreCliente }}</h2>
      <p class="text-center text-gray-800 font-semibold mb-5">¿Estas seguro de eliminar este cliente?</p>
      <div class="flex justify-center gap-3">
        <button class="bg-red-500 hover:bg-red-600 transition-all duration-300 hover:shadow-[0_0_15px_rgba(239,68,68,0.7)]
    hover:shadow-red-500/50 text-indigo-100 font-bold py-2 px-4 rounded text-xs cursor-pointer"
          @click="$emit('confirmar')">Confirmar</button>
        <button class="bg-gray-500 hover:bg-gray-600 transition-all duration-300 hover:shadow-[0_0_15px_rgba(239,68,68,0.7)]
    hover:shadow-gray-500/50 text-indigo-100 font-bold py-2 px-4 rounded text-xs cursor-pointer"
          @click="$emit('cancelar')">Cancelar</button>
      </div>
    </div>
  </div>
</template>
