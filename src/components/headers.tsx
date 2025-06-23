import { IArtistCredit, IRelease } from "musicbrainz-api";
import styles from "./link_card.module.css";
import { artist_credits } from "@/mb_fetching";
import Link from "next/link";
import Image from "next/image";
import { LinkPill } from "./stateless/link_pill";

export type HeaderProps = {
    title: string;
    disambiguation: string;
    artist_credits?: IArtistCredit[];

    releases?: IRelease[];
    image?: string;
};

export function CardHeader(data: HeaderProps) {
    return (
        <div className={`${styles.card_header}`}>
            {data.releases !== undefined ? (
                <FoundOnRelease releases={data.releases} />
            ) : (
                <></>
            )}

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

function FoundOnRelease({ releases }: { releases: IRelease[] }) {
    if (releases.length === 0) {
        return <></>;
    }

    let featured_releases: IRelease[] = [];

    releases.sort((a, b) => Date.parse(a.date) - Date.parse(a.date));

    for (const release of releases) {
        // Show only 3 featured releases
        if (featured_releases.length === 3) {
            break;
        }

        // Only show official releases
        if (release.status !== "Official") {
            continue;
        }

        // New release has the same name? We skip for the earliest one
        if (
            featured_releases.some((feat_release) => {
                return feat_release.title === release.title;
            })
        ) {
            continue;
        }

        featured_releases.push(release);
    }

    return (
        <p className={styles.disambiguation}>
            Appears on:{" "}
            {featured_releases.map((release, index, array) => {
                let link = (
                    <LinkPill href={`/release/${release.id}`}>
                        {release.title}
                    </LinkPill>
                );

                if (index === array.length - 2) {
                    link = <>{link} and </>;
                } else if (index !== array.length - 1) {
                    link = <>{link}, </>;
                }

                return <span key={index}>{link}</span>;
            })}
        </p>
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
            <LinkPill href={`/artist/${credit.artist.id}`}>
                {credit.name}
            </LinkPill>
            {credit.joinphrase}
        </>
    );
}
