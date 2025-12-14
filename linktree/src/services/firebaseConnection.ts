import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore" 
import { getAuth } from "firebase/auth" 


const firebaseConfig = {
    apiKey: "AIzaSyAY067f1GU_f0ev6thVpFIhcgBZq2fZ6lY",
    authDomain: "linktreecurso.firebaseapp.com",
    projectId: "linktreecurso",
    storageBucket: "linktreecurso.firebasestorage.app",
    messagingSenderId: "278684781480",
    appId: "1:278684781480:web:2e0b1e4a6cd326ed5deb9d"
}


const firebaseApp = initializeApp(firebaseConfig)

const auth = getAuth(firebaseApp)

const db = getFirestore(firebaseApp)

export {db, auth}