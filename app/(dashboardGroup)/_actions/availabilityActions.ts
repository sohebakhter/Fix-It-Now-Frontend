"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

export type TCreateAvailabilityPayload = {
  date: string; // ISO string e.g. "2026-08-12T00:00:00.000Z"
  startTime: string; // HH:MM e.g. "09:00"
  endTime: string; // HH:MM e.g. "17:00"
};

export const getMyAvailabilitiesAction = async () => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        statusCode: 401,
        message: "Unauthorized. Please log in first.",
        data: [],
      };
    }

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/availabilities/my`,
      {
        headers: {
          cookie: `accessToken=${accessToken}`,
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      }
    );

    const result = await res.json();
    return result;
  } catch (error: unknown) {
    return {
      success: false,
      statusCode: 500,
      message: (error as Error).message || "Failed to fetch your availabilities",
      data: [],
    };
  }
};

export const createAvailabilityAction = async (payload: TCreateAvailabilityPayload) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        statusCode: 401,
        message: "Unauthorized. Please log in first.",
      };
    }

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/availabilities/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          cookie: `accessToken=${accessToken}`,
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await res.json();

    if (result.success) {
      revalidateTag("availabilities", { expire: 0 });
    }

    return result;
  } catch (error: unknown) {
    return {
      success: false,
      statusCode: 500,
      message: (error as Error).message || "Failed to create availability",
    };
  }
};
