import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

class FirebaseFront {
  constructor() {
    this.app = initializeApp({
      apiKey: "",
      authDomain: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: "",
      appId: "",
    });
    this.auth = getAuth();
  }

  createUser(email, password) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }
  sigIn(email, password) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
}

const firebaseFront = new FirebaseFront();
export default firebaseFront;

// firebaseFront
//   .sigIn("a@a.com", "123456789")
//   .then((userCredential) => console.log(userCredential))
//   .catch((error) => console.log(error));
