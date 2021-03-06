/* eslint-disable @typescript-eslint/no-explicit-any */
// Un ejemplo de Store con Pinia

import Task from '@/models/ITask';
import { defineStore } from 'pinia';
import Service from '@/services/Firebase';
import Tasks from '@/services/Firebase/Tasks';

const TasksStore = defineStore({
  // id es único para identificarlo con las DevTools
  id: 'TasksStore',
  state: () => ({
    tasks: [] as Task[],
    listener: {},
  }),

  // Nos devuelven datos del objeto o el objeto, o computados
  getters: {
    Tasks: (state) => state.tasks,
    getTasksByList: (state) => (listID: string) => (state.tasks.filter((task) => task.list === listID))
      // Si lo quiero por orden alfabético
      // .sort((a, b) => a.name.localeCompare(b.name)),
      // si la quiero por fecha
      .sort((a, b) => Number(a.createdAt) - Number(b.createdAt)),
  },
  actions: {
    setTasks(newTasks: Task[]) {
      this.tasks = newTasks;
    },

    clearTasks() {
      this.tasks = [] as Task[];
    },

    async getNewTaskId(listId: string): Promise<any> {
      return Tasks.getNewId(listId);
    },

    addTask(newTask: any) {
      console.log('Task Store addTask ->', newTask);
      const myTask = this.tasks.find((task) => task.id === newTask.id);
      if (!myTask) {
        this.tasks.push({
          id: newTask.id,
          name: newTask.name,
          createdAt: newTask.createdAt,
          list: newTask.list,
          completed: newTask.completed,
        });
      }
    },

    updateTask(updateTask: any) {
      console.log('Task Store updateTask ->', updateTask);
      const index = this.tasks.findIndex((task) => task.id === updateTask.id);
      if (index !== -1) {
        this.tasks[index] = {
          id: updateTask.id,
          name: updateTask.name,
          createdAt: updateTask.createdAt,
          list: updateTask.list,
          completed: updateTask.completed,
        };
      }
    },

    deleteTask(deleteTask: any) {
      console.log('Task Store deleteTask ->', deleteTask);
      const index = this.tasks.findIndex((task) => task.id === deleteTask.id);
      if (index !== -1) {
        this.tasks.splice(index, 1);
      }
    },

    async createTask(newTask: Task) {
      console.log('TasksStore createTask ->', newTask);
      await Tasks.createTask(newTask);
    },

    async removeTask(myTask: Task) {
      console.log('TasksStore removeTask ->', myTask);
      // Hay que borrarTasks todas las tareas
      await Tasks.removeTask(myTask);
    },

    async getTasks(): Promise<any> {
      // Detectar cambios en tiempo real de una sub o colleccion concreta. Lo hago así para no navegar con los id de la lista
      // https://firebase.google.com/docs/firestore/query-data/queries
      // Para qeu funcione bien pues se traería todas, lo mejor es filtarlas con un where y ponerle a la tarea el autor/usuario
      this.listener = Service.db.collectionGroup('tasks')
        .onSnapshot((querySnapshot) => {
          querySnapshot.docChanges().forEach(async (change) => {
            if (change.type === 'added') {
              console.log('Tasks Store Change Added --> ', change.doc.data());
              this.addTask(change.doc.data());
            }
            if (change.type === 'modified') {
              console.log('LTasksStore Change Modified --> ', change.doc.data());
              this.updateTask(change.doc.data());
            }
            if (change.type === 'removed') {
              console.log('Tasks Store Change Modified --> ', change.doc.data());
              this.deleteTask(change.doc.data());
            }
          });
        });
    },

    async removeTasksByList(listID: string) {
      console.log('TasksStore removeAll');
      const myTasks = this.getTasksByList(listID);
      myTasks.forEach(async (task) => {
        await this.removeTask(task);
      });
    },
  },

});

export default TasksStore;
