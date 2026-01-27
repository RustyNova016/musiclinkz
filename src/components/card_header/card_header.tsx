import { IArtistCredit, IRelease } from "musicbrainz-api";
import styles from "./card_header.module.scss";
import Image from "next/image";
import { LinkPill } from "../stateless/link_pill";
import { FoundOnRelease } from "./found_on_release/found_on_release";
import { CoverartImage } from "./coverart_image/coverart_image";
import { AccentColors } from "@/models/page_style";

export type HeaderProps = {
    title: string;
    disambiguation: string;
    artist_credits: IArtistCredit[];

    releases: IRelease[];
    image: string | null;
} & AccentColors;

export function CardHeader(data: HeaderProps) {
    return (
        <div className={`${styles.card_header}`}>
            <FoundOnRelease releases={data.releases} />

            {data.image !== null ? (
                <CoverartImage src={data.image} />
            ) : (
                <></>
            )}

            <h1 className={styles.title}>{data.title}</h1>
            {data.disambiguation !== "" ? (
                <p className={styles.disambiguation}>({data.disambiguation})</p>
            ) : (
                <></>
            )}
            {data.artist_credits.length !== 0 ? (
                <p className={styles.disambiguation}>
                    <ArtistCredits credits={data.artist_credits} color_a={data.color_a} color_b={data.color_b} add_by_prefix />
                </p>
            ) : (
                <></>
            )}
        </div>
    );
}

export type ArtistCreditsProps = {
    add_by_prefix: boolean,
    credits: IArtistCredit[];
} & AccentColors;

function ArtistCredits(props: ArtistCreditsProps) {
    return (
        <>
            {props.add_by_prefix ? "by " : <></>}
            {props.credits.map((credit, index) => (
                <ArtistCredit credit={credit} color_a={props.color_a} color_b={props.color_b} key={index} />
            ))}
        </>
    );
}

export type ArtistCreditProps = {
    credit: IArtistCredit;
} & AccentColors;

function ArtistCredit(props: ArtistCreditProps) {
    return (
        <>
            <LinkPill href={`/artist/${props.credit.artist.id}`}>
                {props.credit.name}
            </LinkPill>
            {props.credit.joinphrase}
        </>
    );
}
