"use server";

import { cookies } from "next/headers";
import { revalidateTag, revalidatePath } from "next/cache";

export type TCreateServicePayload = {
  categoryId: string;
  title: string;
  description: string;
  location: string;
  price: number;
};

export const getMyServicesAction = async () => {
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
      `${process.env.BACKEND_API_URL}/api/services/my-services`,
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
      message: (error as Error).message || "Failed to fetch your services",
      data: [],
    };
  }
};

export const getCategoriesAction = async () => {
  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories`, {
      cache: "force-cache",
      next: { revalidate: 60 * 60 * 24, tags: ["categories"] },
    });

    const result = await res.json();
    return result;
  } catch (error: unknown) {
    return {
      success: false,
      statusCode: 500,
      message: (error as Error).message || "Failed to fetch categories",
      data: [],
    };
  }
};

export const createServiceAction = async (payload: TCreateServicePayload) => {
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
      `${process.env.BACKEND_API_URL}/api/services/create`,
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
      revalidateTag("services", { expire: 0 });
      revalidatePath("/services");
      revalidatePath("/technician-dashboard/my-services");
    }

    return result;
  } catch (error: unknown) {
    return {
      success: false,
      statusCode: 500,
      message: (error as Error).message || "Failed to create service",
    };
  }
};

export const updateServiceAction = async (
  serviceId: string,
  payload: Partial<TCreateServicePayload>
) => {
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
      `${process.env.BACKEND_API_URL}/api/services/${serviceId}`,
      {
        method: "PATCH",
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
      revalidateTag("services", { expire: 0 });
      revalidatePath("/services");
      revalidatePath("/technician-dashboard/my-services");
    }

    return result;
  } catch (error: unknown) {
    return {
      success: false,
      statusCode: 500,
      message: (error as Error).message || "Failed to update service",
    };
  }
};

export const deleteServiceAction = async (serviceId: string) => {
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
      `${process.env.BACKEND_API_URL}/api/services/${serviceId}`,
      {
        method: "DELETE",
        headers: {
          cookie: `accessToken=${accessToken}`,
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const result = await res.json();

    if (result.success) {
      revalidateTag("services", { expire: 0 });
      revalidatePath("/services");
      revalidatePath("/technician-dashboard/my-services");
    }

    return result;
  } catch (error: unknown) {
    return {
      success: false,
      statusCode: 500,
      message: (error as Error).message || "Failed to delete service",
    };
  }
};
