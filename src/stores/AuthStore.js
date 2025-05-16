import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; // getDoc 임포트
import { auth, db } from "../firebase";

const authStore = create(
  persist(
    (set) => ({
      user: null,
      userProfile: null,
      isLoading: true,
      setUser: (user, profile) => {
        console.log("🟢 setUser 호출, user:", user, "profile:", profile);
        set({ user, userProfile: profile, isLoading: false });
      },
      clearUser: () => {
        console.log("🟢 clearUser 호출");
        set({ user: null, userProfile: null, isLoading: false });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user }),
    }
  )
);

onAuthStateChanged(auth, async (user) => {
  console.log("🔵 onAuthStateChanged 호출, user:", user);
  if (user) {
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    };
    try {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      const profile = docSnap.exists() ? docSnap.data() : null;
      console.log("🟢 getDoc 호출, profile:", profile);
      authStore.getState().setUser(userData, profile);
    } catch (error) {
      console.error("🔴 getDoc 오류:", error.message, error.code);
      authStore.getState().setUser(userData, null);
    }
  } else {
    console.log("🔵 비로그인 상태, clearUser 호출");
    authStore.getState().clearUser();
  }
});

export default authStore;
