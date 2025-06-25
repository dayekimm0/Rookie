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
      likes: [], // 좋아요 리스트 추가
      tempAddress: null, //임시 배송 주소
      setUser: (user, profile, gamePlayed) => {
        set({ user, userProfile: profile, isLoading: false, gamePlayed });
      },
      // 좋아요 부분 코드
      setLikes: (likes) => set({ likes }),
      addLike: (videoId) =>
        set((state) => ({ likes: [...state.likes, videoId] })),
      removeLike: (videoId) =>
        set((state) => ({
          likes: state.likes.filter((id) => id !== videoId),
        })),

      setGamePlayed: (played) => set({ gamePlayed: played }),
      clearUser: () => {
        set({
          user: null,
          userProfile: null,
          isLoading: false,
          tempAddress: null,
        });
        try {
          localStorage.removeItem("auth-storage");
        } catch (e) {
          console.warn("persist 제거 실패", e);
        }
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
      setComments: (comments) => set({ comments }),
      addComment: (comment) =>
        set((state) => ({
          comments: [...state.comments, comment],
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
        likes: state.likes,
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

      // gamePlayed 정보 가져오기
      const gameUserRef = doc(db, "gameUser", user.uid);
      const gameSnap = await getDoc(gameUserRef);
      const gamePlayed = gameSnap.exists() ? gameSnap.data().gamePlayed : false;

      // 좋아요 정보
      const likesSnap = await getDoc(doc(db, "userLikes", user.uid));
      const likesData = likesSnap.exists() ? likesSnap.data().likes || [] : [];

      const currentState = authStore.getState();

      // 상태가 모두 변경되었을 때만 setUser 호출
      if (
        !currentState.user ||
        currentState.user.uid !== userData.uid ||
        currentState.userProfile !== profile ||
        currentState.gamePlayed !== gamePlayed
      ) {
        authStore.getState().setUser(userData, profile, gamePlayed);
        authStore.getState().setLikes(likesData);
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
