import { BigTitle } from "@/components/big_title/big_title";
import styles from "./home.module.scss";
import { LinkPill } from "@/components/stateless/link_pill";
import { FancyCard } from "@/components/fancy_card/fancy_card";
import { classnames } from "@/utils/css_class";

export const metadata = {
    title: "MusicLinkz",
    describe: "A simple link aggregator to easily share your music",
    metadataBase: new URL(process.env.domain || "localhost:3000"),
};

export default function Home() {
    return (
        <div className={`${styles.page_container}`}>
            <BigTitle>MusicLinkz</BigTitle>

            <h2>A simple link aggregator to easily share your music</h2>

            <FancyCard className={classnames(styles.description)} >
                <h1>Free and crowdsourced</h1>
                <p>
                    It uses open data from the{" "}
                    <LinkPill href={"https://musicbrainz.org"}>
                        MusicBrainz database
                    </LinkPill>{" "}
                    to create and find links, allowing anyone to add their own
                    music and links. Whether you are a local street musician or
                    Beyoncé, you can add your own music to the MusicBrainz
                    database and have access to this service
                </p>
                <br />
                <h1 className={`${styles.section}`}>Opensource</h1>
                <p>
                    Musiclinkz is 100% opensource and contains 0% vibe code. You can
                    find the source code and contribute on the{" "}
                    <LinkPill href={"https://github.com/RustyNova016/musiclinkz"}>
                        github repository
                    </LinkPill>{" "}
                </p>

                <br />
                <h1 className={`${styles.section}`}>Private</h1>
                <p>
                    No data is collected. No traffic, no cookies. Pure HTML beamed straight to your browser. But for legal reasons, here's the{" "}
                    <LinkPill href={"/privacy_policy"}>
                        privacy policy
                    </LinkPill>{" "}
                </p>
            </FancyCard>
        </div>
    );
}
