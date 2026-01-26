import { PropsWithChildren, CSSProperties } from "react";

import styles from "./fancy_card.module.scss";
import { classnames, PropsWithClassname } from "@/utils/css_class";

export type FancyCardProps = PropsWithChildren & PropsWithClassname & { style?: CSSProperties; };

export function FancyCard(props: FancyCardProps) {
    return <>
        <div style={props.style} className={classnames(styles.fancy_card, props.className)}>
            {props.children}
        </div>
    </>;
}