import { PropsWithStyle } from "@/utils/css_class";
import styles from "./card_section.module.scss";
import { PropsWithChildren } from "react";

export type CardSectionProps = PropsWithChildren & PropsWithStyle;

export function CardSection(props: CardSectionProps) {
    return (
        <div style={props.style} className={`${styles.card_item}`}>
            {props.children}
        </div>
    );
}

