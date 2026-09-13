<script setup>
import RouterLink from '@/components/UI/RouterLink.vue';
import Heading from '@/components/UI/HeadingVue.vue';

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
