<script setup>
import { watch, onUnmounted } from 'vue';

const props = defineProps({
  open: {
    type: Boolean,
    default: false
  },
  nombreCliente: {
    type: String,
    default: ''
  },
  titulo: {
    type: String,
    default: '¿Eliminar cliente?'
  },
  mensaje: {
    type: String,
    default: 'Esta acción no se puede deshacer y se eliminarán permanentemente todos los datos de este registro.'
  },
  textoConfirmar: {
    type: String,
    default: 'Sí, eliminar'
  },
  textoCancelar: {
    type: String,
    default: 'Cancelar'
  },
  cargando: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['confirmar', 'cancelar']);

// Manejador para cerrar con la tecla Escape
const handleKeydown = (e) => {
  if (e.key === 'Escape' && props.open && !props.cargando) {
    emit('cancelar');
  }
};

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeydown);
    } else {
      window.removeEventListener('keydown', handleKeydown);
    }
  },
  { immediate: true }
);

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});

const clickBackdrop = () => {
  if (!props.cargando) {
    emit('cancelar');
  }
};
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto"
        @click="clickBackdrop"
        aria-modal="true"
        role="dialog"
      >
        <!-- Tarjeta del Modal con animación de escala y fade -->
        <Transition
          appear
          enter-active-class="transition duration-300 ease-out transform"
          enter-from-class="opacity-0 scale-95 translate-y-3"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition duration-200 ease-in transform"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-3"
        >
          <div
            v-if="open"
            class="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 sm:p-8 text-center shadow-2xl border border-gray-100 transition-all"
            @click.stop
          >
            <!-- Botón de cerrar superior -->
            <button
              type="button"
              class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-1.5 transition-colors cursor-pointer disabled:opacity-50"
              :disabled="cargando"
              @click="$emit('cancelar')"
              title="Cerrar modal"
            >
              <span class="sr-only">Cerrar</span>
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
                />
              </svg>
            </button>

            <!-- Icono llamativo de advertencia / peligro -->
            <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-rose-600 ring-8 ring-rose-50 mb-5">
              <svg class="h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>

            <!-- Título -->
            <h3 class="text-xl font-bold text-gray-900 tracking-tight mb-2">
              {{ titulo }}
            </h3>

            <!-- Indicador destacado con nombre del cliente si existe -->
            <div v-if="nombreCliente" class="my-3 inline-flex items-center gap-1.5 bg-rose-50 border border-rose-200 text-rose-700 px-3 py-1 rounded-lg text-sm font-semibold max-w-full">
              <svg class="h-4 w-4 shrink-0 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span class="truncate">{{ nombreCliente }}</span>
            </div>

            <!-- Mensaje descriptivo -->
            <p class="text-sm text-gray-600 leading-relaxed mb-6">
              {{ mensaje }}
            </p>

            <!-- Acciones -->
            <div class="flex flex-col-reverse sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                class="w-full sm:w-1/2 px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-700 font-semibold hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-200 cursor-pointer text-sm shadow-xs disabled:opacity-50"
                :disabled="cargando"
                @click="$emit('cancelar')"
              >
                {{ textoCancelar }}
              </button>

              <button
                type="button"
                class="w-full sm:w-1/2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-[0.98] text-white font-semibold shadow-md shadow-rose-600/20 hover:shadow-lg hover:shadow-rose-600/30 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 transition-all duration-200 cursor-pointer text-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                :disabled="cargando"
                @click="$emit('confirmar')"
              >
                <!-- Spinner de carga si está procesando -->
                <svg
                  v-if="cargando"
                  class="animate-spin -ml-1 mr-1 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>

                <span>{{ cargando ? 'Eliminando...' : textoConfirmar }}</span>
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
