import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCpHomsKIrYkfPXoBMiHuGmNo2Z9DsKzyI",
    authDomain: "blogg-e6a1b.firebaseapp.com",
    projectId: "blogg-e6a1b",
    storageBucket: "blogg-e6a1b.appspot.com",
    messagingSenderId: "790021628408",
    appId: "1:790021628408:web:78b122e4155ecf690d760d"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth= getAuth(app);
const provider= new GoogleAuthProvider();
export {auth,provider};