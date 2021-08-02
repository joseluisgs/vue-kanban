/* eslint-disable @typescript-eslint/no-explicit-any */
import List from '@/models/IList';
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

  async createTask(listID: string, task: Task): Promise<any> {
    return Lists.doc(listID).collection('tasks').doc(task.id)
      .set(task);
  },

  async removeTask(listID: string, taskID: string): Promise<any> {
    // Hay que borrar antes las tareas asociadas
    return Lists.doc(listID).collection('tasks').doc(taskID)
      .delete();
  },

  async getTasks(listID: string): Promise<any> {
    const tasks = [] as Task[];
    Lists.doc(listID).collection('tasks')
      .where('list', '==', listID)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          tasks.push({
            id: doc.data().id,
            name: doc.data().title,
            createdAt: doc.data().createdAt,
            completed: doc.data().completed,
            list: doc.data().list,
          });
        });
      });
    return tasks;
  },
};
