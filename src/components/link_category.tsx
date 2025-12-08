import Link from "next/link";
import styles from "./link_card.module.css";
import Image from "next/image";
import { IArtistCredit } from "musicbrainz-api";
import { artist_credits } from "@/mb_fetching";
import { link_domains } from "@/globals";
import { UrlData } from "@/models/url";
import { LinkItem } from "./link_list/link/link";

export function LinkCategory({
    data,
    title,
    hover,
}: {
    data: UrlData[];
    title: string;
    hover: string;
}) {
    if (data.length === 0) {
        return <></>;
    }

    const urls = Map.groupBy(data, (item) => item.get_hostname());
    const url_groups = Array.from(urls.values());

    return (
        <div className={`${styles.link_category}`}>
            <h4 title={hover}>{title}</h4>
            <>
                {url_groups.map((link_group, key) => {
                    return <LinkItem key={key} links={link_group}></LinkItem>;
                })}
            </>
        </div>
    );
}

