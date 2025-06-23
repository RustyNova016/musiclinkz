import Link from "next/link";
import styles from "./link_card.module.css";
import Image from "next/image";
import { IArtistCredit } from "musicbrainz-api";
import { artist_credits } from "@/mb_fetching";
import { link_domains } from "@/globals";
import { UrlData } from "@/models/url";

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
                    return <LinkPill key={key} links={link_group}></LinkPill>;
                })}
            </>
        </div>
    );
}

function LinkPill({ links }: { links: UrlData[] }) {
    let main_link = links.pop();
    let alt_links = links.length > 0;

    return (
        <>
            <div className={`btn-group ${styles.link_button_group}`}>
                <MainLink link={main_link} has_alts={alt_links} />
                {alt_links ? (
                    <>
                        <button
                            type="button"
                            className={`${styles.link_button} ${styles.link_button_right} dropdown-toggle dropdown-toggle-split`}
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <span className="visually-hidden">
                                Toggle Dropdown
                            </span>
                        </button>
                        <ul className="dropdown-menu">
                            {links.map((alt_link, index) => (
                                <AltLink
                                    key={index}
                                    index={index + 1}
                                    link={alt_link}
                                />
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

function MainLink({ link, has_alts }: { link: UrlData; has_alts: boolean }) {
    let button_class = has_alts
        ? styles.link_button_left
        : styles.link_button_solo;

    return (
        <Link
            href={link.ressource}
            className={`${styles.link_button} ${button_class}`}
        >
            {" "}
            <div className={styles.link_icon}>
                <img
                    src={`http://www.google.com/s2/favicons?domain=${link.get_hostname()}`}
                ></img>
            </div>
            <div className={styles.link_text}>{link.get_name()}</div>
        </Link>
    );
}

function AltLink({ link, index }: { link: UrlData; index: number }) {
    return (
        <li>
            <Link className="dropdown-item" href={link.ressource}>
                Alternate Link {index}
            </Link>
        </li>
    );
}
