import { PageModal } from "@/components/stateless/modal";
import styles from "./not-found.module.scss";

export default function NotFound() {
    return (
        <>
            <PageModal>
                <div className={`${styles.container}`}>
                    <p className={`${styles.title}`}>404 :(</p>
                    {/* <span className={`${styles.subtext}`}>
                        <i>Record scratch</i>
                    </span> */}
                    <span>It doesn't seems like this page exists...</span>
                </div>
            </PageModal>
        </>
    );
}
