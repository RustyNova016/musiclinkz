import { LinkCard, LinkCardProps } from "@/components/central_card";
import { CardHeader } from "@/components/card_header/card_header";
import { LinkCategory } from "@/components/link_list/category/link_category";
import { LinkSection } from "@/components/link_section";
import {
    ModalChild,
    ModalSection,
    PageModal,
} from "@/components/stateless/modal";
import { NotFound } from "@/components/stateless/not-found";
import { cache_duration } from "@/globals";
import { mbApi, recording_cover_art, release_covert_art } from "@/mb_fetching";
import { UrlData } from "@/models/url";
import { IArtist } from "musicbrainz-api";
import Head from "next/head";
import { notFound } from "next/navigation";

export const revalidate = cache_duration;

export const metadata = {
    title: "",
};

export default async function Page({
    params,
}: {
    params: Promise<{ mbid: string; }>;
}) {
    const { mbid } = await params;

    let response = await fetch(
        `https://musicbrainz.org/ws/2/artist/${mbid}?inc=url-rels&fmt=json`,
        {
            headers: {
                "User-Agent": "test/0.0.1",
            },
            next: {
                revalidate: cache_duration,
            },
        }
    );

    let artist_data: IArtist = await response.json();

    if (artist_data.id === undefined) {
        notFound();
    }

    // // Set the metadata
    metadata.title = `${artist_data.name} - Linkbrainz`;

    let links = UrlData.convert_artist_urls(artist_data);

    return (
        <>
            <PageModal>
                <ModalChild style={{ overflow: "visible" }}>
                    <CardHeader
                        title={artist_data.name}
                        disambiguation={artist_data.disambiguation}
                        releases={[]}
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
