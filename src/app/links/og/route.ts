import { LinkPageOG } from "@/components/opengraph/link_page_og";
import { get_entity_data } from "../get_data";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    let data = await get_entity_data(searchParams.get('entity_type') || "", searchParams.get('id') || "");

    return LinkPageOG(data);
}