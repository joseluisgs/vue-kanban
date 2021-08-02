<template>
  <div id="app">
    <AppHeader />
    <router-view class="container"></router-view>
    <notifications position="top right" />
    <AppFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { notify } from '@kyvg/vue3-notification';
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import UserStore from '@/store/UserStore';
import { mapState, mapActions } from 'pinia';

export default defineComponent({
  name: 'App',
  // Mis componentes
  components: {
    AppHeader,
    AppFooter,
  },

  // My LifeHooks
  // Antes de crearme meto el usuartio en la store
  async created() {
    console.log('APP Created');
    // De esta manera cargamos el estado inicial de la store
    await this.checkAuth();
    if (this.user.email) {
      notify({
        title: 'Bienvenido/a',
        text: `Me alegro de verte de nuevo ${this.user.name}`,
      });
    }
  },

  // Mis propiedades computadas
  computed: {
    ...mapState(UserStore, ['user']),
  },

  // Mis métodos
  methods: {
    ...mapActions(UserStore, ['checkAuth']),
  },
});
</script>

<style lang="scss" scoped>
#app {
  box-sizing: border-box;
  color: #37474f;
  margin: 0 auto;
  padding: 0;
  text-align: center;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  // Con esto conseguimos que el fotter siempre esté abajo
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  width: 100%;
}

.container {
  padding-bottom: 1rem;
  // Para el footer indicamos que se expanda lo máximo posible
  flex: 1;
}
</style>
