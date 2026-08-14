"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface NameInputFieldProps {
  value: string;
  onChange: (val: string) => void;
  disabled: boolean;
}

export function NameInputField({ value, onChange, disabled }: NameInputFieldProps) {
  return (
    <div className="space-y-1.5 text-left">
      <Label htmlFor="profile-name">Full Name</Label>
      <Input
        id="profile-name"
        type="text"
        placeholder="Your full name"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        required
        className="rounded-xl h-10"
      />
    </div>
  );
}
