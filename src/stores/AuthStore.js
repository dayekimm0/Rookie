import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const authStore = create(
  persist(
    (set) => ({
      user: null,
      userProfile: null,
      isLoading: true,
      gamePlayed: false,
      comments: [], //playdetail 댓글 추가
      tempAddress: null, //임시 배송 주소
      setUser: (user, profile, gamePlayed) => {
        console.log(
          "🟢 setUser 호출, user:",
          user,
          "profile:",
          profile,
          "gamePlayed:",
          gamePlayed
        );
        set({ user, userProfile: profile, isLoading: false, gamePlayed });
      },
      setGamePlayed: (played) => set({ gamePlayed: played }),
      clearUser: () => {
        console.log("🟢 clearUser 호출");
        set({
          user: null,
          userProfile: null,
          isLoading: false,
          tempAddress: null,
        });
      },

      // 주소 수정 (실제 userProfile 주소 변경) - 안전하게 null 체크 추가
      updateUserAddress: (newAddress) =>
        set((state) => {
          const updatedProfile = {
            ...state.userProfile,
            ...newAddress,
          };
          return { userProfile: { ...updatedProfile } };
        }),

      updateTempAddress: (newAddress) =>
        set((state) => {
          const current = state.tempAddress || {};
          const isDifferent =
            current.zonecode !== newAddress.zonecode ||
            current.address !== newAddress.address ||
            current.detail !== newAddress.detail ||
            current.username !== newAddress.username ||
            current.phoneNumber !== newAddress.phoneNumber;

          if (!isDifferent) return {};

          return {
            tempAddress: {
              ...current,
              ...newAddress,
            },
          };
        }),

      clearTempAddress: () => set(() => ({ tempAddress: null })),

      //댓글 추가
      addComment: (comment) =>
        set((state) => ({
          comments: [
            ...state.comments,
            {
              ...comment,
              author: state.userProfile?.nickname,
            },
          ],
        })),
    }),

    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        userProfile: state.userProfile, // userProfile 꼭 포함
        gamePlayed: state.gamePlayed,
        comments: state.comments,
      }),
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
      console.log("🟢 getDoc 호출, profile:", profile);

      // gamePlayed 정보 가져오기
      const gameUserRef = doc(db, "gameUser", user.uid);
      const gameSnap = await getDoc(gameUserRef);
      const gamePlayed = gameSnap.exists() ? gameSnap.data().gamePlayed : false;

      const currentState = authStore.getState();

      // 상태가 모두 변경되었을 때만 setUser 호출
      if (
        !currentState.user ||
        currentState.user.uid !== userData.uid ||
        currentState.userProfile !== profile ||
        currentState.gamePlayed !== gamePlayed
      ) {
        console.log("🟢 상태가 변경되어 setUser 호출");
        authStore.getState().setUser(userData, profile, gamePlayed);
      } else {
        console.log("🔴 상태 변경 없음");
      }
    } catch (error) {
      console.error("🔴 getDoc 오류:", error.message, error.code);
      authStore.getState().setUser(userData, null, false);
    }
  } else {
    authStore.getState().clearUser();
  }
});

export default authStore;
