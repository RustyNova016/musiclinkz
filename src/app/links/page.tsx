import { get_entity_data_from_params } from "./get_data";
import { Metadata } from "next";
import { Background } from "@/components/background";
import { classnames } from "@/utils/css_class";
import styles from "./page.module.scss";
import { LinkCard } from "@/components/link_card/link_card";
import { FloatingFooter } from "@/components/floating_footer/floating_footer";

export const revalidate = 14400;

export default async function Page(props: PageProps<"/links">) {
    let data = await get_entity_data_from_params(props);

    return <>
        <Background color_a={data.color_a} color_b={data.color_b}>
            <div className={classnames(styles.center)}>
                <LinkCard {...data} />
                <FloatingFooter entity_type={data.entity_type} mbid={data.mbid} />
            </div>
        </Background>
    </>;
}

export async function generateMetadata(props: PageProps<"/links">): Promise<Metadata> {
    let data = await get_entity_data_from_params(props);

    return {
        title: `${data.title} by ${data.artist_credits_string} - MusicLinkz`,
        description: `See the links of ${data.title} by ${data.artist_credits_string}`,
        openGraph: {
            images: {
                url: `/links/og?entity_type=${data.entity_type}&id=${data.mbid}`
            }
        },
        metadataBase: new URL(process.env.DOMAIN || "http://localhost:3000"),
    };
}