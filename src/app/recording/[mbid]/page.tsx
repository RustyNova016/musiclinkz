import { Background } from "@/components/background";
import { CardHeader } from "@/components/headers";
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

    let recording_data_new = await get_recording_data(mbid);


    let response = await fetch(
        `https://musicbrainz.org/ws/2/recording/${mbid}?inc=url-rels+releases+artist-credits&fmt=json`,
        {
            headers: {
                "User-Agent": "test/0.0.1",
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
    let color_a = "";
    let color_b = "";

    if (image === null) {
        image = "https://listenbrainz.org/static/img/cover-art-placeholder.jpg";
    } else {
        let pallette = await get_image_palette(image);
        console.log(pallette);
        color_a = pallette[0];
        color_b = pallette[1];
    }

    // Set the metadata
    metadata.title = `${recording_data.title} - Linkbrainz`;

    let links = UrlData.convert_recording_urls(recording_data);

    // --- Release ---
    //let release = recording_main_release(recording_data);

    return (
        <>
            <Background color_a={color_a} color_b={color_b}>
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
                        <LinkSection
                            links={links || []}
                            mbid={recording_data.id}
                        />
                    </ModalChild>
                </PageModal>
            </Background>
        </>
    );
}
