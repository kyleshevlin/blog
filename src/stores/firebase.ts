import type { FirebaseApp } from 'firebase/app'
import {
  ref,
  set,
  onValue,
  get,
  Database,
  DataSnapshot,
} from 'firebase/database'
import { atom } from 'nanostores'

const config = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.PUBLIC_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.PUBLIC_FIREBASE_APP_ID,
}

// This function creates the Firebase singleton for the app
let firebaseInstance: FirebaseApp
export const getFirebase = async () => {
  if (firebaseInstance) return firebaseInstance

  // Lazily load firebase
  const appModule = await import('firebase/app')

  // Initialize app
  appModule.initializeApp(config)

  // Get the initialized app
  const app = appModule.getApp()

  // Store it as the singleton for the site
  firebaseInstance = app

  return app
}

let databaseInstance: Database
export async function getDb() {
  if (databaseInstance) return databaseInstance

  const app = await getFirebase()
  // Lazily load the database module
  const dbModule = await import('firebase/database')

  // get the database for the app
  const database = dbModule.getDatabase(app)

  // store it as a singleton for the site
  databaseInstance = database

  return database
}

/**
 * This function gets a value from the database. It runs the callback every time
 * the value changes in the database
 */
export async function getValueRealtime(
  valueRef: string,
  callback: (snapshot: DataSnapshot) => unknown,
) {
  const database = await getDb()

  onValue(ref(database, valueRef), callback)
}

/**
 * This function gets a value from the database, but does not respond to changes
 * to the value in the database
 */
export async function getValueOnce(
  valueRef: string,
  callback: (snapshot: DataSnapshot) => unknown,
) {
  const database = await getDb()

  get(ref(database, valueRef)).then(callback)
}

/**
 * This function sets a value in the database
 */
export async function setValue(valueRef: string, value: unknown) {
  const database = await getDb()

  set(ref(database, valueRef), value)
}

export const dbStore = atom({
  getDb,
  getValueOnce,
  getValueRealtime,
  setValue,
})
