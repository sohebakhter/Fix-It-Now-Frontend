"use server";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

export const revalidatePaymentAction = async () => {
  revalidateTag("my-bookings", { expire: 0 });
  revalidateTag("availabilities", { expire: 0 });
  revalidateTag("services", { expire: 0 });
};

export const createCheckoutSessionAction = async (bookingId: string) => {
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
      `${process.env.BACKEND_API_URL}/api/payments/checkout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          cookie: `accessToken=${accessToken}`,
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ bookingId }),
      }
    );

    const result = await res.json();
    if (result.success) {
      revalidateTag("payment-history", { expire: 0 });
      revalidateTag(`payment-${bookingId}`, { expire: 0 });
    }
    return result;
  } catch (error: unknown) {
    return {
      success: false,
      statusCode: 500,
      message: (error as Error).message || "Failed to create checkout session",
      error: (error as Error).toString(),
    };
  }
};

export const getPaymentHistory = async () => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return { success: false, data: [] };
    }

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/payments/history`,
      {
        headers: {
          cookie: `accessToken=${accessToken}`,
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "force-cache",
        next: { revalidate: 60 * 60 * 24, tags: ["payment-history"] },
      }
    );

    const result = await res.json();
    return result;
  } catch (error: unknown) {
    return {
      success: false,
      statusCode: 500,
      message: (error as Error).message || "Failed to fetch payment history",
      data: [],
    };
  }
};

export const getPaymentDetails = async (paymentId: string) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return { success: false, data: null };
    }

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/payments/details/${paymentId}`,
      {
        headers: {
          cookie: `accessToken=${accessToken}`,
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "force-cache",
        next: { revalidate: 60 * 60 * 24, tags: [`payment-${paymentId}`] },
      }
    );

    const result = await res.json();
    return result;
  } catch (error: unknown) {
    return {
      success: false,
      statusCode: 500,
      message: (error as Error).message || "Failed to fetch payment details",
      data: null,
    };
  }
};
