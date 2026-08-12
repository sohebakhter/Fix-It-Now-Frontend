"use client";

import React, { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { deleteUserAction } from "@/app/(dashboardGroup)/_actions/userActions";

interface DeleteUserButtonProps {
  userId: string;
  userName: string;
}

export function DeleteUserButton({ userId, userName }: DeleteUserButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        const response = await deleteUserAction(userId);
        if (response.success) {
          toast.success(response.message || `User "${userName}" has been successfully deleted.`);
          setIsOpen(false);
        } else {
          toast.error(response.message || `Failed to delete user.`);
        }
      } catch (error: unknown) {
        toast.error((error as Error).message || "An unexpected error occurred.");
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          size="sm"
          className="rounded-xl flex items-center gap-1.5 cursor-pointer"
        >
          <Trash2 className="size-3.5" />
          <span>Delete</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md rounded-2xl">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-xl font-bold text-foreground">
            Delete User Account
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
            Are you absolutely sure you want to delete <strong>{userName}</strong>? This action is permanent and cannot be undone. All associated data will be removed.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4 gap-2 sm:gap-0">
          <DialogClose asChild>
            <Button variant="outline" className="rounded-xl cursor-pointer">
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            className="rounded-xl flex items-center gap-1.5 cursor-pointer bg-red-600 hover:bg-red-700 text-white"
            disabled={isPending}
            onClick={handleDelete}
          >
            {isPending ? (
              <Spinner className="size-3.5 animate-spin" />
            ) : (
              <>
                <Trash2 className="size-3.5" />
                <span>Delete Account</span>
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteUserButton;
