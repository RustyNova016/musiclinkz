import { PropsWithChildren } from "react";

import styles from "./fancy_pill.module.scss";

export type LinkPillProps = PropsWithChildren;

export function FancyPill(props: LinkPillProps) {
    return (
        <div className={`${styles.link_pill} ${styles.shadow}`}>
            {props.children}
        </div>
    );
}

