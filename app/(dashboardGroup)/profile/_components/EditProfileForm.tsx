"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { NameInputField } from "./NameInputField";
import { updateMyProfileAction } from "@/app/(dashboardGroup)/_actions/userActions";
import type { TUserData } from "@/lib/types";
import { ExperienceInputField } from "./ExperienceInputField";
import { ImageInputField } from "./ImageInputField";
import { FormSubmitButton } from "./FormSubmitButton";

interface EditProfileFormProps {
  user: TUserData;
  onClose: () => void;
}

export function EditProfileForm({ user, onClose }: EditProfileFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [name, setName] = useState(user.name || "");
  const [image, setImage] = useState(user.image || "");
  const [experience, setExperience] = useState(
    user.technicianProfile?.experience?.toString() || ""
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }

    startTransition(async () => {
      try {
        const payload: { name: string; image?: string; experience?: number } = {
          name: name.trim(),
          image: image.trim() || undefined,
        };

        if (user.role === "TECHNICIAN") {
          const parsedExp = parseInt(experience, 10);
          payload.experience = isNaN(parsedExp) ? 0 : parsedExp;
        }

        const response = await updateMyProfileAction(payload);

        if (response.success) {
          toast.success("Profile updated successfully!");
          router.refresh();
          onClose();
        } else {
          toast.error(response.message || "Failed to update profile");
        }
      } catch (error: unknown) {
        toast.error((error as Error).message || "An unexpected error occurred");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-2">
      <NameInputField value={name} onChange={setName} disabled={isPending} />
      <ImageInputField value={image} onChange={setImage} disabled={isPending} />
      <ExperienceInputField
        value={experience}
        onChange={setExperience}
        disabled={isPending}
        role={user.role}
      />
      <FormSubmitButton isPending={isPending} onCancel={onClose} />
    </form>
  );
}
