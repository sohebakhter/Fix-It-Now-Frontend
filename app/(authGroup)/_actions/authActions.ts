"use server";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redirect } from "next/navigation";
import { TSignUpState } from "@/lib/types";

type LoginState = {
    success: boolean,
    statusCode: number,
    message: string,
    data: {
        accessToken: string,
        refreshToken: string
    }

}
export const loginAction = async (redirectTo: string, prevState: LoginState, formData: FormData) => {

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const payload = { email, password };

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (result.success) {
        const cookieStore = await cookies();
        cookieStore.set("accessToken", result.data.accessToken, {
            httpOnly: true,
            // secure: true,
            sameSite: "lax",
            maxAge: 60 * 60 * 24// 1 day
        });
        cookieStore.set("refreshToken", result.data.refreshToken, {
            httpOnly: true,
            // secure: true,
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7// 7 day
        });
    }

    const decodedToken = jwt.decode(result?.data?.accessToken) as JwtPayload

    if (redirectTo && typeof redirectTo === "string" && redirectTo.startsWith("/") && !redirectTo.startsWith("//")) {
        redirect(redirectTo, "replace");
    }

    if (decodedToken?.role === "CUSTOMER") {
        redirect("/dashboard");
    } else if (decodedToken?.role === "TECHNICIAN") {
        redirect("/technician-dashboard");
    } else if (decodedToken?.role === "ADMIN") {
        redirect("/admin-dashboard");
    }

    return result;

}

export const logout = async () => {
    const cookieStore = await cookies();
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
};

export const signUp = async (prevState: TSignUpState, formData: FormData) => {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const image = formData.get("image") as string;
    const role = formData.get("role") as string;

    const payload = { name, email, password, image, role };

    let result;
    try {
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/users/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        result = await res.json();
    } catch (error) {
        return {
            success: false,
            message: (error as Error).message || "Something went wrong"
        };
    }

    if (result?.success) {
        redirect("/login");
    }

    return result;
};