import { CSSProperties, PropsWithChildren } from "react";
import styles from "./background.module.scss";

export function Background({
    children,
    color_a,
    color_b,
}: PropsWithChildren & { color_a: string; color_b: string; }) {
    //let style = `linear-gradient(111deg, ${color_a} 0%, ${color_b} 100%)`;

    // This incantation allows us to dynamically set the hover color from JS. Don't ask. It just works.
    const style: CSSProperties = { ["--accent_color_a" as any]: `${color_a}`, ["--accent_color_b" as any]: `${color_b}` } as unknown as CSSProperties;
    return (
        <div className={styles.background} style={style}>
            {children}
        </div>
    );
}
