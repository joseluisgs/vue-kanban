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
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import UserStore from '@/store/UserStore';
import { mapActions, mapState } from 'pinia';
import User from '@/models/IUser';

export default defineComponent({
  name: 'App',
  // Mis componentes
  components: {
    AppHeader,
    AppFooter,
  },

  // Pruebas con con Optional API
  // Mi modelo de datos
  data: () => ({
    myUser: {} as User,
  }),

  async created() {
    console.log('APP Created');
    await this.checkAuth();
    console.log('APP checkAuth', this.user);
    this.myUser = await this.actualUser();
    console.log('APP actualUser', this.myUser);
  },

  computed: {
    ...mapState(UserStore, ['user']),
  },

  methods: {
    ...mapActions(UserStore, ['checkAuth', 'actualUser']),
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
