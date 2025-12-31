"use client";
import { PageModal } from "@/components/stateless/modal";

export default function Error() {
    return (
        <PageModal style={{ flexDirection: "column" }}>
            <p style={{ fontSize: "500%" }}>⚠️ Oops...</p>
            <p>Something went wrong!</p>
        </PageModal>
    );
}
