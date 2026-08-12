"use client";

import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Ban, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { updateUserStatusAction } from "@/app/(dashboardGroup)/_actions/userActions";

interface UpdateUserButtonProps {
  userId: string;
  currentStatus: string; // "BAN" or "UN_BAN"
}

export function UpdateUserButton({ userId, currentStatus }: UpdateUserButtonProps) {
  const [isPending, startTransition] = useTransition();
  const isBanned = currentStatus === "BAN";

  const handleToggleStatus = () => {
    const nextStatus = isBanned ? "UN_BAN" : "BAN";
    const statusText = isBanned ? "unban" : "ban";

    startTransition(async () => {
      try {
        const response = await updateUserStatusAction(userId, nextStatus);
        if (response.success) {
          toast.success(response.message || `User has been successfully ${isBanned ? "unbanned" : "banned"}.`);
        } else {
          toast.error(response.message || `Failed to ${statusText} user.`);
        }
      } catch (error: unknown) {
        toast.error((error as Error).message || "An unexpected error occurred.");
      }
    });
  };

  return (
    <Button
      variant={isBanned ? "secondary" : "destructive"}
      size="sm"
      className="rounded-xl flex items-center gap-1.5 min-w-22.5 cursor-pointer"
      disabled={isPending}
      onClick={handleToggleStatus}
    >
      {isPending ? (
        <Spinner className="size-3.5 animate-spin" />
      ) : isBanned ? (
        <>
          <ShieldCheck className="size-3.5 text-green-600 dark:text-green-400" />
          <span>Unban</span>
        </>
      ) : (
        <>
          <Ban className="size-3.5" />
          <span>Ban</span>
        </>
      )}
    </Button>
  );
}

export default UpdateUserButton;
