import { LinkPageProps } from "@/components/link_page/link_page";
import { LinkPageOGProps } from "@/components/opengraph/link_page_og";
import { get_image_palette } from "@/image";
import { fetch_mb } from "@/utils/fetching";
import { IArtist } from "musicbrainz-api";
import { notFound } from "next/navigation";
import { artist_image } from "./recording";
import { UrlData } from "./url";

export type ArtistData = {
    entity_type: "artist";
} & LinkPageOGProps &
    LinkPageProps;

export async function get_artist_data(mbid: string): Promise<ArtistData> {
    let artist_data: IArtist = await fetch_mb(
        `https://musicbrainz.org/ws/2/artist/${mbid}?inc=url-rels&fmt=json`
    );

    if (artist_data.id === undefined) {
        notFound();
    }

    let image = await artist_image(artist_data);
    let color_a = "";
    let color_b = "";

    if (image !== null) {
        let pallette = await get_image_palette(image);
        color_a = pallette[0];
        color_b = pallette[1];
    } else {
        color_a = "rgb(223, 43, 73)";
        color_b = "rgb(232, 117, 11)";
    }

    return {
        entity_type: "artist",
        mbid: artist_data.id,

        title: artist_data.name,
        disambiguation: artist_data.disambiguation,
        artist_credits_string: "",
        artist_credits: [],
        image: image,
        color_a: color_a,
        color_b: color_b,

        urls: UrlData.convert_artist_urls(artist_data),

        releases: [],
    };
}
