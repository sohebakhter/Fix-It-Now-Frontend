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

export type IService = {
    id: string;
    technicianId: string;
    categoryId: string;
    title: string;
    description: string;
    location: string;
    price: number;
    status: string;
    createdAt: string;
    updatedAt: string;
    userId: string | null;
    category: {
        id: string;
        name: string;
        createdAt: string;
        updatedAt: string;
    };
    technician: {
        id: string;
        userId: string;
        experience: string;
        rating: string;
        createdAt: string;
        updatedAt: string;
    };
}

export type IServiceQuery = {
    searchTerm?: string;
    title?: string;
    location?: string;
    price?: string;
    rating?: string;
    sortBy?: string;
    sortOrder?: string;
    page?: string;
    limit?: string;
};

export type TAvailability = {
  id: string;
  technicianId: string;
  date: string;
  startTime: string;
  endTime: string;
  createdAt?: string;
  updatedAt?: string;
  technicianProfile?: {
    id: string;
    userId: string;
    experience: string;
    rating: string;
    createdAt?: string;
    updatedAt?: string;
  };
  bookings?: {
    id: string;
    serviceId: string;
    customerId: string;
    availabilityId: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  } | null;
  booking?: unknown;
};