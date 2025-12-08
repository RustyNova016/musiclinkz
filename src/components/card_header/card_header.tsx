import { IArtistCredit, IRelease } from "musicbrainz-api";
import styles from "./card_header.module.scss";
import Image from "next/image";
import { LinkPill } from "../stateless/link_pill";
import { FoundOnRelease } from "./found_on_release/found_on_release";
import { CoverartImage } from "./coverart_image/coverart_image";

export type HeaderProps = {
    title: string;
    disambiguation: string;
    artist_credits?: IArtistCredit[];

    releases: IRelease[];
    image?: string;
};

export function CardHeader(data: HeaderProps) {
    return (
        <div className={`${styles.card_header}`}>
            <FoundOnRelease releases={data.releases} />

            {data.image ? (
                <CoverartImage src={data.image} />
            ) : (
                <></>
            )}

            <h1 className={styles.card_title}>{data.title}</h1>
            {data.disambiguation !== "" ? (
                <p className={styles.disambiguation}>({data.disambiguation})</p>
            ) : (
                <></>
            )}
            {data.artist_credits !== undefined ? (
                <p className={styles.disambiguation}>
                    by <ArtistCredits credits={data.artist_credits} />
                </p>
            ) : (
                <></>
            )}
        </div>
    );
}



function ArtistCredits({ credits }: { credits: IArtistCredit[]; }) {
    return (
        <>
            {credits.map((credit, index) => (
                <ArtistCredit credit={credit} key={index} />
            ))}
        </>
    );
}

function ArtistCredit({ credit }: { credit: IArtistCredit; }) {
    return (
        <>
            <LinkPill href={`/artist/${credit.artist.id}`}>
                {credit.name}
            </LinkPill>
            {credit.joinphrase}
        </>
    );
}
