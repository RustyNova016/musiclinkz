import { LinkPageProps } from "@/components/link_page/link_page";
import { LinkPageOGProps } from "@/components/opengraph/link_page_og";
import { get_image_palette } from "@/image";
import { recording_cover_art } from "@/models/recording";
import { UrlData } from "@/models/url";
import { fetch_mb } from "@/utils/fetching";
import { IRecording } from "musicbrainz-api";
import { notFound } from "next/navigation";

export type RecordingData = {
    entity_type: "recording";
} & LinkPageOGProps &
    LinkPageProps;

export async function get_recording_data(mbid: string): Promise<RecordingData> {
    let recording_data: IRecording = await fetch_mb(
        `https://musicbrainz.org/ws/2/recording/${mbid}?inc=url-rels+releases+artist-credits&fmt=json`
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
        artist_credits: recording_data["artist-credit"],
        image: image,
        color_a: color_a,
        color_b: color_b,

        urls: UrlData.convert_recording_urls(recording_data),

        releases: recording_data.releases || []
    };
}
