<template>
  <section>
    <div class="board-header">
      <h3>
        <span>
          <router-link class="my-boards" :to="{ name: 'Home' }">Mis Paneles</router-link>
        </span>
        ▸ {{ name }}
      </h3>
      <input
        type="text"
        placeholder="Añadir lista..."
        v-model.trim="listName"
        @keyup.enter="addList()"
      />
    </div>
    <div class="board-container">
      <BoardColumn
        v-for="list in boardsList"
        :key="list.id"
        :listId="String(list.id)"
        :name="list.name"
        @delete-list="deleteList"
      >
      </BoardColumn>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { notify } from '@kyvg/vue3-notification';
import BoardColumn from '@/components/BoardColumn.vue';
import List from '@/models/IList';

export default defineComponent({
  name: 'Board',

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

  // Mis componentes
  components: {
    BoardColumn,
  },

  setup() {
    // Mis datos reactivos
    const listName = ref('');
    const boardsList = ref<List[]>([
      { id: Date.now().toString(), name: 'Todo', createdAt: Date.now() },
      { id: Date.now().toString(), name: 'Doing', createdAt: Date.now() },
      { id: Date.now().toString(), name: 'Done', createdAt: Date.now() },
    ]);

    // Mis métodos

    function addList() {
      console.log('addList ->', listName.value);
      if (listName.value) {
        boardsList.value.push({
          id: Date.now().toString(),
          name: listName.value,
          createdAt: Date.now(),
        });
        notify({
          title: 'Tarjeta de tareas creada',
          text: `Se ha creado la tarjeta de tareas: ${listName.value}`,
          type: 'success',
        });
        listName.value = '';
      }
    }
    // Tamabien puedo usar funciones flecha si quiero
    const deleteList = (listId: string) => {
      console.log('deleteList ->', listId);
      boardsList.value = boardsList.value.filter((list) => list.id !== listId);
    };

    // Visibilidad
    return {
      listName,
      boardsList,
      addList,
      deleteList,
    };
  },

});
</script>

<style lang="scss" scoped>
section {
  text-align: left;
}

h3 {
  color: #37474f;
  text-align: left;
  margin: 1.5rem;

  .my-boards {
    color: #546e7a;
    text-decoration: none;
  }
}

input {
  display: block;
  background-color: #607d8b;
  border: 2px solid #779aac;
  border-radius: 3px;
  border-radius: 3px;
  box-shadow: 0 0 0 0.5px rgba(49, 49, 93, 0.03), 0 2px 5px 0 rgba(49, 49, 93, 0.1),
    0 1px 2px 0 rgba(0, 0, 0, 0.08);
  color: #607d8b;
  font-size: 1.1rem;
  margin: 0 1rem;
  outline: 0;
  padding: 1rem;
  transition: all 600ms ease;

  &:active,
  &:focus {
    background-color: #fafafa;
  }

  &::placeholder {
    color: #fafafa;
  }
}

.board-header {
  display: block;
}

.board-container {
  min-height: 30vh;
  // alineado y justificado al comienzo
  box-sizing: border-box;
  align-items: flex-start;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
}
</style>
