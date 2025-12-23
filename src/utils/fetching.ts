export async function fetch_mb<T>(url: string): Promise<T> {
    for (let index = 0; index < 10; index++) {
        try {
            let response = await fetch(url, {
                headers: {
                    "User-Agent": "musiclinkz/0.0.1",
                },
            });

            return await response.json();
        } catch {
            
        }
    }

    throw new Error("Rate limit exceeded")
}
