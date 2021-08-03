// Configuración de firebase si lo quieresponer oculto
// renombra este fichero como FirebaseConfig.js
// https://firebase.google.com/docs/web/setup?hl=es

export default {

  // Desde el JScript
  // apiKey: 'key',
  // authDomain: 'domain',
  // databaseURL: 'database_url',
  // projectId: 'project_id',
  // storageBucket: 'storage_bucket',
  // messagingSenderId: 'messaging_id',
  // appId: 'app_id',
  // measurementId

  // Dede las variables de entrono
  apiKey: process.env.VUE_APP_FIRE_API_KEY,
  authDomain: process.env.VUE_APP_FIRE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIRE_DATABASE_URL,
  projectId: `${process.env.VUE_APP_FIRE_PROJECT_ID}`,
  storageBucket: process.env.VUE_APP_FIRE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIRE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIRE_APP_ID,
  measurementId: process.env.VUE_APP_FIRE_UAP,
};
