import { create } from "zustand";
import { MyMiddlewares } from "./storeMiddlewares";

type TUserDetailStore = {
  userDetail: TUserDetail | null;
  updateUserDetail: (newUserDetail: TUserDetail | null) => void;
  removeUserDetail: () => void;
  _hasHydrated?: boolean;
  setHasHydrated: (hasRehydrated: boolean) => void;
};

export const useUserDetailStore = create<TUserDetailStore>()(
  MyMiddlewares(
    (set) => ({
      userDetail: null,
      _hasHydrated: false,
      updateUserDetail: (newUserDetail: TUserDetail | null) =>
        set((state) => ({ ...state, userDetail: newUserDetail })),
      removeUserDetail: () => set((state) => ({ ...state, userDetail: null })),
      setHasHydrated: (state) => {
        set({
          _hasHydrated: state,
        });
      },
    }),
    {
      name: "user-detail",
      onRehydrateStorage(state) {
        return () => state.setHasHydrated(true);
      },
    }
  )
);
