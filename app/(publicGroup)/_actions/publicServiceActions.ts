"use server";

import { cookies } from "next/headers";

export const getServiceDetails = async (serviceId: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/services/details/${serviceId}`,
      {
        headers: {
          cookie: `accessToken=${accessToken}`,
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "force-cache",
        next: { revalidate: 60 * 60 * 24, tags: [`service-${serviceId}`] },
      }
    );
    const result = await res.json();
    return result;
  } catch (error: unknown) {
    return {
      success: false,
      statusCode: 500,
      message: (error as Error).message || "Failed to fetch service details",
      data: null,
    };
  }
};

export const getTechnicianDetails = async (technicianId: string) => {
  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/technicians/${technicianId}`,
      {
        cache: "force-cache",
        next: {
          revalidate: 60 * 60 * 24,
          tags: [`technician-${technicianId}`],
        },
      }
    );
    const result = await res.json();
    return result;
  } catch (error: unknown) {
    return {
      success: false,
      statusCode: 500,
      message: (error as Error).message || "Failed to fetch technician details",
      data: null,
    };
  }
};
