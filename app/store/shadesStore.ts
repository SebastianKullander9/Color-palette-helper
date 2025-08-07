import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createJSONStorage, persist } from "zustand/middleware";

export type ColorShades = {
    name: string;
    original_hex: string;
    shades: number[][];
}

type State = {
    shades: ColorShades[];
};

type Actions = {
    setShades: (shades: ColorShades[]) => void;
    clearShades: () => void;
};

export const useShadesStore = create<State & Actions>()(
    persist(immer((set) => ({
        shades: [],
        setShades: (shades: ColorShades[]) => {
            set((state) => {
                state.shades = shades;
            })
        },
        
        clearShades: () => {
            set((state) => {
                state.shades = [];
            })
        }
    })), {
        name: "shadesStorage",
        storage: createJSONStorage(() => localStorage),
    })
);