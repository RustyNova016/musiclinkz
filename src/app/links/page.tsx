import { LinkPage } from "@/components/link_page/link_page";
import { get_entity_data } from "./get_data";
import { Metadata } from "next";

export const revalidate = 14400;

export default async function Page(props: PageProps<"/links">) {
    let { entity_type = "undefined", id = "" } = await props.searchParams;

    let data = await get_entity_data(entity_type, id);

    return <>
        <LinkPage {...data} />
    </>;
}

export async function generateMetadata(props: PageProps<"/links">): Promise<Metadata> {
    let { entity_type = "undefined", id = "" } = await props.searchParams;

    let data = await get_entity_data(entity_type, id);

    return {
        title: `${data.title} by ${data.artist_credits_string} - MusicLinkz`,
        description: `See the links of ${data.title} by ${data.artist_credits_string}`,
    };
}