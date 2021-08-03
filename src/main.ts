import { createApp } from 'vue';
import Service from '@/services/Firebase';
import Notifications from '@kyvg/vue3-notification';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

// Firebase
console.log(`⚑ Firebase -> ${Service.defaultProject.name} ✓`);

// Importamos nuestros estilos globales
require('./assets/css/main.scss');

// Para activar el seguimiento en tiempo real del usuario
Service.auth.onAuthStateChanged(() => {
  createApp(App)
    .use(router)
    .use(createPinia())
    .use(Notifications)
    .mount('#app');
});
