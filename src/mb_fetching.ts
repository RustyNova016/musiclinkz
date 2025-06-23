import {
    IArtistCredit,
    IRecording,
    IRelease,
    MusicBrainzApi,
} from "musicbrainz-api";
import { cache_duration } from "./globals";

export const mbApi = new MusicBrainzApi({
    appName: "my-app",
    appVersion: "0.1.0",
    appContactInfo: "user@mail.org",
});

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
    let response = await fetch(
        `https:/coverartarchive.org/release/${release_mbid}`,
        {
            headers: {
                "User-Agent": "linkbrainz/0.0.1",
            },
            cache: "force-cache",
            next: {
                revalidate: cache_duration,
            },
        }
    );

    let coverInfo;
    try {
        coverInfo = await response.json();
    } catch {
        coverInfo = {};
    }

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
