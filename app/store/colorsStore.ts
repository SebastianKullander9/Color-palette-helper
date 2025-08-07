import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createJSONStorage, persist } from "zustand/middleware";
import { colorRegexGlobal } from "../utils/regex";

type State = {
    colors: string;
    colorsArray: string[];
    errors: Record<string, string>;
    hasHydrated: boolean;
}

type Actions = {
    setColors: (newColors: string) => void;
    convertToArray: (colors: string) => void;
    checkForErrors: (colors: string) => void;
}

export const useColorsStore = create<State & Actions>() (
    persist(immer((set) => ({
        colors: "",
        colorsArray: [],
        errors: {},
        hasHydrated: false,
        setColors: (newColors: string) =>
            set((state) => {
                state.colors = newColors;
            }),
        convertToArray: (colors: string) => {
            const matches = colors.match(colorRegexGlobal);
            const uniqueColors = Array.from(new Set(matches));

            set((state) => {
                state.colorsArray = uniqueColors;
            })
        },
        checkForErrors: (colors: string) => {
            const newErrors: Record<string, string> = {};

            if (!colors.trim()) {
                newErrors.color = "Required";
            } else {
                const matches = colors.match(colorRegexGlobal) || [];
                
                if (matches.length === 0) {
                    newErrors.color = "Please enter at least one valid color. (hex, rgb or hsl)"
                }
            }

            set((state) => {
                state.errors = newErrors;
            });
        }
    })), {
        name: "colorsStorage",
        storage: createJSONStorage(() => localStorage),
        onRehydrateStorage: () => (state) => {
            state!.hasHydrated = true;
        },
    }),
);