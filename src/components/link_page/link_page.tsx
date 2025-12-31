import { IArtistCredit, IRelease } from "musicbrainz-api";
import { Background } from "../background";
import { CardHeader } from "../card_header/card_header";
import { LinkSection } from "../link_section";
import { PageModal, ModalChild, ModalSection } from "../stateless/modal";
import { UrlData } from "@/models/url";
import { MbEntity } from "@/globals";
import { FloatingFooter } from "../floating_footer/floating_footer";

export type LinkPageProps = {
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

export function LinkPage(props: LinkPageProps) {

    return (
        <>
            <Background color_a={props.color_a} color_b={props.color_b}>
                <PageModal>
                    <ModalChild style={{ overflow: "visible" }}>
                        <CardHeader
                            title={props.title}
                            disambiguation={props.disambiguation}
                            image={props.image}
                            artist_credits={props.artist_credits}
                            releases={props.releases}
                            color_a={props.color_a}
                            color_b={props.color_b}
                        />
                    </ModalChild>

                    <ModalSection />

                    <ModalChild>
                        <LinkSection
                            entity_type={props.entity_type}
                            links={props.urls}
                            mbid={props.mbid}
                        />
                    </ModalChild>
                </PageModal>
            </Background>
            <FloatingFooter entity_type={props.entity_type} mbid={props.mbid} />
        </>
    );
}