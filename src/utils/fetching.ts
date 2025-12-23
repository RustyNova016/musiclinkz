import { cache_duration } from "@/globals";

export async function fetch_mb<T>(url: string): Promise<T> {
    for (let index = 0; index < 10; index++) {
        try {
            let response = await fetch(url, {
                headers: {
                    "User-Agent": "musiclinkz/0.0.1",
                },
                next: {
                    revalidate: cache_duration,
                },
            });

            return await response.json();
        } catch (error: any) {
            console.error(error);
        }

        await sleep(1000)
    }

    throw new Error("Rate limit exceeded")
}

async function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}