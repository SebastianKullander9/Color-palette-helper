"use client";
import React, { useEffect } from "react";
import { useColorsStore } from "../store/colorsStore";
import { useShadesStore } from "../store/shadesStore";

interface ColorInputProps {
    scrollToElement: () => void;
}

export default function ColorInput({ scrollToElement }: ColorInputProps) {
    const { colors, errors, setColors, convertToArray, checkForErrors, hasHydrated } = useColorsStore((state) => state);
    const { clearShades } = useShadesStore((state) => state);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        checkForErrors(colors);

        convertToArray(colors);
        scrollToElement();
    }

    useEffect(() => {
        if(!hasHydrated) return;

        if (colors === "") {
            clearShades();
            convertToArray("");
        }
    }, [colors])


    return (
        <div className="w-sm px-8 sm:px-0">
            <form className="flex flex-col w-full" onSubmit={handleSubmit}>
                <label htmlFor="colorInput" className="text-base text-gray-700 mb-4">Enter one or more base colors in HEX, RGB, or HSL format. Separate multiple values with spaces, commas, or newlines.</label>
                <textarea
                    id="colorInput"
                    className="bg-white border-gray-100 border-1 p-4 rounded-md text-gray-700"
                    rows={6}
                    name="color"
                    value={colors}
                    onChange={(e) => setColors(e.target.value)}
                />
                {errors.color && (
                    <p className="text-sm text-red-500 mt-2" role="alert">{errors.color}</p>
                )}
                <button 
                    type="submit"
                    className="bg-black text-lg p-2 mt-2 rounded-md text-indigo-50 font-bold cursor-pointer hover:shadow-md hover:text-white hover:bg-indigo-500 transition duration-300"
                >
                    Add your hues
                </button>
            </form>
        </div>
    );
}