<script setup>
import RouterLink from '@/components/UI/RouterLink.vue';
import Heading from '@/components/UI/HeadingVue.vue';
import { FormKit } from '@formkit/vue';
defineProps({
  titulo: {
    type: String
  }
})
</script>

<template>
  <div>
    <div class="flex justify-end">
      <RouterLink to="inicio">Volver</RouterLink>
    </div>
    <Heading>{{ titulo }}</Heading>
    <div class="mx-auto mt-10 bg-white shadow">
      <div class="mx-auto md:w-2/3 py-20 px-6">
        <FormKit type="form">
          <FormKit type="text" label="Nombre" prefix-icon="add" help="Escriba el nombre del cliente que desea resistrar"
            validation="required" :validation-messages="{
              required: 'El nombre del cliente es Obligatorio',
            }" />
        </FormKit>
      </div>

    </div>
  </div>
</template>

<style>
.formkit-wrapper {
  max-width: 100%;
}
</style>
