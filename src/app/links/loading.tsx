import { PageModal } from "@/components/stateless/modal";

export default function Loading() {
    return (
        <PageModal style={{ flexDirection: "column" }}>
            <p style={{ fontSize: "500%" }}>🔎🔗</p>
            <p>Searching your links</p>
        </PageModal>
    );
}
