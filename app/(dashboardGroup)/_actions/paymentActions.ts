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
