// Firebase
// Mi Plantilla genérica
import firebase from 'firebase/app'; // mejor que poner import firebase from 'firebase';

// Firebase y sus servicios
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

// Fichero de configuración de Firebase y lectura de las variables
import FirebaseConfig from './FirebaseConfig';

const firebaseConfig = FirebaseConfig;

// Inicializar Firebase. Es opcional guardarlo en una constante, si lo hago es para imprimirlo o asegurar que funciona
const defaultProject = firebase.initializeApp(firebaseConfig);
// firebase.analytics();

// Elementos de Firebase a usar (Cargamos los que vayamos a usar)
const db = firebase.firestore(); // Base de datos en tiempo real
const auth = firebase.auth(); // Autenticación
// const storage = firebase.storage().ref(); // Almacenamiento

// Métodos de autentificación. Autenticación de Google, poner uno por método de identificación. Se debe eactivar en la consola de Firebase
const providerGoogle = new firebase.auth.GoogleAuthProvider();

// usuario actual
const user = auth.currentUser;

// Colecciones de documentos a usar
// const usersCollection = db.collection('vuekanban-users');
const boardsCollection = db.collection('vuekanban-boards');
const listsCollection = db.collection('vuekanban-lists');
const tasksCollection = db.collection('vuekanban-tasks');

// const likesCollection = db.collection('likes');

// imprimimos el nombre del proyecto, esto espor depurar, luego quitar si se quiere
// console.log(`⚑ Firebase -> ${defaultProject.name} ✓`);

// Creamos los directorios para almacenar los ficheros
// const roomsStorage = storage.child('vuetalk').child('rooms');
// const urlStorage = firebase.storage();

// Exportamos lo que necesitemos
export default {
  // Elementos de firebase
  firebase, // Para algunas opciones como los metadatos
  db,
  auth,
  // Usuario actual
  user,
  defaultProject,
  // Proveedores de servicio para identificarse
  providerGoogle,
  // Colecciones
  // usersCollection,
  boardsCollection,
  listsCollection,
  tasksCollection,
  // Almacenamiento
  // roomsStorage,
  // Para la resolución inversa
  // urlStorage,

};
