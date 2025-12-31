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
import { get_artist_data } from "./common";
import { LinkPage } from "@/components/link_page/link_page";

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

    let recording_data = await get_artist_data(mbid);

    // Set the metadata
    metadata.title = `${recording_data.title} - Linkbrainz`;

    return (
        <>
            <LinkPage {...recording_data} />
        </>
    );
}
