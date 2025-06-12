import { LinkCard, LinkCardProps } from "@/components/central_card";
import { mbApi, recording_cover_art, release_covert_art } from "@/mb_fetching";

function generateStaticParams() {}

export default async function Page({
    params,
}: {
    params: Promise<{ mbid: string }>;
}) {
    const { mbid } = await params;

    let recording_data = await mbApi.lookup("recording", mbid, [
        "artists",
        "releases",
        "url-rels",
    ]);

    //console.log(recording_data)

    let urls = recording_data.relations
        ?.map((val) => {
            return val.url?.resource;
        })
        .filter((val) => val !== undefined);

    //console.log(urls)

    const data = {
        title: recording_data.title,
        disambiguation: recording_data.disambiguation,
        artist_credits: recording_data["artist-credit"],
        links: urls ? urls : [],
    } satisfies LinkCardProps;

    let image = await recording_cover_art(recording_data);
    data.image = image
        ? image
        : "https://listenbrainz.org/static/img/cover-art-placeholder.jpg";

    return (
        <>
            <LinkCard {...data}></LinkCard>
        </>
    );
}
