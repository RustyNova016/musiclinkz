import Link from "next/link";
import styles from "./link_card.module.css";
import Image from "next/image";
import { IArtistCredit } from "musicbrainz-api";
import { artist_credits } from "@/mb_fetching";
import { LinkCategory } from "./link_category";

export class LinkCardProps {
    title: string;
    artist_credits?: IArtistCredit[];
    disambiguation: string;
    image?: string;

    links: LinkPillProps[];
}

export function LinkCard(data: LinkCardProps) {
    return (
        <div className={`${styles.link_card}`}>
            <CardHeader {...data} />

            <LinkCategory title="Listen on.." data={data.links}></LinkCategory>
        </div>
    );
}

function CardHeader(data: LinkCardProps) {
    return (
        <div className={`${styles.card_item} ${styles.card_header}`}>
            {data.image ? (
                <div className={styles.image_container}>
                    <Image
                        src={data.image}
                        fill={true}
                        className={styles.image}
                    ></Image>
                </div>
            ) : (
                <></>
            )}

            <h1 className={styles.card_title}>{data.title}</h1>
            {data.disambiguation !== "" ? (
                <p className={styles.disambiguation}>{data.disambiguation}</p>
            ) : (
                <></>
            )}
            {data.artist_credits !== undefined ? (
                <p className={styles.disambiguation}>
                    by {artist_credits(data.artist_credits)}
                </p>
            ) : (
                <></>
            )}
        </div>
    );
}
