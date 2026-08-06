import jwt from "jsonwebtoken"

const verifyToken = (token: string, secret: string) => {
    try {
        const decoded = jwt.verify(token, secret)

        return {
            success: true,
            data: decoded
        }
    } catch (error: unknown) {
        console.log("Token verification failed", error)

        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error"
        }
    }
}

export const jwtUtils = {

    verifyToken
}