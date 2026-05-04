import { get_image_palette } from "@/image";
import { fetch_mb } from "@/utils/fetching";
import { IArtist } from "musicbrainz-api";
import { notFound } from "next/navigation";
import { artist_image } from "./recording";
import { UrlData } from "./url";
import { EntityData } from "@/app/links/get_data";

export type ArtistData = {
    entity_type: "artist";
} & EntityData;

export async function get_artist_data(mbid: string): Promise<ArtistData> {
    let artist_data: IArtist = await fetch_mb(
        `https://musicbrainz.org/ws/2/artist/${mbid}?inc=url-rels&fmt=json`
    );

    if (artist_data.id === undefined) {
        notFound();
    }

    let image = await artist_image(artist_data);
    let svg = null;
    let color_a = "";
    let color_b = "";

    if (image !== null) {
        let pallette = await get_image_palette(image);
        color_a = pallette[0];
        color_b = pallette[1];
    } else {
        svg = await (await fetch(`https://api.listenbrainz.org/1/art/artist-grid/${artist_data.id}/3/0/250?caption=false`)).text();
        svg = svg.replaceAll(`width="250"`, ` `);
        svg = svg.replaceAll(`height="250"`, ` `);
        svg = svg.replaceAll(`font-size="12"`, `font-size="10"`);

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
        svg: svg,
        color_a: color_a,
        color_b: color_b,

        urls: UrlData.convert_artist_urls(artist_data),

        releases: [],
    };
}
