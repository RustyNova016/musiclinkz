import { CardHeader } from "@/components/card_header/card_header";
import {
    LayoutContext,
    MainColorSetter,
    set_background_colors,
} from "@/components/layout_theme";
import { LinkPage } from "@/components/link_page/link_page";
import { LinkSection } from "@/components/link_section";
import {
    ModalChild,
    ModalSection,
    PageModal,
} from "@/components/stateless/modal";
import { cache_duration } from "@/globals";
import { mbApi, release_covert_art } from "@/mb_fetching";
import { UrlData } from "@/models/url";
import { IRecording, IRelease } from "musicbrainz-api";
import Head from "next/head";
import { notFound } from "next/navigation";
import { get_release_data } from "./common";

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

    let recording_data = await get_release_data(mbid);

    // Set the metadata
    metadata.title = `${recording_data.title} - Linkbrainz`;

    return (
        <>
            <LinkPage {...recording_data} />
        </>
    );
}

