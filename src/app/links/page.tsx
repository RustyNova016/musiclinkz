import { LinkPage } from "@/components/link_page/link_page";
import { get_entity_data, get_entity_data_from_params } from "./get_data";
import { Metadata } from "next";

export const revalidate = 14400;

export default async function Page(props: PageProps<"/links">) {
    let data = await get_entity_data_from_params(props);

    return <>
        <LinkPage {...data} />
    </>;
}

export async function generateMetadata(props: PageProps<"/links">): Promise<Metadata> {
    let data = await get_entity_data_from_params(props);

    return {
        title: `${data.title} by ${data.artist_credits_string} - MusicLinkz`,
        description: `See the links of ${data.title} by ${data.artist_credits_string}`,
        openGraph: {
            images: {
                url: `https://8qtkpjkm-3000.uks1.devtunnels.ms/links/og?entity_type=${data.entity_type}&id=${data.mbid}`
            }
        }
    };
}