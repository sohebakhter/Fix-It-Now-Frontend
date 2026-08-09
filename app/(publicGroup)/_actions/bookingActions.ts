"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export type TAvailability = {
  id: string;
  technicianId: string;
  date: string;
  startTime: string;
  endTime: string;
  createdAt?: string;
  updatedAt?: string;
  technicianProfile?: {
    id: string;
    userId: string;
    experience: string;
    rating: string;
    createdAt?: string;
    updatedAt?: string;
  };
  bookings?: unknown[];
  booking?: unknown;
};

export const getAvailabilities = async () => {
  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/availabilities`, {
      cache: "force-cache",
      next: { revalidate: 60 * 60 * 24, tags: ["availabilities"] },
    });
    const result = await res.json();
    return result;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error).message || "Failed to fetch availabilities",
      data: [],
    };
  }
};

export const getMyBookings = async () => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return { success: false, data: [] };
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/bookings/my-bookings`, {
      headers: {
        cookie: `accessToken=${accessToken}`,
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "force-cache",
      next: { revalidate: 60 * 60 * 24, tags: ["my-bookings"] },
    });
    const result = await res.json();
    return result;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error).message || "Failed to fetch bookings",
      data: [],
    };
  }
};

export const createBookingAction = async (payload: {
  serviceId: string;
  availabilityId: string;
}) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        statusCode: 401,
        message: "Unauthorized. Please log in as a customer to book this service.",
      };
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/bookings/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: `accessToken=${accessToken}`,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    if (result.success) {
      revalidateTag("my-bookings", { expire: 0 });
      revalidateTag("availabilities", { expire: 0 });
    } else {
      revalidateTag("services", { expire: 0 });
    }
    return result;
  } catch (error: unknown) {
    return {
      success: false,
      statusCode: 500,
      message: (error as Error).message || "Failed to create booking",
      error: (error as Error).toString(),
    };
  }
};

export const cancelBookingAction = async (bookingId: string) => {
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
      `${process.env.BACKEND_API_URL}/api/bookings/${bookingId}/cancel`,
      {
        method: "PATCH",
        headers: {
          cookie: `accessToken=${accessToken}`,
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const result = await res.json();
    if (result.success) {
      revalidateTag("my-bookings", { expire: 0 });
      revalidateTag("availabilities", { expire: 0 });
    }
    return result;
  } catch (error: unknown) {
    return {
      success: false,
      statusCode: 500,
      message: (error as Error).message || "Failed to cancel booking",
      error: (error as Error).toString(),
    };
  }
};

export const createReviewAction = async (payload: {
  bookingId: string;
  rating: number;
  comment: string;
}) => {
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

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/reviews/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: `accessToken=${accessToken}`,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    if (result.success) {
      revalidateTag("my-bookings", { expire: 0 });
      revalidateTag("services", { expire: 0 });
    }
    return result;
  } catch (error: unknown) {
    return {
      success: false,
      statusCode: 500,
      message: (error as Error).message || "Failed to submit review",
      error: (error as Error).toString(),
    };
  }
};
