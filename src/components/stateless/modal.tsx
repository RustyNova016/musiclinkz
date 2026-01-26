import { CSSProperties, PropsWithChildren } from "react";

import styles from "./modal.module.scss";
import { classnames, PropsWithClassname, PropsWithStyle } from "@/utils/css_class";

export type PageModalProps = PropsWithChildren & PropsWithStyle & PropsWithClassname;

export function PageModal(props: PageModalProps) {
    return (
        <div className={classnames(styles.modal_container, props.className)}>
            <div style={props.style} className={`${styles.page_modal}`}>
                {props.children}
            </div>
        </div>
    );
}



export function ModalChild({
    children,
    style,
}: PropsWithChildren & { style?: CSSProperties; }) {
    return (
        <div style={style} className={`${styles.card_item}`}>
            {children}
        </div>
    );
}

export function ModalSection() {
    return <div className={`${styles.modal_section}`}></div>;
}
