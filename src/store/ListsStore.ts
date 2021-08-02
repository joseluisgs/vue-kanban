/* eslint-disable @typescript-eslint/no-explicit-any */
// Un ejemplo de Store con Pinia

import List from '@/models/IList';
import Task from '@/models/ITask';
import { defineStore } from 'pinia';
import Service from '@/services/Firebase';
import Lists from '@/services/Firebase/Lists';
import Tasks from '@/services/Firebase/Tasks';

const ListsStore = defineStore({
  // id es único para identificarlo con las DevTools
  id: 'ListsStore',
  state: () => ({
    lists: [] as List[],
  }),

  // Nos devuelven datos del objeto o el objeto, o computados
  getters: {
    Lists: (state) => state.lists,
  },

  // Mutan el objeto síncrona y asíncronamente,
  // equivalen a acciones y mutaciones
  actions: {
    // eslint-disable-next-line
    setLists(newLists: List[]) {
      this.lists = newLists;
    },

    clearLists() {
      this.lists = [] as List[];
    },

    async getNewListId(): Promise<any> {
      return Lists.getNewId();
    },

    async addList(newList: any) {
      console.log('Lists Store addList ->', newList);
      const myList = this.lists.find((list) => list.id === newList.id);
      if (!myList) {
        const myTasks = await this.searchTasks(newList.id);
        this.lists.push({
          id: newList.id,
          name: newList.name,
          createdAt: newList.createdAt,
          board: newList.board,
          tasks: myTasks,
        });
      }
    },

    async updateList(updateList: any) {
      console.log('Lists Store updateList ->', updateList);
      const index = this.lists.findIndex((list) => list.id === updateList.id);
      if (index !== -1) {
        const myTasks = await this.searchTasks(updateList.id);
        this.lists[index] = {
          id: updateList.id,
          name: updateList.name,
          createdAt: updateList.createdAt,
          board: updateList.board,
          tasks: myTasks,
        };
      }
    },

    deleteList(deleteList: any) {
      console.log('Lists Store deleteBoard ->', deleteList);
      const index = this.lists.findIndex((list) => list.id === deleteList.id);
      if (index !== -1) {
        this.lists.splice(index, 1);
      }
    },

    // Acciones
    async createList(newList: List) {
      console.log('ListsStore createList ->', newList);
      await Lists.createList(newList);
    },

    async removeList(listID: string) {
      console.log('ListsStore removeBoard ->', listID);
      // Hay que borrar antes todas las tareas
      await this.removeTasks(listID);
      await Lists.removeList(listID);
    },

    async getLists(boardID: string): Promise<any> {
      // Detectar cambios en tiempo real
      return Service.listsCollection.where('board', '==', boardID)
        .onSnapshot((querySnapshot) => {
          querySnapshot.docChanges().forEach(async (change) => {
            if (change.type === 'added') {
              console.log('Lists Store Change Added --> ', change.doc.data());
              await this.addList(change.doc.data());
            }
            if (change.type === 'modified') {
              console.log('Lists Store Change Modified --> ', change.doc.data());
              await this.updateList(change.doc.data());
            }
            if (change.type === 'removed') {
              console.log('Lists Store Change Modified --> ', change.doc.data());
              this.deleteList(change.doc.data());
            }
          });
        });
    },

    async removeAll() {
      console.log('ListsStore removeAll');
      this.lists.forEach(async (list) => {
        await this.removeList(list.id);
      });
    },

    async removeTasks(listID: string) {
      console.log('ListsStore removeTasks');
      const index = this.lists.findIndex((list) => list.id === listID);
      if (index !== -1) {
        this.lists[index].tasks.forEach(async (task) => {
          await Tasks.removeTask(this.lists[index].id, task.id);
        });
        this.lists[index].tasks = [];
      }
    },

    async searchTasks(listID: string) {
      return Tasks.getTasks(listID);
    },

    async getNewTaskId(listID: string) {
      return Tasks.getNewId(listID);
    },

    async createTask(listID: string, task: Task) {
      console.log('ListsStore addTask');
      const index = this.lists.findIndex((list) => list.id === listID);
      if (index !== -1) {
        await Tasks.createTask(listID, task);
        this.lists[index].tasks.push(task);
      }
    },
  },
});

export default ListsStore;
