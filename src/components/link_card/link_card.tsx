import styles from "./link_card.module.scss";
import { classnames } from "@/utils/css_class";
import { CardHeader } from "../card_header/card_header";
import { FancyCard } from "../fancy_card/fancy_card";
import { LinkSection } from "../link_section";
import { UrlData } from "@/models/url";
import { IArtistCredit, IRelease } from "musicbrainz-api";
import { MbEntity } from "@/globals";
import { ModalSection } from "./modal_section";
import { CardSection } from "./card_section";

export type LinkCardProps = {
    entity_type: MbEntity;
    mbid: string;
    title: string;
    disambiguation: string;
    image: string | null;
    urls: UrlData[];

    artist_credits: IArtistCredit[];
    releases: IRelease[];

    color_a: string;
    color_b: string;
};

/* Card displaying links */
export function LinkCard(props: LinkCardProps) {

    return (
        <>
            <FancyCard className={classnames(styles.card_inner)}>
                <CardSection style={{ overflow: "visible" }}>
                    <CardHeader
                        title={props.title}
                        disambiguation={props.disambiguation}
                        image={props.image}
                        artist_credits={props.artist_credits}
                        releases={props.releases}
                        color_a={props.color_a}
                        color_b={props.color_b}
                    />
                </CardSection>

                <ModalSection />

                <CardSection style={{ marginTop: "0px" }}>
                    <LinkSection
                        entity_type={props.entity_type}
                        links={props.urls}
                        mbid={props.mbid}
                    />
                </CardSection>
            </FancyCard>
        </>
    );
}