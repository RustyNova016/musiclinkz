import { BigTitle } from "@/components/big_title/big_title";
import { PageModal } from "@/components/stateless/modal";

import styles from "./page.module.scss";

export const metadata = {
    title: "Privacy Policy - MusicLinkz",
    describe: "A simple link aggregator to easily share your music"
};

export default function Page() {
    return <>
        <div className={`${styles.page}`}>
            <BigTitle>All your data<br />are belong to us!</BigTitle>

            <PageModal>
                <p className={`${styles.modal}`}>
                    Just kidding! We don't collect any data nor cookies!
                </p>
            </PageModal>
        </div>

    </>;
}