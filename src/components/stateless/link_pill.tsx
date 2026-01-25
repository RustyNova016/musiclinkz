import { PropsWithChildren } from "react";

import styles from "./link_pill.module.scss";
import Link, { LinkProps } from "next/link";

export type LinkPillProps = LinkProps & PropsWithChildren;

export function LinkPill(props: LinkPillProps) {
    return (
        <Link {...props} className={`${styles.link_pill} ${styles.shadow}`}>
            {props.children}
        </Link>
    );
}
