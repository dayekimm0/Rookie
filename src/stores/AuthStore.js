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
        console.log("🟢 clearUser 호출");
        set({
          user: null,
          userProfile: null,
          isLoading: false,
        });
      },
      // 주소 수정
      updateUserAddress: (newAddress) =>
        set((state) => ({
          userProfile: {
            ...state.userProfile,
            ...newAddress,
          },
        })),
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
      console.log("🟢 getDoc 호출, profile:", profile);

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
        console.log("🟢 상태가 변경되어 setUser 호출");
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
