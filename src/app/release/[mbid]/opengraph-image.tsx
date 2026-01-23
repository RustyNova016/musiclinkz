import { get_release_data } from "./common";
import { LinkPageOG } from "@/components/opengraph/link_page_og";

// Image metadata
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function OGImage({
    params,
}: {
    params: { mbid: string; };
}) {
    const { mbid } = await params;
    let release_data = await get_release_data(mbid); 

    return LinkPageOG(release_data);
}
