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
        // setUser 호출
        set({ user, userProfile: profile, isLoading: false });
      },
      clearUser: () => {
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
  // onAuthStateChanged 호출
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
      authStore.getState().setUser(userData, profile);
    } catch (error) {
      console.error(error.message, error.code);
      authStore.getState().setUser(userData, null);
    }
  } else {
    authStore.getState().clearUser();
  }
});

export default authStore;
