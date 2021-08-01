<template>
  <section v-if="userStore.user.email" class="home">
    <div class="home-header">
      <h3>Mis Paneles</h3>
      <input
        type="text"
        v-model.trim="boardName"
        placeholder="Añade un nuevo panel"
        @keyup.enter="addBoard"
      />
    </div>
    <div class="boards-collections">
      <BoardCard
        v-for="board in boardsStore.boards"
        :key="board.id"
        :name="board.name"
        :id="board.id"
        @delete-board="deleteBoard"
      />
    </div>
  </section>
  <section v-else>
    <h3 class="mensaje-login">Haz login para ver tus paneles Kanvan y trabajar con tus tareas</h3>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { notify } from '@kyvg/vue3-notification';
import BoardCard from '@/components/BoardCard.vue';
import Board from '@/models/IBoard';
import UserStore from '@/store/UserStore';
import BoardsStore from '@/store/BoardsStore';

export default defineComponent({
  name: 'Home',

  // Mis components
  components: {
    BoardCard,
  },

  setup() {
    const userStore = UserStore();
    const boardsStore = BoardsStore();
    const boardName = ref('');

    // Mis Métodos
    async function addBoard() {
      console.log('addBoard ->', boardName.value);
      if (boardName.value) {
        // Obtenemos el id
        try {
          const boardID = await boardsStore.getNewBoardId();
          const newBoard = {
            id: boardID,
            name: boardName.value,
            createdAt: Date.now(),
            user: userStore.user.email,
          } as Board;
          // Añadimos el nuevo board
          await boardsStore.createBoard(newBoard);
          notify({
            title: 'Panel creado',
            text: `Se ha creado el panel de tareas: ${boardName.value}`,
            type: 'success',
          });
          boardName.value = '';
        } catch (error) {
          notify({
            title: 'Error',
            text: error.message,
            type: error,
          });
        }
      }
    }

    async function deleteBoard(boardID: string) {
      console.log('deleteBoard ->', boardID);
      try {
        await boardsStore.removeBoard(boardID);
      } catch (error) {
        notify({
          title: 'Error',
          text: error.message,
          type: error,
        });
      }
    }

    return {
      userStore,
      boardName,
      boardsStore,
      addBoard,
      deleteBoard,
    };
  },
});
</script>

<style lang="scss" scoped>
section {
  text-align: left;
}
.board-header {
  display: block;
}
h3 {
  //Alinea en un elemento de tipo bloque
  text-align: left;
  margin: 1.5rem;
}
.boards-collections {
  display: flex;
  // Se disponen en columnas sobre una fila
  flex-direction: row;
  // ¿Pueden fluir en varias líneas? Sí (flex-wrap: wrap)
  flex-wrap: wrap;
  // Elementos centrados dentro del flex item
  justify-content: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
}

input {
  display: block;
  box-sizing: border-box;
  background-color: #607d8b;
  border: 2px solid #779aac;
  border-radius: 3px;
  font-size: 1.1rem;
  // Utilizamos un contorno para evitar
  // que el texto se salga de los bordes y por el radious
  outline: 0;
  padding: 1rem;
  margin: 0.5rem 1.5rem;
  // Tansición entre efectos
  transition: all 600ms ease;

  // Si esta activo cambiamos y le damos ese efecto
  &:focus,
  &:active {
    background-color: white;
    color: #546e7a;
  }
  // Placeholder es blanco
  &::placeholder {
    color: white;
  }
}
.mensaje-login {
  text-align: center;
  margin: 1.5rem;
  padding: 1rem;
  color: #344750;
}
</style>
