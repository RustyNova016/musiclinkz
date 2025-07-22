import { CardHeader } from "@/components/headers";
import {
    LayoutContext,
    MainColorSetter,
    set_background_colors,
} from "@/components/layout_theme";
import { LinkSection } from "@/components/link_section";
import {
    ModalChild,
    ModalSection,
    PageModal,
} from "@/components/stateless/modal";
import { cache_duration } from "@/globals";
import { mbApi,  release_covert_art } from "@/mb_fetching";
import { UrlData } from "@/models/url";
import { IRecording, IRelease } from "musicbrainz-api";
import Head from "next/head";
import { notFound } from "next/navigation";

export const revalidate = cache_duration;

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
        `https://musicbrainz.org/ws/2/release/${mbid}?inc=url-rels+artist-credits&fmt=json`,
        {
            headers: {
                "User-Agent": "test/0.0.1",
            },
            next: {
                revalidate: cache_duration,
            },
        }
    );

    let release_data: IRelease = await response.json();

    if (release_data.id === undefined) {
        notFound();
    }

    // let recording_data = await mbApi.lookup("recording", mbid, [
    //     "artists",
    //     "releases",
    //     "url-rels",
    // ]);

    let image = await release_covert_art(release_data.id);

    if (image === null) {
        image = "https://listenbrainz.org/static/img/cover-art-placeholder.jpg";
    } 

    // Set the metadata
    metadata.title = `${release_data.title} - Linkbrainz`;

    let links = UrlData.convert_release_urls(release_data);

    return (
        <>
            <PageModal>
                <ModalChild style={{ overflow: "visible" }}>
                    <CardHeader
                        title={release_data.title}
                        disambiguation={release_data.disambiguation}
                        image={image}
                        artist_credits={release_data["artist-credit"]}
                    />
                </ModalChild>

                <ModalSection />

                <ModalChild>
                    <LinkSection links={links || []} mbid={release_data.id} />
                </ModalChild>
            </PageModal>
        </>
    );
}
