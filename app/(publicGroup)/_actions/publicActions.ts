"use server";

import type { IServiceQuery } from "@/lib/types";

export const getServices = async (query: IServiceQuery = {}) => {
    const params = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
            params.append(key, value);
        }
    });

    const queryString = params.toString();

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/services${queryString ? `?${queryString}` : ""}`, {
        cache: "force-cache",
        next: { revalidate: 60 * 60 * 24, tags: ["services"] },
    });

    const result = await res.json();
    return result;
};