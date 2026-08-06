 "use server";
import { cookies } from "next/headers";


export const getMe = async () => {

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/users/me`, {
        headers: { cookie: `accessToken=${accessToken}` },
    });

    const result = await res.json();

    return result;

}

