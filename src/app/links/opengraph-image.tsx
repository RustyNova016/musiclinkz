import { LinkPageOG } from "@/components/opengraph/link_page_og";
import { get_entity_data } from "./get_data";

// Image metadata
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function generateImageMetadata(props: PageProps<"/links">) {
    console.log("Hello from OPGRAHP")
    let { entity_type = "undefined", id = "" } = await props.searchParams;

    let data = await get_entity_data(entity_type, id);

    return LinkPageOG(data);
}
