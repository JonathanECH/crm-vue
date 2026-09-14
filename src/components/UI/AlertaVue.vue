<script setup>
import { computed, onMounted, ref } from 'vue';

const props = defineProps({
  tipo: {
    type: String,
    default: 'success',
    validator: (value) => ['success', 'error', 'warning', 'info', 'danger'].includes(value)
  },
  mensaje: {
    type: String,
    default: ''
  },
  icono: {
    type: Boolean,
    default: true
  },
  dismissible: {
    type: Boolean,
    default: true
  },
  duracion: {
    type: Number,
    default: 0
  }
});

const emit = defineEmits(['close']);

const visible = ref(true);

const cerrarAlerta = () => {
  visible.value = false;
};

const onAfterLeave = () => {
  emit('close');
};

onMounted(() => {
  if (props.duracion > 0) {
    const tiempoVisible = Math.max(props.duracion - 400, 300);
    setTimeout(() => {
      cerrarAlerta();
    }, tiempoVisible);
  }
});

// Mapeo y estilos para cada tipo de alerta
const tipoConfig = computed(() => {
  const currentTipo = props.tipo === 'danger' ? 'error' : props.tipo;

  switch (currentTipo) {
    case 'error':
      return {
        containerClass: 'bg-rose-50 border-rose-500 text-rose-800 shadow-rose-100',
        iconClass: 'text-rose-600',
        progressBarClass: 'bg-rose-500',
        titulo: 'Error'
      };
    case 'warning':
      return {
        containerClass: 'bg-amber-50 border-amber-500 text-amber-900 shadow-amber-100',
        iconClass: 'text-amber-600',
        progressBarClass: 'bg-amber-500',
        titulo: 'Advertencia'
      };
    case 'info':
      return {
        containerClass: 'bg-blue-50 border-blue-500 text-blue-900 shadow-blue-100',
        iconClass: 'text-blue-600',
        progressBarClass: 'bg-blue-500',
        titulo: 'Información'
      };
    case 'success':
    default:
      return {
        containerClass: 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-emerald-100',
        iconClass: 'text-emerald-600',
        progressBarClass: 'bg-emerald-500',
        titulo: 'Éxito'
      };
  }
});
</script>

<template>
  <Transition
    appear
    enter-active-class="transition-all duration-400 ease-out"
    enter-from-class="opacity-0 -translate-y-3 scale-95"
    enter-to-class="opacity-100 translate-y-0 scale-100"
    leave-active-class="transition-all duration-400 ease-in"
    leave-from-class="opacity-100 translate-y-0 scale-100"
    leave-to-class="opacity-0 -translate-y-3 scale-95"
    @after-leave="onAfterLeave"
  >
    <div
      v-if="visible"
      class="relative overflow-hidden rounded-xl border-l-4 border p-4 shadow-md transition-all mb-6"
      :class="tipoConfig.containerClass"
      role="alert"
    >
      <div class="flex items-start gap-3">
        <!-- Iconos según tipo -->
        <div v-if="icono" class="flex-shrink-0 mt-0.5">
          <!-- Success Icon -->
          <svg
            v-if="tipo === 'success'"
            class="h-5 w-5"
            :class="tipoConfig.iconClass"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>

          <!-- Error Icon -->
          <svg
            v-else-if="tipo === 'error' || tipo === 'danger'"
            class="h-5 w-5"
            :class="tipoConfig.iconClass"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
              clip-rule="evenodd"
            />
          </svg>

          <!-- Warning Icon -->
          <svg
            v-else-if="tipo === 'warning'"
            class="h-5 w-5"
            :class="tipoConfig.iconClass"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
              clip-rule="evenodd"
            />
          </svg>

          <!-- Info Icon -->
          <svg
            v-else-if="tipo === 'info'"
            class="h-5 w-5"
            :class="tipoConfig.iconClass"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
              clip-rule="evenodd"
            />
          </svg>
        </div>

        <!-- Contenido de la alerta -->
        <div class="flex-1 text-sm leading-relaxed font-medium">
          <slot>{{ mensaje }}</slot>
        </div>

        <!-- Botón para cerrar -->
        <div v-if="dismissible" class="flex-shrink-0">
          <button
            type="button"
            class="inline-flex rounded-lg p-1 hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors cursor-pointer"
            @click="cerrarAlerta"
            title="Cerrar notificación"
          >
            <span class="sr-only">Cerrar</span>
            <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path
                d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Barra de progreso si tiene duración activa -->
      <div
        v-if="duracion > 0"
        class="absolute bottom-0 left-0 right-0 h-1 bg-black/10 overflow-hidden"
      >
        <div
          class="h-full alerta-progress-bar"
          :class="tipoConfig.progressBarClass"
          :style="{
            animationDuration: `${duracion}ms`
          }"
        ></div>
      </div>
    </div>
  </Transition>
</template>

<style>
@keyframes alertaProgress {
  0% {
    width: 100%;
  }
  100% {
    width: 0%;
  }
}

.alerta-progress-bar {
  animation-name: alertaProgress;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}
</style>
