import { ref, set, onValue, get } from 'firebase/database'

const config = {
  apiKey: process.env.GATSBY_FIREBASE_API_KEY,
  authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.GATSBY_FIREBASE_DATABASE_URL,
  projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
  storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.GATSBY_FIREBASE_APP_ID,
}

// This function creates the Firebase singleton for the app
let firebaseInstance
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

let databaseInstance
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
export async function getValueRealtime(valueRef, callback) {
  const database = await getDb()

  onValue(ref(database, valueRef), callback)
}

/**
 * This function gets a value from the database, but does not respond to changes
 * to the value in the database
 */
export async function getValueOnce(valueRef, callback) {
  const database = await getDb()

  get(ref(database, valueRef)).then(callback)
}

/**
 * This function sets a value in the database
 */
export async function setValue(valueRef, value) {
  const database = await getDb()

  set(ref(database, valueRef), value)
}
