import { User } from "@shared/types/user.type";
import { create } from "zustand";

type AuthStoreType = {
  user: User | null;
  isFetchingUser: boolean;
};

type AuthActionType = {
  setUser: (_user: User) => void;
  setIsFetchingUser: (_flag: boolean) => void;
  clearUser: () => void;
};

export const useAuthStore = create<AuthStoreType & AuthActionType>((set) => ({
  user: null,
  isFetchingUser: true,
  setIsFetchingUser: (isFetchingUser: boolean) => set({ isFetchingUser }),
  setUser: (user: User) => set({ user }),
  clearUser: () => set({ user: null }),
}));
