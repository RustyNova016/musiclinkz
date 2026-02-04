import { CenteredCard } from "@/components/stateless/modal";

export default function Loading() {
    return (
        <CenteredCard style={{ flexDirection: "column" }}>
            <p style={{ fontSize: "500%" }}>🔎🔗</p>
            <p>Searching your links</p>
        </CenteredCard>
    );
}
