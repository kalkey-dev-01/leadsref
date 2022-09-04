import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyDB5hr0xF-eBhXoaReGCAcW-tAM7uhvx-I',
  authDomain: 'leadsref.firebaseapp.com',
  projectId: 'leadsref',
  storageBucket: 'leadsref.appspot.com',
  messagingSenderId: '166347259011',
  appId: '1:166347259011:web:3d92ba698b32430b8fafb6',
  measurementId: 'G-PJTJ8Y0RWR'
}

// Init Firebase
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

const db = firebase.firestore()

export { firebase, db }
