import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDYCAflAfX1rjbPPq5brIAYsHLtPIdqyRM",
  authDomain: "rookie-dd013.firebaseapp.com",
  projectId: "rookie-dd013",
  storageBucket: "rookie-dd013.firebasestorage.app",
  messagingSenderId: "168723301266",
  appId: "1:168723301266:web:c9466d6b105964d961b74b",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
