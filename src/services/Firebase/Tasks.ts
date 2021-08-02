/* eslint-disable @typescript-eslint/no-explicit-any */
import Task from '@/models/ITask';
import Service from './index';
// Recurso
const Lists = Service.listsCollection;

// Operaciones
export default {

  async getNewId(listID: string): Promise<string> {
    const task = await Lists.doc(listID).collection('tasks').doc();
    return task.id;
  },

  async getTask(listID: string, taskID: string): Promise<any> {
    return (await Lists.doc(listID).collection('tasks').doc(taskID)
      .get()).data();
  },

  async createTask(task: Task): Promise<any> {
    return Lists.doc(task.list).collection('tasks').doc(task.id)
      .set(task);
  },

  async removeTask(task: Task): Promise<any> {
    // Hay que borrar antes las tareas asociadas
    return Lists.doc(task.list).collection('tasks').doc(task.id)
      .delete();
  },

  // async getTasks(listID: string): Promise<any> {
  //   const tasks = [] as Task[];
  //   const querySnapshot = await Lists.doc(listID).collection('tasks')
  //     .where('list', '==', listID).get();
  //   querySnapshot.forEach(async (doc) => {
  //     await tasks.push({
  //       id: doc.id,
  //       name: doc.data().name,
  //       createdAt: doc.data().createdAt,
  //       list: doc.data().list,
  //       completed: doc.data().completed,
  //     });
  //   });
  //   return tasks;
  // },
};
