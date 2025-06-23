import { PropsWithChildren } from "react";

import styles from "./link_pill.module.scss";
import Link, { LinkProps } from "next/link";

export function LinkPill(props: LinkProps & PropsWithChildren) {
    return (
        <Link {...props} className={`${styles.link_pill}`}>
            {props.children}
        </Link>
    );
}
