// Un ejemplo de Store con Pinia

import User from '@/models/IUser';
import { defineStore } from 'pinia';
import Service from '@/services/Firebase';
import Auth from '@/services/Firebase/Auth';

const UserStore = defineStore({
  // id es único para identificarlo con las DevTools
  id: 'UserStore',
  state: () => ({
    user: {} as User,
  }),

  // Nos devuelven datos del objeto o el objeto, o computados
  getters: {
    User: (state) => state.user,
  },

  // Mutan el objeto síncrona y asíncronamente,
  // equivalen a acciones y mutaciones
  actions: {
    // eslint-disable-next-line
    setUser(newUser: any) {
      this.user = {
        name: newUser.displayName,
        email: newUser.email,
        displayName: newUser.displayName,
        photoURL: newUser.photoURL,
      };
    },

    async checkAuth() {
      Service.auth.onAuthStateChanged(async (user) => {
        await console.log('UserStore checkAuth ->', user);
        if (user) {
          this.setUser(user);
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
      this.user = {};
    },

  },
});

export default UserStore;
