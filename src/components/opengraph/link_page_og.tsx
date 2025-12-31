import { ImageResponse } from "next/og";
import { join } from "path";
import { readFile } from "node:fs/promises";

// Image metadata
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = "image/png";

export type LinkPageOGProps = {
    title: string;
    artist_credits_string?: string;

    image: string | null;

    color_a: string;
    color_b: string;
};

// Image generation
export async function LinkPageOG(props: LinkPageOGProps) {
    let style = `linear-gradient(111deg, ${props.color_a} 0%, ${props.color_b} 100%)`;

    const font = await readFile(
        join(process.cwd(), "public/Geist-Regular.ttf")
    );

    const bold = await readFile(join(process.cwd(), "public/Geist-Bold.ttf"));

    return new ImageResponse(
        (
            // ImageResponse JSX element

            <div
                style={{
                    fontSize: 128,
                    background: style,
                    display: "flex",
                    width: "100%",
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <div
                    style={{
                        backgroundColor: "#00000080",
                        display: "flex",
                        width: "85%",
                        height: "80%",
                        alignItems: "center",
                        justifyContent: "space-around",
                        borderRadius: "30px",
                    }}
                >
                    <div
                        style={{
                            flexGrow: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "44%",
                        }}
                    >
                        <img
                            style={{
                                width: "200px",
                                height: "200px",
                            }}
                            src={props.image || "https://listenbrainz.org/static/img/cover-art-placeholder.jpg"}
                        />
                    </div>
                    <div
                        style={{
                            border: "1px solid #d3d3d3",
                            alignSelf: "stretch",
                            margin: "30px 0",
                        }}
                    />
                    <div
                        style={{
                            display: "flex",
                            flexGrow: 1,
                            width: "44%",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <div
                            style={{
                                color: "white",
                                fontSize: "0.20em",
                                marginBottom: "10px",
                                fontWeight: 800,
                                textAlign: "center",
                            }}
                        >
                            {props.title}
                        </div>

                        <div
                            style={{
                                display: "flex",
                                color: "rgb(177, 177, 177)",
                                fontSize: "0.15em",
                                margin: "5px",
                                textAlign: "center",
                            }}
                        >
                            by {props.artist_credits_string}
                        </div>
                    </div>
                </div>
            </div>
        ),
        {
            height: 400,
            width: 800,
            fonts: [
                {
                    name: "Inter",
                    data: bold,
                    style: "normal",
                    weight: 800,
                },
            ],
        }
    );
}
