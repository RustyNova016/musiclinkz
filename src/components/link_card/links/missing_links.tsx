import { MbEntity } from "@/globals";
import Link from "next/link";
import styles from "./missing_links.module.scss";

export type MissingLinksProps = {
    entity_type: MbEntity;
    mbid: string;
};

export function MissingLinks(props: MissingLinksProps) {
    let entity_edit = `https://musicbrainz.org/${props.entity_type}/${props.mbid}/edit`;
    let listenbrainz = `https://listenbrainz.org/${props.entity_type}/${props.mbid}`;

    return (
        <>
            <div className={`${styles.missing_links}`}>
                <p style={{ fontSize: "500%" }}>⛓️‍💥</p>
                <p>
                    No links have been found... But you can{" "}
                    <Link href={entity_edit}>add some</Link>
                </p>
                <p>
                    Or try listening on <Link href={listenbrainz}>Listenbrainz</Link>
                </p>
            </div>
        </>
    );
}
