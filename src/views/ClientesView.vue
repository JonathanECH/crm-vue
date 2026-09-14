<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import RouterLink from '@/components/UI/RouterLink.vue';
import Heading from '@/components/UI/HeadingVue.vue';

const clientes = ref([])
onMounted(() => {
  axios('http://localhost:4000/clientes')
    .then(({ data }) => clientes.value = data)
    .catch(error => console.log(error))
})

defineProps({
  titulo: {
    type: String
  }
})
</script>

<template>
  <div>
    <div class="flex justify-end mb-6">
      <RouterLink to="agregar-cliente">Agregar Cliente</RouterLink>
    </div>
    <Heading>{{ titulo }}</Heading>
  </div>
</template>
