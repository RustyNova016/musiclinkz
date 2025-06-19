import { IArtistCredit } from "musicbrainz-api";
import styles from "./link_card.module.css";
import { artist_credits } from "@/mb_fetching";
import Link from "next/link";
import Image from "next/image";

export type HeaderProps = {
    title: string;
    disambiguation: string;
    artist_credits?: IArtistCredit[];

    image?: string;
};

export function CardHeader(data: HeaderProps) {
    return (
        <div className={`${styles.card_item} ${styles.card_header}`}>
            {data.image ? (
                <div className={styles.image_container}>
                    <Image
                        src={data.image}
                        fill={true}
                        className={styles.image}
                        alt="Cover Art of the entity"
                    ></Image>
                </div>
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

function ArtistCredits({ credits }: { credits: IArtistCredit[] }) {
    return (
        <>
            {credits.map((credit, index) => (
                <ArtistCredit credit={credit} key={index} />
            ))}
        </>
    );
}

function ArtistCredit({ credit }: { credit: IArtistCredit }) {
    return (
        <>
            <Link href={`/artist/${credit.artist.id}`}>{credit.name}</Link>
            {credit.joinphrase}
        </>
    );
}
