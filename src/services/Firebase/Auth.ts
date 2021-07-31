import User from '@/models/IUser';
import Service from './index';

// Recurso
const Auth = Service.auth;

// Operaciones
export default {

  /**
   * Devuelve el usuario activo
   * @returns {user} Objeto User Google Auth
   */
  async getActiveUser(): Promise<any> {
    return Auth.currentUser;
  },

  /**
   * Realiza el login con Google: https://firebase.google.com/docs/auth/web/google-signin?hl=es_419
   * @returns {user} Objeto User Google Auth
   */
  async loginGoogle(): Promise<any> {
    const res = await Auth.signInWithPopup(Service.providerGoogle);
    return res.user;
  },

  /**
   * Realiza el logout: https://firebase.google.com/docs/auth/web/password-auth?hl=es_419
   */
  async logoutGoogle(): Promise<any> {
    return Auth.signOut();
  },
};
