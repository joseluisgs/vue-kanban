// Un ejemplo de Store con Pinia

import User from '@/models/IUser';
import Board from '@/models/IBoard';
import { defineStore } from 'pinia';
import Service from '@/services/Firebase';
import Boards from '@/services/Firebase/Boards';

const BoardsStore = defineStore({
  // id es único para identificarlo con las DevTools
  id: 'BoardsStore',
  state: () => ({
    boards: [] as Board[],
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

    async getNewBoardId() {
      return Boards.getNewId();
    },

    async createBoard(newBoard: Board) {
      await Boards.createBoard(newBoard);
      this.boards.push(newBoard);
    },

    async removeBoard(boardID: string) {
      await Boards.removeBoard(boardID);
      this.boards = this.boards.filter((board) => board.id !== boardID);
    },

    async getBoards(user: string) {
      const boards = await Boards.getBoards(user);
      this.boards = boards;
    },
  },
});

export default BoardsStore;
