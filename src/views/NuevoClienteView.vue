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
    <div class="flex justify-end mb-6">
      <RouterLink to="inicio">Volver</RouterLink>
    </div>

    <Heading>{{ titulo }}</Heading>

    <div
      class="mx-auto my-8 bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
      <div class="mx-auto w-full py-10 px-8 sm:px-12">
        <FormKit type="form" submit-label="Agregar Cliente" incomplete-message="Completa los Campos Requeridos">

          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <FormKit
              type="text"
              label="Nombre"
              prefix-icon="avatarMan"
              placeholder="Ej. Carlos"
              validation="required"
              :validation-messages="{ required: 'El Nombre es obligatorio' }"
            />

            <FormKit
              type="text"
              label="Apellido"
              prefix-icon="avatarMan"
              placeholder="Ej. Mendoza"
              validation="required"
              :validation-messages="{ required: 'El Apellido es obligatorio' }"
            />
          </div>

          <FormKit
            type="email"
            label="Correo Electrónico"
            prefix-icon="email"
            placeholder="cliente@empresa.com"
            validation="required|email"
            :validation-messages="{
              required: 'El Correo es obligatorio',
              email: 'Escribe un correo válido'
            }"
          />

          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <FormKit
              type="text"
              label="Empresa"
              prefix-icon="people"
              placeholder="Nombre de la empresa"
            />

            <FormKit
              type="text"
              label="Puesto"
              prefix-icon="tools"
              placeholder="Ej. Gerente de Ventas"
            />
          </div>

          <FormKit
            type="tel"
            label="Teléfono"
            prefix-icon="telephone"
            placeholder="0412-123-4321"
            validation="?matches:/^[0-9]{4}-[0-9]{3}-[0-9]{4}$/"
            :validation-messages="{ matches: 'Formato no válido (Ej. 0412-123-4321)' }"
          />

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
