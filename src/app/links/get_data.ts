import { MbEntity } from "@/globals";
import { get_recording_data } from "@/models/recording";
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

    throw new Error(`Entity type not found: ${entity_type}`);
}