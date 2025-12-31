import styles from "./link_category.module.scss";
import { UrlData } from "@/models/url";
import { LinkItem } from "../link/link";

export type LinkCategoryProps = {
    data: UrlData[];
    title: string;
    hover: string;
};

export function LinkCategory({
    data,
    title,
    hover,
}: LinkCategoryProps) {
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

