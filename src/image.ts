import { extractColors } from "extract-colors";
import { getPixels } from "ndarray-pixels";
import tinycolor from "tinycolor2";
import { fetch_mb } from "./utils/fetching";
import { cache_duration } from "./globals";

export async function get_image_palette(
    img_url: string
): Promise<[string, string]> {
    const bytesIn = await fetch(img_url, {
                    headers: {
                        "User-Agent": "musiclinkz/0.0.1",
                    },
                    next: {
                        revalidate: cache_duration,
                    },
                })
        .then((res) => res.arrayBuffer())
        .then((arrayBuffer) => new Uint8Array(arrayBuffer));

    const pixels = await getPixels(bytesIn, "");

    const data = [...pixels.data];
    const [width, height] = pixels.shape;

    let colors = await extractColors(
        { data, width, height },
    );

    return [
        tinycolor(colors[0].hex).saturate(50).toHexString(),
        tinycolor(colors[1].hex).saturate(50).toHexString(),
    ];
}

