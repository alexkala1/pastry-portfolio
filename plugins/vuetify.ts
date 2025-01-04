import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import 'vuetify/styles'; // Import Vuetify styles
import '@mdi/font/css/materialdesignicons.css'


export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      themes: {
        pinkTheme: {
          dark: false,
          colors: {
            primary: '#E91E63', // Pink
            secondary: '#F48FB1', // Light Pink
            accent: '#FF80AB', // Bright Pink
            background: '#FFF3F5', // Soft Pinkish White
            surface: '#FFE4E8', // Slightly darker pink background
            error: '#FF5252', // Red for errors
            info: '#29B6F6', // Light Blue for info
            success: '#66BB6A', // Green for success
            warning: '#FFA726', // Orange for warnings
          },
        },
      },
      defaultTheme: 'pinkTheme',
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
