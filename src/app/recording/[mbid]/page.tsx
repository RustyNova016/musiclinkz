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
import { LinkPage } from "@/components/link_page/link_page";
import { get_release_data } from "@/app/release/[mbid]/common";

export const revalidate = 14400;

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
            <LinkPage {...recording_data} />
        </>
    );
}
