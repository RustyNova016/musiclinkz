import { CSSProperties, PropsWithChildren } from "react";

import styles from "./modal.module.scss";

export function PageModal({
    children,
    style,
}: PropsWithChildren & { style?: CSSProperties }) {
    return (
        <div className={`${styles.modal_container}`}>
            <div style={style} className={`${styles.page_modal}`}>
                {children}
            </div>
        </div>
    );
}

export function ModalChild({
    children,
    style,
}: PropsWithChildren & { style?: CSSProperties }) {
    return (
        <div style={style} className={`${styles.card_item}`}>
            {children}
        </div>
    );
}

export function ModalSection() {
    return <div className={`${styles.modal_section}`}></div>;
}
