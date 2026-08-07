import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";


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

export type TSidebarItem = {
    label?: string;
    href: string;
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
}