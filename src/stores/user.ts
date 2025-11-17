import { create } from "zustand";
import { MyMiddlewares } from "./storeMiddlewares";

type TUserStore = {
  user: TUser | null;
  updateUser: (newUser: TUser | null) => void;
  removeUser: () => void;  _hasHydrated?: boolean;
  setHasHydrated: (hasRehydrated: boolean) => void;
};

export const useUserStore = create<TUserStore>()(
  MyMiddlewares(
    (set) => ({
      user: null,
      _hasHydrated: false,
      updateUser: (newUser: TUser | null) =>
        set((state) => ({ ...state, user: newUser })),
      removeUser: () => set((state) => ({ ...state, user: null })),
      setHasHydrated: (state) => {
        set({
          _hasHydrated: state,
        });
      },
    }),
    {
      name: "user",
      onRehydrateStorage(state) {
        return () => state.setHasHydrated(true);
      },
    }
  )
);
