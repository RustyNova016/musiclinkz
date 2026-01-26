import { PropsWithChildren } from "react";

import styles from "./big_title.module.scss";

export type BigTitleProps = PropsWithChildren ;

export function BigTitle(props: BigTitleProps) {
    return <>
        <div className={`${styles.title_container}`}>
            <h1 className={`${styles.title}`}>{props.children}</h1>
        </div>
    </>;
}