import {
    link_domains,
    music_platform_relation_id,
    url_type_for_relation_id,
} from "@/globals";
import {
    IArtist,
    IRecording,
    IRelation,
    IRelationList,
    IRelease,
} from "musicbrainz-api";

export class UrlData {
    name: string;
    ressource: string;
    url_type: string;

    constructor(name: string, ressource: string, url_type: string) {
        (this.name = name), (this.ressource = ressource);
        this.url_type = url_type;
    }

    get_name(): string {
        if (this.name !== "") {
            return this.name;
        }

        let hostname = this.get_hostname();
        return link_domains[hostname] ? link_domains[hostname] : hostname;
    }

    get_hostname(): string {
        let url = new URL(this.ressource);
        return url.hostname;
    }

    static convert_relation_url(urls: IRelation[]): UrlData[] {
        return urls.map((item) => {
            let url_type = url_type_for_relation_id[item["type-id"]] || "other";

            return new UrlData("", item.url?.resource, url_type);
        });
    }

    static convert_recording_urls(recording: IRecording): UrlData[] {
        let urls = this.convert_relation_url(
            recording.relations ? recording.relations : []
        );

        return [
            new UrlData(
                "",
                `https://musicbrainz.org/recording/${recording.id}`,
                "music_databases"
            ),
            ...urls,
        ];
    }

    static convert_artist_urls(recording: IArtist): UrlData[] {
        let urls = this.convert_relation_url(
            recording.relations ? recording.relations : []
        );

        return [
            new UrlData(
                "",
                `https://musicbrainz.org/artist/${recording.id}`,
                "music_databases"
            ),
            new UrlData(
                "",
                `https://listenbrainz.org/artist/${recording.id}`,
                "music_databases"
            ),
            ...urls,
        ];
    }

    static convert_release_urls(release: IRelease): UrlData[] {
        let urls = this.convert_relation_url(
            release.relations ? release.relations : []
        );

        return [
            new UrlData(
                "",
                `https://musicbrainz.org/release/${release.id}`,
                "music_databases"
            ),
            new UrlData(
                "",
                `https://listenbrainz.org/release/${release.id}`,
                "music_databases"
            ),
            ...urls,
        ];
    }
}
