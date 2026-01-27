import { MbEntity } from "@/globals";
import { get_artist_data } from "@/models/artist";
import { get_recording_data } from "@/models/recording";
import { get_release_data } from "@/models/release";
import { UrlData } from "@/models/url";
import { IArtistCredit, IRelease } from "musicbrainz-api";

export type EntityData = {
    entity_type: MbEntity;
    mbid: string;
    title: string;
    disambiguation: string;
    image: string | null;
    urls: UrlData[];

    artist_credits: IArtistCredit[];
    artist_credits_string: string;
    releases: IRelease[];

    color_a: string;
    color_b: string;
};

export async function get_entity_data(entity_type: string, mbid: string) {
    if (entity_type === "recording" || entity_type === "track") {
        return await get_recording_data(mbid);
    }

    if (entity_type === "artist") {
        return await get_artist_data(mbid);
    }

    if (entity_type === "release") {
        return await get_release_data(mbid);
    }

    throw new Error(`Entity type not found: ${entity_type}`);
}

export async function get_entity_data_from_params(props: PageProps<"/links">) {
    let { entity_type, id } = await props.searchParams;

    if (Array.isArray(entity_type)) {
        entity_type = entity_type.at(0);
    }
    if (entity_type === undefined) {
        throw new Error("Missing entity_type parameter");
    }

    if (Array.isArray(id)) {
        id = entity_type.at(0);
    }
    if (id === undefined) {
        throw new Error("Missing id parameter");
    }

    return get_entity_data(entity_type, id);
}