import { LinkCategory } from "./link_list/category/link_category";
import { UrlData } from "@/models/url";
import styles from "./link_card.module.css";
import { MbEntity } from "@/globals";
import { MissingLinks } from "./link_card/links/missing_links";

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
        <div className={`${styles.scroll_shadows}`}>
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

