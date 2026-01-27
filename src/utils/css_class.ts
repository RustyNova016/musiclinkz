import { CSSProperties } from "react";

export type PropsWithStyle = { style?: CSSProperties; }

export type PropsWithClassname = {
    className?: string | undefined;
}

export function classnames(...names: (string | undefined)[]) {
    let result = "";

    for (const name of names) {
        if (name === undefined) {
            continue
        }
        result += name + " ";
    }

    return result;
}
