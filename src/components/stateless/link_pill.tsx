import { CSSProperties, PropsWithChildren } from "react";

import styles from "./link_pill.module.scss";
import Link, { LinkProps } from "next/link";
import { AccentColors } from "@/models/page_style";

export type LinkPillProps = AccentColors & LinkProps & PropsWithChildren;

export function LinkPill(props: LinkPillProps) {
    return (
        <Link {...props} className={`${styles.link_pill} ${styles.shadow}`}> 
            {props.children}
        </Link>
    );
}
