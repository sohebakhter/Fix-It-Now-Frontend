"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ExperienceInputFieldProps {
  value: string;
  onChange: (val: string) => void;
  disabled: boolean;
  role?: string;
}

export function ExperienceInputField({ value, onChange, disabled, role }: ExperienceInputFieldProps) {
  if (role !== "TECHNICIAN") return null;

  return (
    <div className="space-y-1.5 text-left">
      <Label htmlFor="profile-experience">Experience (Years)</Label>
      <Input
        id="profile-experience"
        type="number"
        min="0"
        placeholder="Years of experience"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="rounded-xl h-10"
      />
    </div>
  );
}
