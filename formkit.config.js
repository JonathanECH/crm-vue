import { generateClasses } from '@formkit/themes'

const config = {
  config: {
    classes: generateClasses({
      global: {
        // Estas clases se aplicarán a todos los inputs (text, email, tel, etc.)
        outer: 'mb-5',
        label: 'block mb-1.5 font-semibold text-gray-700 text-sm',
        inner:
          'flex items-center border border-gray-300 rounded-lg shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600 overflow-hidden bg-white transition-all',
        input:
          'w-full px-3 py-2.5 border-none bg-transparent focus:outline-none text-gray-700 text-sm',
        help: 'text-xs text-gray-500 mt-1',
        message: 'text-red-500 text-xs mt-1.5 font-medium',
        prefixIcon: 'w-5 h-5 ml-3 text-gray-400',
        suffixIcon: 'w-5 h-5 mr-3 text-gray-400',
      },
      submit: {
        // Estilos específicos para el botón de enviar
        outer: 'mt-8',
        input:
          'w-full sm:w-auto !bg-gray-600 hover:!bg-indigo-700 text-white font-bold py-2.5 px-6 rounded-lg transition-colors cursor-pointer border-none shadow-md',
      },
    }),
  },
}

export default config
