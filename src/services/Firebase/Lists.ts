/* eslint-disable @typescript-eslint/no-explicit-any */
import List from '@/models/IList';
import Service from './index';
// Recurso
const Lists = Service.listsCollection;

// Operaciones
export default {

  async getNewId(): Promise<string> {
    const list = await Lists.doc();
    return list.id;
  },

  async getList(listID: string): Promise<any> {
    return (await Lists.doc(listID).get()).data();
  },

  async createList(list: List): Promise<any> {
    return Lists.doc(list.id).set(list);
  },

  async removeList(listID: string): Promise<any> {
    // Hay que borrar antes las tareas asociadas
    return Lists.doc(listID).delete();
  },
};
