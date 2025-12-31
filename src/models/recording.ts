import { release_covert_art } from "@/mb_fetching";
import { IArtist, IRecording, IRelease } from "musicbrainz-api";

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
            continue
        }

        if (url_rel.url?.resource === undefined) {
            continue
        }

        return url_rel.url?.resource;
    }

    return null;
}
