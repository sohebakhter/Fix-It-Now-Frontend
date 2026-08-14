"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ImageInputFieldProps {
  value: string;
  onChange: (val: string) => void;
  disabled: boolean;
}

export function ImageInputField({ value, onChange, disabled }: ImageInputFieldProps) {
  return (
    <div className="space-y-1.5 text-left">
      <Label htmlFor="profile-image">Avatar URL</Label>
      <Input
        id="profile-image"
        type="text"
        placeholder="https://example.com/avatar.png"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="rounded-xl h-10"
      />
    </div>
  );
}
