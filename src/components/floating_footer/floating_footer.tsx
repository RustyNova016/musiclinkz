import { MbEntity } from "@/globals";
import { LinkPill } from "../stateless/link_pill";
import styles from "./floating_footer.module.scss";
import Link from "next/link";

export type FloatingFooterProps = {
    entity_type: MbEntity;
    mbid: string;
};

export function FloatingFooter(props: FloatingFooterProps) {
    return <>
        <div className={`${styles.footer}`}>
            <Link className={`${styles.link}`} href={"/privacy_policy"}>Privacy Policy</Link>
            <Link className={`${styles.link}`} href={"https://github.com/RustyNova016/musiclinkz"}>Github</Link>
            <Link className={`${styles.link}`} href={`https://musicbrainz.org/recording/${props.mbid}/edit`}>Edit Page</Link>
        </div>
    </>;
}