import { CSSProperties, PropsWithChildren } from "react";

import styles from "./modal.module.scss";
import { classnames, PropsWithClassname, PropsWithStyle } from "@/utils/css_class";

export type PageModalProps = PropsWithChildren & PropsWithStyle & PropsWithClassname;

export function CenteredCard(props: PageModalProps) {
    return (
        <div className={classnames(styles.modal_container, props.className)}>
            <div style={props.style} className={`${styles.page_modal}`}>
                {props.children}
            </div>
        </div>
    );
}



