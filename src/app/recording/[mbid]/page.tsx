import { Metadata } from "next";
import { get_recording_data } from "./common";
import { LinkPage } from "@/components/link_page/link_page";

export const revalidate = 14400;

export default async function Page({
    params,
}: {
    params: Promise<{ mbid: string; }>;
}) {
    const { mbid } = await params;
    let recording_data = await get_recording_data(mbid);

    return (
        <>
            <LinkPage {...recording_data} />
        </>
    );
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ mbid: string; }>;
}): Promise<Metadata> {
    const { mbid } = await params;

    let recording_data = await get_recording_data(mbid);

    return {
        title: `${recording_data.title} - MusicLinkz`,
        description: `See the links of ${recording_data.title}`,
    };
}