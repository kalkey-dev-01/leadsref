import firebase from 'firebase'

const firebaseConfig = {

}

// Init Firebase
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

const db = firebase.firestore()

export { firebase, db }
