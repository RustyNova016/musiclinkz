"use client";

import {
    createContext,
    CSSProperties,
    PropsWithChildren,
    use,
    useContext,
    useState,
} from "react";
const ColorThief = require("colorthief");

export type Color = [Number, Number, Number];

export const LayoutContext = createContext(undefined);

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

export function MainColorSetter({ colors }: { colors }) {
    const setColors = useContext(LayoutContext);
    setColors(colors);

    return <></>;
}

export async function set_background_colors(img: string, setter) {
    let palletes = await ColorThief.getPalette(img, 2);
    setter({
        primary_color: palletes[0],
        secondary_color: palletes[1],
    });
}
