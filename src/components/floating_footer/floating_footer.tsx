import { MbEntity } from "@/globals";
import { LinkPill } from "../stateless/link_pill";
import styles from "./floating_footer.module.scss";

export type FloatingFooterProps = {
    entity_type: MbEntity;
    mbid: string;
};

export function FloatingFooter(props: FloatingFooterProps) {
    return <>
        <div className={`${styles.footer}`}>
            <a className={`${styles.link}`} href="https://github.com/RustyNova016/musiclinkz">Github</a>
            <a className={`${styles.link}`} href={`https://musicbrainz.org/recording/${props.mbid}/edit`}>Edit Page</a>
        </div>
    </>;
}