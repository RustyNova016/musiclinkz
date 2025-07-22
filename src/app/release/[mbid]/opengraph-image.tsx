import { Background } from "@/components/background";
import { ImageResponse } from "next/og";
import { get_recording_data, get_release_data } from "./common";
import { PageModal } from "@/components/stateless/modal";
import { Geist } from "next/font/google";
import { join } from "path";
import { readFile } from "node:fs/promises";

// Image metadata
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function OGImage({
    params,
}: {
    params: { mbid: string };
}) {
    const { mbid } = await params;
    let release_data = await get_release_data(mbid);

    let style = `linear-gradient(111deg, ${release_data.color_a} 0%, ${release_data.color_b} 100%)`;

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
                            src={release_data.image}
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
                            {release_data.title}
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
                            by {release_data.artist_credits}
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
