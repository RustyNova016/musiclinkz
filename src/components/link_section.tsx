import { IRelation } from "musicbrainz-api";
import { LinkCategory } from "./link_list/category/link_category";
import { UrlData } from "@/models/url";
import { link } from "fs";
import styles from "./link_card.module.css";
import Link from "next/link";
import { MbEntity } from "@/globals";

export type LinkSectionProps = {
    links: UrlData[];
    mbid: string;
    entity_type: MbEntity;
};

export function LinkSection(props: LinkSectionProps) {
    // If there's only MB links, display the "No link" page
    if (isMissingLinks(props.links)) {
        return <MissingLinks entity_type="recording" mbid={props.mbid} />;
    }

    let music_platform_links = [];
    let socials_links = [];
    let database_links = [];
    let other_links = [];

    for (const link of props.links) {
        switch (link.url_type) {
            case "listen_on":
                music_platform_links.push(link);
                break;
            case "socials":
                socials_links.push(link);
                break;
            case "music_databases":
                database_links.push(link);
                break;
            default:
                other_links.push(link);
        }
    }

    return (
        <div>
            <LinkCategory
                title="Listen on..."
                hover=""
                data={music_platform_links}
            />
            <LinkCategory title="Socials" hover="" data={socials_links} />
            <LinkCategory
                title="Music Databases"
                hover="Various sites containing extra metadata"
                data={database_links}
            />
            <LinkCategory title="Other links" hover="Various other interesting links" data={other_links} />
        </div>
    );
}

function isMissingLinks(links: UrlData[]) {
    for (const link of links) {
        if (link.get_hostname() != "musicbrainz.org" && link.get_hostname() != "listenbrainz.org") {
            return false;
        }
    }

    return true;
}

function MissingLinks({
    entity_type,
    mbid,
}: {
        entity_type: MbEntity;
    mbid: string;
}) {
    let entity_edit = `https://musicbrainz.org/${entity_type}/${mbid}/edit`;
    let listenbrainz = `https://listenbrainz.org/${entity_type}/${mbid}`;

    return (
        <>
            <div className={`${styles.card_item}`}>
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
