import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            new URL("https://coverartarchive.org/**"),
            new URL("http://coverartarchive.org/**"),
            new URL("http://www.google.com/**"),
            new URL("https://listenbrainz.org/**"),
            new URL("https://web.archive.org/**"),
            new URL("https://www.google.com/**"),
            {
                protocol: "https",
                hostname: "www.google.com",
                pathname: "/s2/favicons",
            }
        ],
    },

    output: "standalone",

    async rewrites() {
        let entities = ["track", "recording", "artist", "release"];
        let redirects = [];

        for (const ent of entities) {
            redirects.push({
                source: `/${ent}/:mbid`,
                destination: `/links/?entity_type=${ent}&id=:mbid`,
            });
        }

        return {
            beforeFiles: [
                // These rewrites are checked after headers/redirects
                // and before all files including _next/public files which
                // allows overriding page files
                ...redirects
            ],
        };
    },

    logging: {
        fetches: {
            fullUrl: false,
        },
    },
};

export default nextConfig;
