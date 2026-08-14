"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EditProfileForm } from "./EditProfileForm";
import type { TUserData } from "@/lib/types";

interface EditProfileModalProps {
  user?: TUserData | null;
}

export default function EditProfileModal({ user }: EditProfileModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-edit-profile-modal", handleOpen);
    return () => {
      window.removeEventListener("open-edit-profile-modal", handleOpen);
    };
  }, []);

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Edit Profile</DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Update your profile details.
          </DialogDescription>
        </DialogHeader>
        <EditProfileForm user={user} onClose={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
