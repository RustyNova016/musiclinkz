import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            new URL("https://coverartarchive.org/**"),
            new URL("http://coverartarchive.org/**"),
            new URL("http://www.google.com/s2/**"),
            new URL("https://listenbrainz.org/**"),
        ],
    },

    basePath: "/musiclinkz",
    output: "export", // <=== enables static exports
};

export default nextConfig;
