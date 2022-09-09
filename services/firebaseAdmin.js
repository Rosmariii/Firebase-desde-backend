import { initializeApp } from "firebase-admin/app";
import admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { readFile } from "fs/promises";
const serviceAccount = await readFile(
  "./services/serviceAccountKey.json",
  "utf-8"
);
const serviceAccountJson = JSON.parse(serviceAccount);

class FirebaseAdmin {
  constructor() {
    this.app = initializeApp({
      credential: admin.credential.cert(serviceAccountJson),
    });
    this.auth = getAuth();
  }

  verifyIdToken(idToken) {
    return getAuth().verifyIdToken(idToken);
  }
}

const firebaseAdmin = new FirebaseAdmin();
export default firebaseAdmin;
