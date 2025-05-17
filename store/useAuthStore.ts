// store/auth.store.ts
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { AuthService } from "@/services/auth.service";
import { AuthStore, User } from "@/types/auth.types";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useRouter } from "expo-router";


export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,
      signin: async (data) => {
        try {
          set({ isLoading: true, error: null });
          const user = await AuthService.signin(data);
          if (!user) throw new Error("Gagal login");
          const safeUser: User = {
            username: user.username ?? "",
            email: user.email ?? "",
            avatar: user.avatar ?? ""
          };
          set({ user: safeUser });
        } catch{
          set({ error: "Gagal login" });
        } finally {
          set({ isLoading: false });
        }
      },

signup: async (data) => {
  set({ isLoading: true, error: null });
    try {
      const savedUser = await AuthService.signup(data);
      const safeUser: User = {
        username: savedUser.username ?? "",
        email: savedUser.email ?? "",
        avatar: savedUser.avatar ?? ""
      };
        set({ user: safeUser });
      } catch (err: any) {
        set({ error: err.message });
      } finally {
        set({ isLoading: false });
      }
  },
      signout: async () => {
        await signOut(auth)
        set({ user: null });
      },
    }),
    {
      name: "auth-storage", 
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);


