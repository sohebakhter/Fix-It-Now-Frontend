"use client";

import React, { useActionState, useState, useEffect } from "react";
import { signUp } from "../_actions/authActions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import {
  User,
  Mail,
  Lock,
  Link2,
  Wrench,
  UserCheck,
  Loader2,
  Eye,
} from "lucide-react";

const SignUpForm = () => {
  const [state, action, pending] = useActionState(signUp, null);
  const [selectedRole, setSelectedRole] = useState<"CUSTOMER" | "TECHNICIAN">(
    "CUSTOMER",
  );
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (state && !state.success) {
      toast.error(state.message || "Registration failed. Please try again.");
    }
  }, [state]);

  return (
    <Card className="border-none bg-transparent shadow-none w-full p-5">
      <form action={action} className="space-y-4">
        {/* Name Input */}
        <div className="space-y-1">
          <Label
            htmlFor="name"
            className="text-sm font-semibold tracking-wide text-gray-700 dark:text-gray-300"
          >
            Full Name
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="e.g. John Doe"
              className="pl-9 h-11 border-gray-200 dark:border-gray-800 rounded-xl focus-visible:ring-sky-700 focus-visible:border-sky-800 transition-all duration-200"
              required
            />
          </div>
        </div>

        {/* Email Input */}
        <div className="space-y-1">
          <Label
            htmlFor="email"
            className="text-sm font-semibold tracking-wide text-gray-700 dark:text-gray-300"
          >
            Email Address
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              className="pl-9 h-11 border-gray-200 dark:border-gray-800 rounded-xl focus-visible:ring-sky-700 focus-visible:border-sky-800 transition-all duration-200"
              required
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="space-y-1">
          <Label
            htmlFor="password"
            className="text-sm font-semibold tracking-wide text-gray-700 dark:text-gray-300"
          >
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="pl-9 h-11 border-gray-200 dark:border-gray-800 rounded-xl focus-visible:ring-sky-700 focus-visible:border-sky-800 transition-all duration-200"
              required
            />
            <Eye
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>

        {/* Photo URL Input */}
        <div className="space-y-1">
          <Label
            htmlFor="image"
            className="text-sm font-semibold tracking-wide text-gray-700 dark:text-gray-300"
          >
            Photo URL
          </Label>
          <div className="relative">
            <Link2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              id="image"
              name="image"
              type="url"
              placeholder="https://example.com/avatar.jpg"
              className="pl-9 h-11 border-gray-200 dark:border-gray-800 rounded-xl focus-visible:ring-sky-700 focus-visible:border-sky-800 transition-all duration-200"
              required
            />
          </div>
        </div>

        {/* Role Selection */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold tracking-wide text-gray-700 dark:text-gray-300">
            Select Your Role
          </Label>
          <input type="hidden" name="role" value={selectedRole} />

          <div className="grid grid-cols-2 gap-4">
            {/* Customer Role Card */}
            <div
              onClick={() => setSelectedRole("CUSTOMER")}
              className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:shadow-md ${
                selectedRole === "CUSTOMER"
                  ? "border-sky-700 bg-sky-50/50 dark:bg-sky-950/20 scale-[1.02] shadow-sm"
                  : "border-gray-200 dark:border-gray-800 hover:border-sky-200 dark:hover:border-sky-950/50"
              }`}
            >
              <div
                className={`p-2.5 rounded-xl mb-2 transition-colors duration-300 ${
                  selectedRole === "CUSTOMER"
                    ? "bg-sky-700 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-500"
                }`}
              >
                <UserCheck className="h-5 w-5" />
              </div>
              <span className="font-bold text-sm text-gray-800 dark:text-gray-200">
                Customer
              </span>
              <span className="text-[11px] text-gray-500 text-center mt-0.5">
                Need repairs & services
              </span>
            </div>

            {/* Technician Role Card */}
            <div
              onClick={() => setSelectedRole("TECHNICIAN")}
              className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:shadow-md ${
                selectedRole === "TECHNICIAN"
                  ? "border-sky-700 bg-sky-50/50 dark:bg-sky-950/20 scale-[1.02] shadow-sm"
                  : "border-gray-200 dark:border-gray-800 hover:border-sky-200 dark:hover:border-sky-950/50"
              }`}
            >
              <div
                className={`p-2.5 rounded-xl mb-2 transition-colors duration-300 ${
                  selectedRole === "TECHNICIAN"
                    ? "bg-sky-700 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-500"
                }`}
              >
                <Wrench className="h-5 w-5" />
              </div>
              <span className="font-bold text-sm text-gray-800 dark:text-gray-200">
                Technician
              </span>
              <span className="text-[11px] text-gray-500 text-center mt-0.5">
                Want to offer services
              </span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={pending}
          style={{ backgroundColor: "rgb(249 115 22)" }}
          className="w-full text-white font-semibold h-11 rounded-xl transition-all duration-200 hover:opacity-95 shadow-md shadow-sky-500/10 hover:shadow-lg hover:shadow-sky-500/20 active:scale-[0.98] mt-2 flex items-center justify-center gap-2"
        >
          {pending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin text-white" />
              <span>Registering account...</span>
            </>
          ) : (
            <span>Create Account</span>
          )}
        </Button>
      </form>
    </Card>
  );
};

export default SignUpForm;
