import { LinkPage } from "@/components/link_page/link_page";
import { cache_duration } from "@/globals";
import { get_release_data } from "./common";

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

    let recording_data = await get_release_data(mbid);

    // Set the metadata
    metadata.title = `${recording_data.title} - Linkbrainz`;

    return (
        <>
            <LinkPage {...recording_data} />
        </>
    );
}

