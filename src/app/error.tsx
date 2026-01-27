"use client";
import { PageModal } from "@/components/stateless/modal";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string; };
    reset: () => void;
}) {
    return (
        <PageModal style={{ flexDirection: "column" }}>
            <p style={{ fontSize: "500%" }}>⚠️ Oops...</p>
            <p>Something went wrong! Try refreshing the page?</p>
            <p><code>{error.message}</code></p>
        </PageModal>
    );
}
