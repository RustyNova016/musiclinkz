import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            new URL("https://coverartarchive.org/**"),
            new URL("http://coverartarchive.org/**"),
            new URL("http://www.google.com/s2/**"),
            new URL("https://listenbrainz.org/**"),
            new URL("https://web.archive.org/**"),
        ],
    },

    output: "standalone",

    async rewrites() {
        return {
            beforeFiles: [
                // These rewrites are checked after headers/redirects
                // and before all files including _next/public files which
                // allows overriding page files
                {
                    source: "/track/:mbid",
                    destination: "/recording/:mbid",
                },
            ],
        };
    },
};

export default nextConfig;
