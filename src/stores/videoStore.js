import { create } from "zustand";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export const useVideoStore = create((set) => ({
  videoIds: [],
  likesLoading: true,
  isNoVideo: false,

  fetchVideoIds: async () => {
    const user = auth.currentUser;
    if (!user) {
      set({ likesLoading: false });
      return;
    }
    const snap = await getDoc(doc(db, "userLikes", user.uid));
    const ids = snap.data()?.likes || [];
    set({
      videoIds: ids,
      isNoVideo: ids.length === 0,
      likesLoading: false,
    });
  },

  setVideoIds: (ids) =>
    set({
      videoIds: ids,
      isNoVideo: ids.length === 0,
    }),
}));
