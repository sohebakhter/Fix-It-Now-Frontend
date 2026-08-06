

type TTechnicianProfile = {
    id: string;
    userId: string;
    experience: string;
    rating: string;
    createdAt: string;
    updatedAt: string;
}

type TUserData = {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    stripeCustomerId: string;
    createdAt: string;
    updatedAt: string;
    technicianProfile: TTechnicianProfile | null;
}

type TUser = {
    success: boolean;
    statusCode: number;
    message: string;
    data: TUserData;
}




export type TNavbarProps = {
    user: TUser
}