<template>
  <div class="board-card">
    <router-link :to="{ name: 'Board', params: { name, id } }">
      <span class="board-card-title">❏ {{ name }}</span>
    </router-link>
    <span class="delete" @click="deleteCard"> X </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { notify } from '@kyvg/vue3-notification';

export default defineComponent({
  name: 'BoardCard',

  // Mis propiedades
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },

  // Una forma de emitir eventos es poniendo emit en el setup {emit}
  // La otra es creado la propiedad con el array emmits y luego
  // llamándolo en un método
  // emits: ['delete-board'],
  setup(props, { emit }) {
    function deleteCard() {
      // Eliminamos card y las columnas y tareas asociadas
      /* eslint-disable no-alert */
      // eslint-disable-next-line no-restricted-globals
      if (confirm('¿Eliminar tarjeta?')) {
        notify({
          title: 'Pizarra eliminada',
          text: 'Se ha eliminado la pizarra con sus tarjetas de tareas asociadas',
          type: 'error',
        });
        emit('delete-board', props.id);
      }
    }

    // Mi visibilidad
    return {
      deleteCard,
    };
  },
});
</script>

<style lang="scss" scoped>
.board-card {
  background-color: #546e7a;
  box-shadow: 0 0 0.5px rgba(49, 49, 93, 0.03), 0 2px 5px 0 rgba(49, 49, 93, 0.1),
    0 1px 2px 0 rgba(49, 49, 93, 0.08);
  box-sizing: border-box;
  border-radius: 5px;
  color: #fafafa;
  margin: 0.5rem 1.5rem;
  padding: 1rem;
  // Alineado a la izquierda sin que se vea el hiperenlace
  text-align: left;
  text-decoration: none;
  transition: all 600ms ease;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  a {
    text-decoration: none;
    color: #fafafa;
  }

  // Equivale a poner board-card-title
  &-title {
    font-size: 1.2rem;
  }

  // Al hacerle hover
  &:hover {
    background-color: #90a4ae;
    font-weight: bold;
  }

  // Adaptamos con media queries
  @media screen and (min-width: 600px) {
    width: 33%;
  }
  @media screen and (min-width: 1024px) {
    width: 250px;
  }
}
.delete {
  color: #779aac;
  &:hover {
    color: #ce5454;
    font-weight: bold;
    cursor: pointer;
  }
}
</style>
