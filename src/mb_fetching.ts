import {
    IArtistCredit,
    IRecording,
    IRelease,
    MusicBrainzApi,
} from "musicbrainz-api";
import { CoverArtArchiveApi } from "musicbrainz-api";

export const mbApi = new MusicBrainzApi({
    appName: "my-app",
    appVersion: "0.1.0",
    appContactInfo: "user@mail.org",
});

const coverArtArchiveApiClient = new CoverArtArchiveApi();

async function fetch_recording_data(mbid: String) {
    let recording_data = await mbApi.lookup("recording", mbid, [
        "releases",
        "url-rels",
    ]);
}

export function artist_credits(credits: IArtistCredit[]) {
    let credit = "";

    for (const credit_item of credits) {
        credit += credit_item.name + credit_item.joinphrase;
    }

    return credit;
}

export async function release_covert_art(
    release_mbid: string
): Promise<string | null> {
    const coverInfo = await coverArtArchiveApiClient.getReleaseCovers(
        release_mbid
    );

    if (coverInfo.images === undefined) {
        return null;
    }

    for (const image of coverInfo.images) {
        if (image.front) {
            return image.thumbnails.small;
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
