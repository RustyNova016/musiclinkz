import { release_covert_art } from "@/mb_fetching";
import { IRecording, IRelease } from "musicbrainz-api";

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

    return null
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
