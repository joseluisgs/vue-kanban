// Un ejemplo de Store con Pinia

import User from '@/models/IUser';
import { defineStore } from 'pinia';
import Service from '@/services/Firebase';
import Auth from '@/services/Firebase/Auth';
import BoardsStore from '@/store/BoardsStore';

const UserStore = defineStore({
  // id es único para identificarlo con las DevTools
  id: 'UserStore',
  state: () => ({
    user: {} as User,
    listener: {},
  }),

  // Nos devuelven datos del objeto o el objeto, o computados
  getters: {
    User: (state) => state.user,
  },

  // Mutan el objeto síncrona y asíncronamente,
  // equivalen a acciones y mutaciones
  actions: {
    // eslint-disable-next-line
    async setUser(newUser: any) {
      this.user = {
        name: newUser.displayName,
        email: newUser.email,
        displayName: newUser.displayName,
        photoURL: newUser.photoURL,
      };
      // Cargamos sus tableros
      const boardsStore = BoardsStore();
      this.listener = await boardsStore.getBoards(this.user.email);
    },

    async checkAuth() {
      Service.auth.onAuthStateChanged(async (user) => {
        console.log('UserStore checkAuth ->', user);
        if (user) {
          await this.setUser(user);
        }
      });
    },

    async activeUser() {
      const actualUser = await Auth.getActiveUser();
      if (actualUser) {
        this.setUser(actualUser);
      }
    },

    async logIn() {
      const actualUser = await Auth.loginGoogle();
      if (actualUser) {
        this.setUser(actualUser);
      }
    },

    async logOut() {
      await Auth.logoutGoogle();
      this.user = {} as User;
      // Libremos los tableros que tenga
      // Nos cargamos el listener si es necesario para no recibir mas
      this.listener = {};
    },

  },
});

export default UserStore;
