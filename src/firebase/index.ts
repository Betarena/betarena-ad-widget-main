// ~~~~~~~~~~~~~~~~~~
// firebase/index.ts
// ~~~~~~~~~~~~~~~~~~

import firebase from 'firebase/app' // rollup bundle issue with ESM import
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'
import {
  readable
} from 'svelte/store'

// firebase config with non-auth properties skipped
const firebaseConfig = {
  apiKey: 'AIzaSyAouwjs0lIsu_1CyGl7WpjL_WGNFqRfYRk',
  authDomain: 'revolution-20b13.firebaseapp.com',
  projectId: 'revolution-20b13',
  databaseURL: "https://revolution-20b13.firebaseio.com/",
  // Project number:
  // 755147220298
}

// console.info('firebase', firebase)
// Initialize the Firebase APP
firebase.initializeApp(firebaseConfig)
// Get a reference to the Google Authentication Service
export const auth = firebase.auth()
// Instantiate the Google Firebase Authentication Service
export const googleProvider = new firebase.auth.GoogleAuthProvider()
// Get a reference to the Firestore Service
export const db = firebase.firestore()
// Get a reference to the Real Database Service
export const db_real = firebase.database()