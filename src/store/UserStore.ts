// Un ejemplo de Store con Pinia

import User from '@/models/IUser';
import { defineStore } from 'pinia';
import Service from '@/services/Firebase';

const Auth = Service.auth;

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
    async checkAuth() {
      Auth.onAuthStateChanged(async (user) => {
        await console.log('UserStore checkAuth ->', user);
        if (user) {
          this.user = {
            name: user.displayName || '',
            email: user.email || '',
            displayName: user.displayName || '',
            photoURL: user.photoURL || '',
          };
        }
      });
    },

    async actualUser(): Promise<User> {
      const actualUser = await Auth.currentUser;
      if (actualUser) {
        this.user = {
          name: actualUser.displayName || '',
          email: actualUser.email || '',
          displayName: actualUser.displayName || '',
          photoURL: actualUser.photoURL || '',
        };
        return this.user;
      }
      return {};
    },

    async loginGoogle(): Promise<User> {
      const res = await Auth.signInWithPopup(Service.providerGoogle);
      console.log('UserStore loginGoogle ->', res.user);
      if (res.user) {
        this.user = {
          name: res.user.displayName || '',
          email: res.user.email || '',
          displayName: res.user.displayName || '',
          photoURL: res.user.photoURL || '',
        };
        return this.user;
      }
      return {};
    },

    async logoutGoogle() {
      await Auth.signOut();
      this.user = {};
    },

  },
});

export default UserStore;
