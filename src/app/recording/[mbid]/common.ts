import { get_image_palette } from "@/image";
import { recording_cover_art } from "@/models/recording";
import { UrlData } from "@/models/url";
import { IRecording } from "musicbrainz-api";
import { notFound } from "next/navigation";

export type RecordingData = {
    title: string;
    disambiguation: string;
    image: string;
    artist_credits: String;

    color_a: string;
    color_b: string;

    urls: UrlData[];

    raw: IRecording;
};

export async function get_recording_data(mbid: string): Promise<RecordingData> {
    let response = await fetch(
        `https://musicbrainz.org/ws/2/recording/${mbid}?inc=url-rels+releases+artist-credits&fmt=json`,
        {
            headers: {
                "User-Agent": "test/0.0.1",
            },
        }
    );

    let recording_data: IRecording = await response.json();

    if (recording_data.id === undefined) {
        notFound();
    }

    let image = await recording_cover_art(recording_data);
    let color_a = "";
    let color_b = "";

    if (image === null) {
        image = "https://listenbrainz.org/static/img/cover-art-placeholder.jpg";
    } else {
        let pallette = await get_image_palette(image);
        color_a = pallette[0];
        color_b = pallette[1];
    }

    let credits = "";
    for (const credit of recording_data["artist-credit"]) {
        credits += credit.name + credit.joinphrase;
    }

    return {
        title: recording_data.title,
        disambiguation: recording_data.disambiguation,
        artist_credits: credits,
        image: image,
        color_a: color_a,
        color_b: color_b,

        urls: UrlData.convert_recording_urls(recording_data),

        raw: recording_data,
    };
}
