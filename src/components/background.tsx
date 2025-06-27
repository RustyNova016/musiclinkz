import { PropsWithChildren } from "react";
import styles from "./background.module.scss";

export function Background({
    children,
    color_a,
    color_b,
}: PropsWithChildren & { color_a: string; color_b: string }) {
    let style = `linear-gradient(111deg, ${color_a} 0%, ${color_b} 100%)`;
    return (
        <div className={styles.background} style={{ background: style }}>
            {children}
        </div>
    );
}
