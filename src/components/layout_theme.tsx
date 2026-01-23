"use client";

import {
    createContext,
    CSSProperties,
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    useState,
} from "react";


export type Color = [Number, Number, Number];

type LayoutContextType = undefined | Dispatch<SetStateAction<{
    primary_color: number[];
    secondary_color: number[];
}>>;

export const LayoutContext = createContext<LayoutContextType>(undefined);

export function LayoutTheme(props: PropsWithChildren) {
    const [colors, setColors] = useState({
        primary_color: [0, 50, 176],
        secondary_color: [232, 119, 14],
    });

    let theme: CSSProperties = {
        background: `linear-gradient(111deg, rgba(${colors.primary_color[0]}, ${colors.primary_color[1]}, ${colors.primary_color[2]}, 1) 0%, rgba(${colors.secondary_color[0]}, ${colors.secondary_color[1]}, ${colors.secondary_color[2]}, 1) 100%)`,
    };

    return (
        <div style={theme}>
            <LayoutContext value={setColors}>{props.children}</LayoutContext>
        </div>
    );
}
