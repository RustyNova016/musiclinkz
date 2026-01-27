import { release_covert_art } from "@/mb_fetching";
import { IArtist, IRecording, IRelease } from "musicbrainz-api";
import { get_image_palette } from "@/image";
import { UrlData } from "@/models/url";
import { fetch_mb } from "@/utils/fetching";
import { notFound } from "next/navigation";
import { EntityData } from "@/app/links/get_data";

export type RecordingData = {
    entity_type: "recording";
} & EntityData;

export async function get_recording_data(mbid: string): Promise<EntityData> {
    let recording_data: IRecording = await fetch_mb(
        `https://musicbrainz.org/ws/2/recording/${mbid}?inc=url-rels+releases+artist-credits&fmt=json`,
    );

    if (recording_data.id === undefined) {
        notFound();
    }

    let image = await recording_cover_art(recording_data);
    let color_a = "";
    let color_b = "";

    if (image === null) {
        image = "https://listenbrainz.org/static/img/cover-art-placeholder.jpg";
        color_a = "rgb(223, 43, 73)";
        color_b = "rgb(232, 117, 11)";
    } else {
        let pallette = await get_image_palette(image);
        color_a = pallette[0];
        color_b = pallette[1];
    }

    let credits = "";
    if (recording_data["artist-credit"] !== undefined) {
        for (const credit of recording_data["artist-credit"]) {
            credits += credit.name + credit.joinphrase;
        }
    }

    return {
        entity_type: "recording",
        mbid: recording_data.id,

        title: recording_data.title,
        disambiguation: recording_data.disambiguation,
        artist_credits_string: credits,
        artist_credits: recording_data["artist-credit"] || [],
        image: image,
        color_a: color_a,
        color_b: color_b,

        urls: UrlData.convert_recording_urls(recording_data),

        releases: recording_data.releases || [],
    };
}


export function recording_main_release(recording: IRecording): IRelease | null {
    if (recording.releases === undefined) {
        return null;
    }

    let releases = recording.releases;
    releases.sort((a, b) => Date.parse(a.date) - Date.parse(a.date));

    for (const release of recording.releases) {
        if (release.status === "Official") {
            return release;
        }
    }

    return null;
}

export async function recording_cover_art(
    recording: IRecording
): Promise<string | null> {
    if (recording.releases === undefined) {
        return null;
    }

    let releases = recording.releases;
    releases.sort((a, b) => Date.parse(a.date) - Date.parse(a.date));

    for (const release of recording.releases) {
        let ca = await release_covert_art(release.id);
        if (typeof ca === "string") {
            return ca;
        }
    }

    return null;
}

export async function artist_image(artist: IArtist): Promise<string | null> {
    for (const url_rel of artist.relations || []) {
        if (url_rel["type-id"] !== "221132e9-e30e-43f2-a741-15afc4c5fa7c") {
            continue;
        }

        if (url_rel.url?.resource === undefined) {
            continue;
        }

        return url_rel.url?.resource;
    }

    return null;
}
