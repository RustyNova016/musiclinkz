export type AccentColors = {
    color_a: string;
    color_b: string;
};

export function default_accent_colors(): AccentColors {
    return {
        color_a: "rgb(223, 43, 73)",
        color_b: "rgb(232, 117, 11)",
    };
}
