<script setup>
import { RouterLink } from 'vue-router';
defineProps({
  to: {
    type: String
  },
})
</script>
<template>
  <div>
    <RouterLink :to="{ name: to }" class="block md:inline-block rounded-xl bg-blue-600 text-white
    uppercase font-bold text-sm shadow hover:bg-blue-500 py-2 px-3">
      <slot></slot>
    </RouterLink>
  </div>
</template>
