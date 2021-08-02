/* eslint-disable @typescript-eslint/no-explicit-any */
// Un ejemplo de Store con Pinia

import Board from '@/models/IBoard';
import { defineStore } from 'pinia';
import Service from '@/services/Firebase';
import Boards from '@/services/Firebase/Boards';
import ListsStore from '@/store/ListsStore';

const BoardsStore = defineStore({
  // id es único para identificarlo con las DevTools
  id: 'BoardsStore',
  state: () => ({
    boards: [] as Board[],
    listener: {},
  }),

  // Nos devuelven datos del objeto o el objeto, o computados
  getters: {
    Boards: (state) => state.boards,
  },

  // Mutan el objeto síncrona y asíncronamente,
  // equivalen a acciones y mutaciones
  actions: {
    // eslint-disable-next-line
    setBoards(newBoards: Board[]) {
      this.boards = newBoards;
    },

    // BOARDS
    async getNewBoardId() {
      return Boards.getNewId();
    },

    addBoard(newBoard: any) {
      console.log('Boards Store addBoard ->', newBoard);
      const myBoard = this.boards.find((board) => board.id === newBoard.id);
      if (!myBoard) {
        this.boards.push({
          id: newBoard.id,
          name: newBoard.name,
          user: newBoard.user,
          createdAt: newBoard.createdAt,
        });
      }
    },

    updateBoard(updateBoard: any) {
      console.log('Boards Store updateBoard ->', updateBoard);
      const index = this.boards.findIndex((board) => board.id === updateBoard.id);
      if (index !== -1) {
        this.boards[index] = {
          id: updateBoard.id,
          name: updateBoard.name,
          user: updateBoard.user,
          createdAt: updateBoard.createdAt,
        };
      }
    },

    deleteBoard(deleteBoard: any) {
      console.log('Boards Store deleteBoard ->', deleteBoard);
      const index = this.boards.findIndex((board) => board.id === deleteBoard.id);
      if (index !== -1) {
        this.boards.splice(index, 1);
      }
    },

    // Acciones
    async createBoard(newBoard: Board) {
      console.log('BoardsStore createBoard ->', newBoard);
      await Boards.createBoard(newBoard);
      // this.boards.push(newBoard);
    },

    async removeBoard(boardID: string) {
      console.log('BoardsStore removeBoard ->', boardID);
      // Hay que eliminar todas las listas
      await this.removeLists();
      await Boards.removeBoard(boardID);
      // this.boards = this.boards.filter((board) => board.id !== boardID);
    },

    async getBoards(user: string): Promise<any> {
      // console.log('BoardsStore getBoards ->', user);
      // const boards = await Boards.getBoards(user);
      // this.boards = boards;

      // Detectar cambios en tiempo real
      this.listener = await Service.boardsCollection.where('user', '==', user)
        .onSnapshot(async (querySnapshot) => {
          querySnapshot.docChanges().forEach((change) => {
            if (change.type === 'added') {
              console.log('Boards Store Change Added --> ', change.doc.data());
              this.addBoard(change.doc.data());
            }
            if (change.type === 'modified') {
              console.log('Boards Store Change Modified --> ', change.doc.data());
              this.updateBoard(change.doc.data());
            }
            if (change.type === 'removed') {
              console.log('Boards Store Change Modified --> ', change.doc.data());
              this.deleteBoard(change.doc.data());
            }
          });
          // Aqui cargo todas las listas
          const listsStore = ListsStore();
          console.log('BoardsStore getList');
          await listsStore.getLists();
        });
    },

    async getBoard(boardID: string): Promise<any> {
      return Boards.getBoard(boardID);
    },

    async removeLists() {
      const listsStore = ListsStore();
      await listsStore.removeAll();
    },
  },
});

export default BoardsStore;
