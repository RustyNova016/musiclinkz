export const cache_duration = 4 * 3600;

export const link_domains: Map<string, string> = new Map();
link_domains.set("open.spotify.com", "Spotify");
link_domains.set("itunes.apple.com", "Itunes");
link_domains.set("music.apple.com", "Apple Music");

export const url_type_for_relation_id = {
    // === Recordings ===
    "7e41ef12-a124-4324-afdb-fdbae687a89c": "listen_on",
    "6a540e5b-58c6-4192-b6ba-dbc71ec8fcf0": "listen_on",
    "b5f3058a-666c-406f-aafb-f9249fc7b122": "listen_on",
    // Purchase for download
    "92777657-504c-4acb-bd33-51a201bd57e1": "listen_on",

    // === Releases ===
    // Amazon
    "4f2e710d-166c-480c-a293-2e2c8d658d87": "listen_on",
    // free streaming
    "08445ccf-7b99-4438-9f9a-fb9ac18099ee": "listen_on",
    // streaming
    "320adf26-96fa-4183-9045-1f5f32f833cb": "listen_on",

    // purchase for download
    "98e08c20-8402-4163-8970-53504bb6a1e4": "listen_on",

    // Discog
    "4a78823c-1c53-4176-a5f3-58026c76f2bc": "music_databases",

    // === Artists ===
    // Free Streaming
    "769085a1-c2f7-4c24-a532-2375a77693bd": "listen_on",
    // streaming
    "63cc5d1f-f096-4c94-a43f-ecb32ea94161": "listen_on",
    // purchase for download
    "f8319a2f-f824-4617-81c8-be6560b3b203": "listen_on",
    // Soundcloud
    "89e4a949-0976-440d-bda1-5f772c1e5710": "listen_on",

    // "social network"
    "99429741-f3f6-484b-84f8-23af51991770": "socials",

    // Discogs
    "04a5b104-a4c2-4bac-99a1-7b837c37d9e4": "music_databases",
    // IMDb
    "94c8b0cc-4477-4106-932c-da60e63de61c": "music_databases",
    // vgmdb
    "0af15ab3-c615-46d6-b95b-a5fcd2a92ed9": "music_databases",
    // wikidata
    "689870a4-a1e4-4912-b17f-7b2664215698": "music_databases",
    // other databases
    "d94fb61c-fa20-4e3c-a19a-71a949fb2c55": "music_databases",
    // Lastfm
    "08db8098-c0df-4b78-82c3-c8697b4bba7f": "music_databases",
};

export type MbEntity = "recording" | "release" | "artist";
