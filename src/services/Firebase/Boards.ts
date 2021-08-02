/* eslint-disable @typescript-eslint/no-explicit-any */
import Board from '@/models/IBoard';
import Service from './index';
// Recurso
const Boards = Service.boardsCollection;

// Operaciones
export default {

  async getNewId(): Promise<string> {
    const board = await Boards.doc();
    return board.id;
  },

  async getBoard(boardID: string): Promise<any> {
    return (await Boards.doc(boardID).get()).data();
  },

  async createBoard(board: Board): Promise<any> {
    return Boards.doc(board.id).set(board);
  },

  async removeBoard(boardID: string): Promise<any> {
    return Boards.doc(boardID).delete();
  },

  async getBoards(user: string): Promise<any> {
    const boards = [] as Board[];
    await Boards.where('user', '==', user).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data());
        boards.push({
          id: doc.id,
          name: doc.data().name,
          user: doc.data().user,
          createdAt: doc.data().createdAt,
        });
      });
    });
    return boards;
  },
};
