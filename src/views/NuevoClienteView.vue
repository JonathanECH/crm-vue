<script setup>
import { reactive } from 'vue'
import RouterLink from '@/components/UI/RouterLink.vue';
import Heading from '@/components/UI/HeadingVue.vue';
import { FormKit } from '@formkit/vue';

defineProps({
  titulo: {
    type: String
  },
})

const cliente = reactive({
  nombre: '',
  apellido: '',
  correo: '',
  telefono: '',
  empresa: '',
  puesto: '',
})

const handleSubmit = (datos) => {
  console.log(datos);
}
</script>

<template>
  <div>
    <div class="flex justify-end mb-6">
      <RouterLink to="inicio">Volver</RouterLink>
    </div>

    <Heading>{{ titulo }}</Heading>

    <div class="mx-auto my-8 bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
      <div class="mx-auto w-full py-10 px-8 sm:px-12">
        <FormKit type="form" submit-label="Agregar Cliente" incomplete-message="Completa los Campos Requeridos"
          @submit="handleSubmit">

          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <FormKit type="text" label="Nombre" name="nombre" prefix-icon="avatarMan" placeholder="Ej. Carlos"
              validation="required" :validation-messages="{ required: 'El Nombre es obligatorio' }"
              :value="cliente.nombre" />

            <FormKit type="text" label="Apellido" name="apellido" prefix-icon="avatarMan" placeholder="Ej. Mendoza"
              validation="required" :validation-messages="{ required: 'El Apellido es obligatorio' }"
              :value="cliente.apellido" />
          </div>

          <FormKit type="email" label="Correo Electrónico" name="correo" prefix-icon="email"
            placeholder="cliente@empresa.com" validation="required|email" :validation-messages="{
              required: 'El Correo es obligatorio',
              email: 'Escribe un correo válido'
            }" :value="cliente.correo" />

          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <FormKit type="text" label="Empresa" name="empresa" prefix-icon="people" placeholder="Nombre de la empresa"
              :value="cliente.empresa" />

            <FormKit type="text" label="Puesto" name="puesto" prefix-icon="tools" placeholder="Ej. Gerente de Ventas"
              :value="cliente.puesto" />
          </div>

          <FormKit type="tel" label="Teléfono" name="telefono" prefix-icon="telephone" placeholder="0412-123-4321"
            validation="?matches:/^[0-9]{4}-[0-9]{3}-[0-9]{4}$/"
            :validation-messages="{ matches: 'Formato no válido (Ej. 0412-123-4321)' }" :value="cliente.telefono" />

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
