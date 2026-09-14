<script setup>
import { reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import ClienteService from '@/services/ClienteService';
import RouterLink from '@/components/UI/RouterLink.vue';
import Heading from '@/components/UI/HeadingVue.vue';
import Alerta from '@/components/UI/AlertaVue.vue';
import { FormKit } from '@formkit/vue';

//Variables
const router = useRouter();
const route = useRoute();
const { id } = route.params;
const formData = reactive({});

const alerta = reactive({
  mostrar: false,
  tipo: 'success',
  mensaje: ''
});

//Hook onMounted
onMounted(() => {
  ClienteService.obtenerCliente(id)
    .then(({ data }) => {
      Object.assign(formData, data);
    })
    .catch((error) => {
      console.error('Error al obtener el formData:', error);
    });
});
defineProps({
  titulo: {
    type: String
  },
});

//--- Metodos ---

const handleAlertaClose = () => {
  alerta.mostrar = false;
  if (alerta.tipo === 'success') {
    router.push({ name: 'listado-clientes' });
  }
};

const handleSubmit = (data) => {
  ClienteService.actualizarCliente(id, data)
    .then(() => {
      alerta.tipo = 'success';
      alerta.mensaje = '¡El cliente se ha actualizado con éxito! Redirigiendo al listado...';
      alerta.mostrar = true;
    })
    .catch((error) => {
      console.error('Error al actualizar el cliente:', error);
      alerta.tipo = 'error';
      alerta.mensaje = 'Hubo un error al actualizar el cliente. Por favor, intenta nuevamente.';
      alerta.mostrar = true;
    });
};
</script>

<template>
  <div>
    <div class="flex justify-end mb-6">
      <RouterLink to="listado-clientes">Volver</RouterLink>
    </div>

    <Heading>{{ titulo }}</Heading>

    <!-- Componente de Alerta UX -->
    <div class="mt-6">
      <Alerta v-if="alerta.mostrar" :tipo="alerta.tipo" :duracion="4000" @close="handleAlertaClose">
        {{ alerta.mensaje }}
      </Alerta>
    </div>

    <div class="mx-auto my-8 bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
      <div class="mx-auto w-full py-10 px-8 sm:px-12">
        <FormKit type="form" submit-label="Actualizar cliente" incomplete-message="Completa los Campos Requeridos"
          @submit="handleSubmit">

          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <FormKit type="text" label="Nombre" name="nombre" prefix-icon="avatarMan" placeholder="Ej. Carlos"
              validation="required" :validation-messages="{ required: 'El Nombre es obligatorio' }"
              v-model="formData.nombre" />

            <FormKit type="text" label="Apellido" name="apellido" prefix-icon="avatarMan" placeholder="Ej. Mendoza"
              validation="required" :validation-messages="{ required: 'El Apellido es obligatorio' }"
              v-model="formData.apellido" />
          </div>

          <FormKit type="email" label="Correo Electrónico" name="correo" prefix-icon="email"
            placeholder="cliente@empresa.com" validation="required|email" :validation-messages="{
              required: 'El Correo es obligatorio',
              email: 'Escribe un correo válido'
            }" v-model="formData.correo" />

          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <FormKit type="text" label="Empresa" name="empresa" prefix-icon="people" placeholder="Nombre de la empresa"
              v-model="formData.empresa" />

            <FormKit type="text" label="Puesto" name="puesto" prefix-icon="tools" placeholder="Ej. Gerente de Ventas"
              v-model="formData.puesto" />
          </div>

          <FormKit type="tel" label="Teléfono" name="telefono" prefix-icon="telephone" placeholder="0412-123-4321"
            validation="?matches:/^[0-9]{4}-[0-9]{3}-[0-9]{4}$/"
            :validation-messages="{ matches: 'Formato no válido (Ej. 0412-123-4321)' }" v-model="formData.telefono" />

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
