import { IRelease } from "musicbrainz-api";
import styles from "./found_on_release.module.scss";
import { LinkPill } from "@/components/stateless/link_pill";

export type FoundOnReleaseProps = { releases: IRelease[]; };

export function FoundOnRelease({ releases }: FoundOnReleaseProps) {
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