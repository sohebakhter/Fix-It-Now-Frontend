"use client";

import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EditProfileButton() {
  const handleOpen = () => {
    window.dispatchEvent(new CustomEvent("open-edit-profile-modal"));
  };

  return (
    <Button onClick={handleOpen}>
      <Pencil className="mr-2 h-4 w-4" />
      Edit Profile
    </Button>
  );
}
