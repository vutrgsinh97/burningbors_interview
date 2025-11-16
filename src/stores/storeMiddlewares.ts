import { StateCreator } from "zustand";
import { devtools, persist, PersistOptions } from "zustand/middleware";

type TFunc<T> = StateCreator<T, [], [], T>;
type IMyMiddlewares<T> = StateCreator<T, [], [["zustand/devtools", never], ["zustand/persist", T]]>;

export function MyMiddlewares<T>(func: TFunc<T>, options: PersistOptions<T>): IMyMiddlewares<T> {
  return devtools(
    persist(func, {
      ...options,
      name: `${options.name}-storage`,
      // storage: createJSONStorage(() => sessionStorage),
    }),
  );
}
