import create from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set, get) => ({
      userInfo: "",
      setUserInfo: (user) => set({ userInfo: user }),
      accessToken: "",
      setAccessToken: (token) => set({ accessToken: token }),
    }),
    {
      name: "userInfo", // unique name
      getStorage: () => sessionStorage,
    }
  )
);
