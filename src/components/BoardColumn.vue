<template>
  <section>
    <header>
      <h3>{{ name }}</h3>
      <span class="delete" @click="deleteList"> X </span>
    </header>
    <BoardTasksList
      :listId="listId"
      :tasks="getTasksByList(listId)" />
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BoardTasksList from '@/components/BoardTasksList.vue';
import TasksStore from '@/store/TasksStore';
import { mapState } from 'pinia';

export default defineComponent({
  name: 'BoardColumn',

  // Mis propiedades y verificación de tipos
  props: {
    listId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },

  // Mis componentes
  components: {
    BoardTasksList,
  },

  computed: {
    ...mapState(TasksStore, ['getTasksByList']),
  },

  // Mis métodos
  methods: {
    deleteList() {
      // Eliminamos las tareas de la columna
      /* eslint-disable no-alert */
      // eslint-disable-next-line no-restricted-globals
      if (confirm('¿Eliminar tarjeta de tareas?')) {
        this.$emit('delete-list', this.listId);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
section {
  box-sizing: border-box;
  background-color: #d4dce2;
  border-radius: 5px;
  box-shadow: 0 0 0 0.5px rgba(49, 49, 93, 0.03), 0 2px 5px 0 rgba(49, 49, 93, 0.1),
    0 1px 2px 0 rgba(0, 0, 0, 0.08);
  margin: 1rem;
  padding: 1rem;
  width: 100%;

  // Media Queries: realizamos el cáculo
  @media screen and (min-width: 600px) {
    width: calc(50% - 2rem - 2px);
  }
  @media screen and (min-width: 1024px) {
    width: calc(33% - 2rem - 2px);
  }
  @media screen and (min-width: 1200px) {
    width: calc(25% - 2rem - 2px);
  }
}

header {
  color: #37474f;
  margin: 0;
  padding-bottom: 1rem;
  display: flex;
  justify-content: space-between;
}

h3 {
  margin: 0;
}
.delete {
  color: #37474f;
  &:hover {
    color: #ce5454;
    font-weight: bold;
    cursor: pointer;
  }
}
</style>
