import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDYCAflAfX1rjbPPq5brIAYsHLtPIdqyRM",
  authDomain: "rookie-dd013.firebaseapp.com",
  projectId: "rookie-dd013",
  storageBucket: "rookie-dd013.firebasestorage.app",
  messagingSenderId: "168723301266",
  appId: "1:168723301266:web:c9466d6b105964d961b74b",
};
// 효아의 고유키임 나중에 본인껄로 싹싹 바꿔주세요

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

// 영속성 설정: localStorage
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("🟢 Firebase 인증 영속성: localStorage 설정 완료");
  })
  .catch((error) => {
    console.error("🔴 영속성 설정 실패:", error);
  });

export { auth, db };
