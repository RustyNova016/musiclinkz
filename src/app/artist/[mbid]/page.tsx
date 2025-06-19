import { LinkCard, LinkCardProps } from "@/components/central_card";
import { CardHeader } from "@/components/headers";
import { LinkCategory } from "@/components/link_category";
import { LinkSection } from "@/components/link_section";
import {
    ModalChild,
    ModalSection,
    PageModal,
} from "@/components/stateless/modal";
import { mbApi, recording_cover_art, release_covert_art } from "@/mb_fetching";
import { UrlData } from "@/models/url";
import { IArtist } from "musicbrainz-api";
import Head from "next/head";

export const metadata = {
    title: "",
};

export default async function Page({
    params,
}: {
    params: Promise<{ mbid: string }>;
}) {
    const { mbid } = await params;

    let response = await fetch(
        `https://musicbrainz.org/ws/2/artist/${mbid}?inc=url-rels&fmt=json`,
        {
            headers: {
                "User-Agent": "test/0.0.1",
            },
        }
    );

    let artist_data: IArtist = await response.json();
    
    // // Set the metadata
    // metadata.title = `${recording_data.title} - MusicLinkz`;

    let links = UrlData.convert_artist_urls(artist_data);

    return (
        <>
            <PageModal>
                <ModalChild style={{ overflow: "visible" }}>
                    <CardHeader
                        title={artist_data.name}
                        disambiguation={artist_data.disambiguation}
                    />
                </ModalChild>

                <ModalSection />

                <ModalChild>
                    <LinkSection links={links || []} mbid={artist_data.id} />
                </ModalChild>
            </PageModal>
        </>
    );
}
