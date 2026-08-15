"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAction } from "../_actions/authActions";
import { useEffect, useActionState, useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Mail, Lock, Loader2, Eye } from "lucide-react";

const LoginForm = () => {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "";
  const [state, action, pending] = useActionState(
    loginAction.bind(null, redirectTo),
    false,
  );
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!state) return;

    if (!state.success) {
      toast.error(state.message || "Login Failed");
    } else {
      toast.success("Welcome back!");
    }
  }, [state]);

  return (
    <Card className="border-none bg-transparent shadow-none w-full p-5">
      <form action={action} className="space-y-4">
        {/* Email Field */}
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

        {/* Password Field */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="password"
              className="text-sm font-semibold tracking-wide text-gray-700 dark:text-gray-300"
            >
              Password
            </Label>
            <Link
              href="/forgot-password"
              className="text-xs font-semibold text-sky-700 hover:text-sky-800 transition-colors"
            >
              Forgot Password?
            </Link>
          </div>
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
              <span>Logging in...</span>
            </>
          ) : (
            <span>Log In</span>
          )}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground mt-6">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-medium text-sky-700 hover:text-sky-800 hover:underline underline-offset-4 transition-colors"
        >
          Sign Up Now
        </Link>
      </p>
    </Card>
  );
};

export default LoginForm;
