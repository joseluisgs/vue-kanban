<template>
  <section>
    <div class="board-header">
      <h3>
        <span>
          <router-link class="my-boards" :to="{ name: 'Home' }">Mis Paneles</router-link>
        </span>
        ▸ {{ boardName }}
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
        v-for="list in listsStore.lists"
        :key="list.id"
        :listId="list.id"
        :name="list.name"
        :boardId="props.id"
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
import ListsStore from '@/store/ListsStore';
import BoardsStore from '@/store/BoardsStore';
import { mapActions } from 'pinia';

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

  data: () => ({
    boardName: '',
  }),

  async created() {
    // esto es por si entramos directamente en el enlace
    if (!this.name) {
      const myBoard = await this.getBoard(this.id);
      this.boardName = myBoard.name;
    } else {
      this.boardName = this.name;
    }

    // Obtenemos las tareas
    await this.getLists(this.id);
  },

  // Mis métodos
  methods: {
    ...mapActions(BoardsStore, ['getBoard']),
    ...mapActions(ListsStore, ['getLists']),
  },

  setup(props) {
    const listsStore = ListsStore();

    // Mis datos reactivos
    const listName = ref('');

    // Mis métodos

    async function addList() {
      console.log('addList ->', listName.value);
      if (listName.value) {
        try {
          const listID = await listsStore.getNewListId();
          const newList = {
            id: listID,
            name: listName.value,
            createdAt: Date.now(),
            board: props.id,
          } as List;
          // Añadimos
          await listsStore.createList(newList);
          notify({
            title: 'Tarjeta de tareas creada',
            text: `Se ha creado la tarjeta de tareas: ${listName.value}`,
            type: 'success',
          });
          listName.value = '';
        } catch (error) {
          notify({
            title: 'Error',
            text: error.message,
            type: error,
          });
        }
      }
    }
    // Tamabien puedo usar funciones flecha si quiero
    async function deleteList(listId: string) {
      console.log('deleteList ->', listId);
      try {
        await listsStore.removeList(listId);
      } catch (error) {
        notify({
          title: 'Error',
          text: error.message,
          type: error,
        });
      }
    }

    // Visibilidad
    return {
      listName,
      listsStore,
      addList,
      deleteList,
      props,
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
