"use client";

import { useColorsStore } from "../store/colorsStore";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

interface PageNavigationProps {
    upTo?: string;
    downTo?: string;
    scrollOffset?: number;
    scrollTo: (ele: string, offset?: number) => void;
}

export default function NavigatePage({ upTo, downTo, scrollOffset, scrollTo }: PageNavigationProps) {
    const { colorsArray } = useColorsStore((state) => state);

    return (
        <nav aria-label="Page navigation">
            {upTo
            ? <button aria-label="scroll up" onClick={() => scrollTo(upTo, scrollOffset)} className={`absolute top-4 right-4 cursor-pointer ${colorsArray.length === 0 ? "hidden" : ""}`} >
                <IoIosArrowUp size={40} />
            </button> 
            : <></>}
            
            {downTo
            ? <button aria-label="scroll down" onClick={() => scrollTo(downTo)} className={`absolute bottom-4 right-4 cursor-pointer ${colorsArray.length === 0 ? "hidden" : ""}`} >
                <IoIosArrowDown size={40} />
            </button>
            : <></>}
            
        </nav>
    )
}