"use server"

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const getAllUsers = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    try {
        const response = await fetch(`${process.env.BACKEND_API_URL}/api/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
                cookie: `accessToken=${accessToken}`,
            },
        });

        const result = await response.json();
        return result;
    } catch (error: unknown) {
        console.error(error);
        return {
            success: false,
            statusCode: 500,
            message: (error as Error).message || "Internal Server Error",
        };
    }
}

export const updateUserStatusAction = async (userId: string, status: "BAN" | "UN_BAN") => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    try {
        const response = await fetch(`${process.env.BACKEND_API_URL}/api/users/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
                cookie: `accessToken=${accessToken}`,
            },
            body: JSON.stringify({ status })
        });

        const result = await response.json();
        if (result.success) {
            revalidatePath("/admin-dashboard/all-users");
        }
        return result;
    } catch (error: unknown) {
        console.error(error);
        return {
            success: false,
            statusCode: 500,
            message: (error as Error).message || "Internal Server Error",
        };
    }
}

export const deleteUserAction = async (userId: string) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    try {
        const response = await fetch(`${process.env.BACKEND_API_URL}/api/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
                cookie: `accessToken=${accessToken}`,
            },
        });

        const result = await response.json();
        if (result.success) {
            revalidatePath("/admin-dashboard/all-users");
        }
        return result;
    } catch (error: unknown) {
        console.error(error);
        return {
            success: false,
            statusCode: 500,
            message: (error as Error).message || "Internal Server Error",
        };
    }
}
