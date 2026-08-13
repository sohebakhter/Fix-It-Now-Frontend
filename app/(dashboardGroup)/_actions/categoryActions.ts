"use server";

import { cookies } from "next/headers";
import {  revalidatePath } from "next/cache";

export const getAllCategoriesAction = async () => {
  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories`, {
      cache: "no-store",
      next: { tags: ["categories"] },
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

export const createCategoryAction = async (payload: { name: string }) => {
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

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories/create`, {
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
      // revalidateTag("categories");
      revalidatePath("/admin-dashboard/categories");
    }

    return result;
  } catch (error: unknown) {
    return {
      success: false,
      statusCode: 500,
      message: (error as Error).message || "Failed to create category",
    };
  }
};

export const updateCategoryAction = async (
  categoryId: string,
  payload: { name: string }
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
      `${process.env.BACKEND_API_URL}/api/categories/${categoryId}`,
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
      // revalidateTag("categories");
      revalidatePath("/admin-dashboard/categories");
    }

    return result;
  } catch (error: unknown) {
    return {
      success: false,
      statusCode: 500,
      message: (error as Error).message || "Failed to update category",
    };
  }
};

export const deleteCategoryAction = async (categoryId: string) => {
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
      `${process.env.BACKEND_API_URL}/api/categories/${categoryId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          cookie: `accessToken=${accessToken}`,
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const result = await res.json();

    if (result.success) {
      // revalidateTag("categories");
      revalidatePath("/admin-dashboard/categories");
    }

    return result;
  } catch (error: unknown) {
    return {
      success: false,
      statusCode: 500,
      message: (error as Error).message || "Failed to delete category",
    };
  }
};
