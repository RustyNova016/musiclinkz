"use client";
import { CenteredCard } from "@/components/stateless/modal";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string; };
    reset: () => void;
}) {
    return (
        <CenteredCard style={{ flexDirection: "column" }}>
            <p style={{ fontSize: "400%" }}>⚠️Oops...</p>
            <p style={{ margin: "10px" }}>Something went wrong! Try refreshing the page?</p>
            <p><code>{error.message}</code></p>
        </CenteredCard>
    );
}
