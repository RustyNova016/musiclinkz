import { CardHeader } from "@/components/headers";
import { LinkSection } from "@/components/link_section";
import {
    ModalChild,
    ModalSection,
    PageModal,
} from "@/components/stateless/modal";
import { cache_duration } from "@/globals";
import {
    recording_cover_art,
    recording_main_release,
} from "@/models/recording";
import { UrlData } from "@/models/url";
import { IRecording } from "musicbrainz-api";
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
        `https://musicbrainz.org/ws/2/recording/${mbid}?inc=url-rels+releases+artist-credits&fmt=json`,
        {
            headers: {
                "User-Agent": "test/0.0.1",
            },
            next: {
                revalidate: cache_duration,
            },
        }
    );

    let recording_data: IRecording = await response.json();

    if (recording_data.id === undefined) {
        notFound();
    }

    // let recording_data = await mbApi.lookup("recording", mbid, [
    //     "artists",
    //     "releases",
    //     "url-rels",
    // ]);

    let image = await recording_cover_art(recording_data);

    if (image === null) {
        image = "https://listenbrainz.org/static/img/cover-art-placeholder.jpg";
    }

    // Set the metadata
    metadata.title = `${recording_data.title} - Linkbrainz`;

    let links = UrlData.convert_recording_urls(recording_data);

    // --- Release ---
    let release = recording_main_release(recording_data);

    return (
        <>
            <PageModal>
                <ModalChild style={{ overflow: "visible" }}>
                    <CardHeader
                        title={recording_data.title}
                        disambiguation={recording_data.disambiguation}
                        image={image}
                        artist_credits={recording_data["artist-credit"]}
                        releases={recording_data.releases}
                    />
                </ModalChild>

                <ModalSection />

                <ModalChild>
                    <LinkSection links={links || []} mbid={recording_data.id} />
                </ModalChild>
            </PageModal>
        </>
    );
}
