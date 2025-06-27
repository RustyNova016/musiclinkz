import Link from "next/link";
import styles from "./home.module.scss";
import { LinkPill } from "@/components/stateless/link_pill";

export default function Home() {
    return (
        <div className={`${styles.page_container}`}>
            <div className={`${styles.title_container}`}>
                <h1 className={`${styles.title}`}>Musiclinkz</h1>
            </div>

            <div className={`${styles.description}`}>
                <p>A simple link aggregator to easily share your music</p>
                <h2 className={`${styles.section}`}>Free and crowdsourced</h2>
                <p>
                    It uses open data from the{" "}
                    <LinkPill href={"https://musicbrainz.org"}>
                        MusicBrainz database
                    </LinkPill>
                    to create and find links, allowing anyone to add their own
                    music and links. Whether you are a local street musician or
                    Beyoncé, you can add your own music to the MusicBrainz
                    database and have access to this service
                </p>
                <h2 className={`${styles.section}`}>Opensource</h2>
                Musiclinkz is 100% opensource and contains 0% vibe code. You can
                find the source code and contribute on the{" "}
                <LinkPill href={"https://musicbrainz.org"}>
                    github repository
                </LinkPill>
            </div>
        </div>
    );
}
