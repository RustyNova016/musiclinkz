import Link from "next/link";
import styles from "./link_card.module.css";
import Image from "next/image";
import { IArtistCredit } from "musicbrainz-api";
import { artist_credits } from "@/mb_fetching";
import { link_domains } from "@/globals";

export function LinkCategory({
    data,
    title,
}: {
    data: string[];
    title: string;
}) {
    let urls = Object.groupBy(data, (item) => new URL(item).hostname);
    const url_map = new Map(Object.entries(urls));

    return (
        <div style={{ overflow: "scroll" }} className={`${styles.card_item}`}>
            <div className={`${styles.link_category}`}>
                <h4>{title}</h4>
                <>
                    {url_map.entries().map((link_group, key) => {
                        return (
                            <LinkPill
                                key={key}
                                links={link_group[1]}
                            ></LinkPill>
                        );
                    })}
                </>
            </div>
        </div>
    );
}

function LinkPill({ links }: { links: string[] }) {
    let main_link = links.pop();
    let alt_links = links.length > 0;

    return (
        <>
            <div className="btn-group">
                <MainLink link={main_link} />
                {alt_links ? (
                    <>
                        <button
                            type="button"
                            className="btn btn-danger dropdown-toggle dropdown-toggle-split"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <span className="visually-hidden">
                                Toggle Dropdown
                            </span>
                        </button>
                        <ul className="dropdown-menu">
                            {links.map((alt_link, index) => (
                                <AltLink key={index} link={alt_link} />
                            ))}
                        </ul>
                    </>
                ) : (
                    <></>
                )}
            </div>
        </>
    );
}

function MainLink({ link }: { link: string }) {
    let url = new URL(link);
    let text = link_domains[url.hostname]
        ? link_domains[url.hostname]
        : url.hostname;

    return (
        <Link href={link} className="btn btn-danger">
            {" "}
            <div className={styles.link_icon}>
                <img
                    src={`http://www.google.com/s2/favicons?domain=${url.hostname}`}
                ></img>
            </div>
            <div className={styles.link_text}>{text}</div>
        </Link>
    );
}

function AltLink({ link, key }: { link: string; key: number }) {
    return (
        <li>
            <a className="dropdown-item" href="#">
                Mirror Link {key}
            </a>
        </li>
    );
}
