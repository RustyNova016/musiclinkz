import { PageModal } from "@/components/stateless/modal";
import styles from "./not_found.module.scss";


export type NotFoundPageProps = {
    item_name: string;
}

export function NotFoundPage(props: NotFoundPageProps) {
    return <>
        <PageModal>
            <div className={`${styles.container}`}>
                <span className={`${styles.title}`}>404 :(</span>
                {/* <span className={`${styles.subtext}`}>
                        <i>Record scratch</i>
                </span>  */}
                <span>It doesn't seems like this {props.item_name} exists...</span>
            </div>
        </PageModal>
    </>;
}