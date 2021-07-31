/* eslint-disable @typescript-eslint/no-explicit-any */
import Service from './index';

// Recurso
const Auth = Service.auth;

// Operaciones
export default {

  async getActiveUser(): Promise<any> {
    return Auth.currentUser;
  },

  async loginGoogle(): Promise<any> {
    const res = await Auth.signInWithPopup(Service.providerGoogle);
    return res.user;
  },

  async logoutGoogle(): Promise<any> {
    return Auth.signOut();
  },
};
