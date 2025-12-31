import { LinkPageProps } from "@/components/link_page/link_page";
import { LinkPageOGProps } from "@/components/opengraph/link_page_og";
import { cache_duration } from "@/globals";
import { get_image_palette } from "@/image";
import { release_covert_art } from "@/mb_fetching";
import { UrlData } from "@/models/url";
import { IRelease } from "musicbrainz-api";
import { notFound } from "next/navigation";

export type ReleaseData = {
    entity_type: "release";
} & LinkPageOGProps &
    LinkPageProps;

export async function get_release_data(mbid: string): Promise<ReleaseData> {
    let response = await fetch(
        `https://musicbrainz.org/ws/2/release/${mbid}?inc=url-rels+artist-credits&fmt=json`,
        {
            headers: {
                "User-Agent": "test/0.0.1",
            },
            next: {
                revalidate: cache_duration,
            },
        }
    );

    let release_data: IRelease = await response.json();

    if (release_data.id === undefined) {
        notFound();
    }

    let image = await release_covert_art(release_data.id);
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
    for (const credit of release_data["artist-credit"] || []) {
        credits += credit.name + credit.joinphrase;
    }

    return {
        entity_type: "release",
        mbid: release_data.id,
        title: release_data.title,
        disambiguation: release_data.disambiguation,
        artist_credits_string: credits,
        artist_credits: release_data["artist-credit"],

        image: image,
        color_a: color_a,
        color_b: color_b,

        urls: UrlData.convert_release_urls(release_data),

        releases: []
    };
}
