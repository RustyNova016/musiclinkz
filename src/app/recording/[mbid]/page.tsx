import { Background } from "@/components/background";
import { CardHeader } from "@/components/card_header/card_header";
import { LinkSection } from "@/components/link_section";
import {
    ModalChild,
    ModalSection,
    PageModal,
} from "@/components/stateless/modal";
import { cache_duration } from "@/globals";
import { get_image_palette } from "@/image";
import {
    recording_cover_art,
    recording_main_release,
} from "@/models/recording";
import { UrlData } from "@/models/url";
import { IRecording } from "musicbrainz-api";
import { notFound } from "next/navigation";
import { get_recording_data } from "./common";
import { fetch_mb } from "@/utils/fetching";

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

    let recording_data = await get_recording_data(mbid);

    // Set the metadata
    metadata.title = `${recording_data.title} - Linkbrainz`;

    return (
        <>
            <Background color_a={recording_data.color_a} color_b={recording_data.color_b}>
                <PageModal>
                    <ModalChild style={{ overflow: "visible" }}>
                        <CardHeader
                            title={recording_data.title}
                            disambiguation={recording_data.disambiguation}
                            image={recording_data.image}
                            artist_credits={recording_data.raw["artist-credit"]}
                            releases={recording_data.raw.releases || []}
                        />
                    </ModalChild>

                    <ModalSection />

                    <ModalChild>
                        <LinkSection
                            links={recording_data.urls || []}
                            mbid={recording_data.raw.id}
                        />
                    </ModalChild>
                </PageModal>
            </Background>
        </>
    );
}
