"use client";

import { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  KeyRound,
  Lock,
  Loader2,
  ArrowLeft,
  ShieldCheck,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  sendOtpAction,
  verifyOtpAction,
  resetPasswordAction,
} from "../_actions/authActions";

type Step = "email" | "otp" | "reset";

const ForgotPasswordForm = () => {
  const router = useRouter();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [resendCoolDown, setResendCoolDown] = useState(0);

  useEffect(() => {
    if (resendCoolDown <= 0) return;

    const timer = setInterval(() => {
      setResendCoolDown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resendCoolDown]);

  // ── Step 1: Send OTP ──
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    startTransition(async () => {
      const result = await sendOtpAction(email);
      if (result.success) {
        toast.success(result.message || "OTP sent to your email!");
        setStep("otp");
      } else {
        toast.error(result.message || "Failed to send OTP. Please try again.");
      }
    });
  };

  // ── Step 2: Verify OTP ──
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 4) {
      toast.error("Please enter the full OTP code.");
      return;
    }

    startTransition(async () => {
      const result = await verifyOtpAction(email, otp);
      if (result.success) {
        toast.success(result.message || "OTP verified successfully!");
        setStep("reset");
      } else {
        toast.error(result.message || "Invalid OTP code.");
      }
    });
  };

  // ── Step 3: Reset Password ──
  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    startTransition(async () => {
      const result = await resetPasswordAction(email, otp, newPassword);
      if (result.success) {
        toast.success(result.message || "Password reset successfully!");
        setStep("email");
        router.push("/login");
      } else {
        toast.error(result.message || "Invalid OTP or request expired.");
        setStep("otp");
      }
    });
  };

  const steps: { key: Step; label: string; index: number }[] = [
    { key: "email", label: "Enter Email", index: 1 },
    { key: "otp", label: "Verify OTP", index: 2 },
    { key: "reset", label: "New Password", index: 3 },
  ];

  const currentStepMeta = steps.find((s) => s.key === step) || steps[0];

  return (
    <Card className="border-none bg-transparent shadow-none w-full p-5 space-y-6">
      {/* Progress indicator */}
      <div className="flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={s.key} className="flex items-center gap-2">
            <div
              className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-all duration-300 ${
                step === s.key
                  ? "bg-orange-500 text-white shadow-md shadow-orange-400/30"
                  : currentStepMeta.index > s.index
                    ? "bg-sky-700 text-white"
                    : "bg-gray-200 dark:bg-gray-800 text-gray-500"
              }`}
            >
              {currentStepMeta.index > s.index ? "✓" : s.index}
            </div>
            {i < 2 && (
              <div
                className={`h-0.5 w-8 rounded transition-all duration-500 ${
                  currentStepMeta.index > s.index
                    ? "bg-sky-700"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}
              />
            )}
          </div>
        ))}
        <span className="ml-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
          Step {currentStepMeta.index} of 3 — {currentStepMeta.label}
        </span>
      </div>

      {/* ── Step 1: Email ── */}
      {step === "email" && (
        <form onSubmit={handleSendOtp} className="space-y-4">
          <div className="space-y-1">
            <Label
              htmlFor="fp-email"
              className="text-sm font-semibold tracking-wide text-gray-700 dark:text-gray-300"
            >
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                id="fp-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="pl-9 h-11 border-gray-200 dark:border-gray-800 rounded-xl focus-visible:ring-sky-700 focus-visible:border-sky-800 transition-all duration-200"
                required
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 pt-1">
              We&apos;ll send a one-time code to this address.
            </p>
          </div>

          <Button
            type="submit"
            disabled={isPending}
            style={{ backgroundColor: "rgb(249 115 22)" }}
            className="w-full text-white font-semibold h-11 rounded-xl transition-all duration-200 hover:opacity-95 shadow-md shadow-orange-500/10 hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Sending OTP…</span>
              </>
            ) : (
              <>
                <Mail className="h-4 w-4" />
                <span>Send OTP</span>
              </>
            )}
          </Button>
        </form>
      )}

      {/* ── Step 2: OTP ── */}
      {step === "otp" && (
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-900">
            <ShieldCheck className="h-5 w-5 text-sky-600 shrink-0 mt-0.5" />
            <p className="text-xs text-sky-700 dark:text-sky-300 leading-relaxed">
              A code was sent to <span className="font-semibold">{email}</span>.
              Check your inbox (and spam folder).
            </p>
          </div>

          <div className="space-y-1">
            <Label
              htmlFor="fp-otp"
              className="text-sm font-semibold tracking-wide text-gray-700 dark:text-gray-300"
            >
              One-Time Code
            </Label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                id="fp-otp"
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                placeholder="Enter OTP"
                className="pl-9 h-11 border-gray-200 dark:border-gray-800 rounded-xl tracking-widest text-center text-lg font-semibold focus-visible:ring-sky-700 focus-visible:border-sky-800 transition-all duration-200"
                required
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep("email")}
              className="h-11 rounded-xl border-gray-200 dark:border-gray-800 flex items-center gap-1.5"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              style={{ backgroundColor: "rgb(249 115 22)" }}
              className="flex-1 text-white font-semibold h-11 rounded-xl transition-all duration-200 hover:opacity-95 shadow-md active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Verifying…</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4" />
                  <span>Verify OTP</span>
                </>
              )}
            </Button>
          </div>

          <button
            type="button"
            disabled={isPending || resendCoolDown > 0}
            onClick={() => {
              startTransition(async () => {
                const result = await sendOtpAction(email);
                if (result.success) {
                  toast.success("A new OTP has been sent!");
                  setResendCoolDown(60);
                } else {
                  toast.error(result.message || "Could not resend OTP.");
                }
              });
            }}
            className="text-xs text-sky-700 hover:text-sky-800 transition-colors font-medium w-full text-center disabled:opacity-50"
          >
            {isPending
              ? "Sending…"
              : resendCoolDown > 0
                ? `Resend OTP in ${resendCoolDown}s`
                : "Didn't receive it? Resend OTP"}
          </button>
        </form>
      )}

      {/* ── Step 3: New Password ── */}
      {step === "reset" && (
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div className="space-y-1">
            <Label
              htmlFor="fp-new-password"
              className="text-sm font-semibold tracking-wide text-gray-700 dark:text-gray-300"
            >
              New Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                id="fp-new-password"
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Min. 6 characters"
                className="pl-9 pr-9 h-11 border-gray-200 dark:border-gray-800 rounded-xl focus-visible:ring-sky-700 focus-visible:border-sky-800 transition-all duration-200"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <Label
              htmlFor="fp-confirm-password"
              className="text-sm font-semibold tracking-wide text-gray-700 dark:text-gray-300"
            >
              Confirm Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                id="fp-confirm-password"
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className="pl-9 pr-9 h-11 border-gray-200 dark:border-gray-800 rounded-xl focus-visible:ring-sky-700 focus-visible:border-sky-800 transition-all duration-200"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirm ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep("otp")}
              className="h-11 rounded-xl border-gray-200 dark:border-gray-800 flex items-center gap-1.5"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              style={{ backgroundColor: "rgb(249 115 22)" }}
              className="flex-1 text-white font-semibold h-11 rounded-xl transition-all duration-200 hover:opacity-95 shadow-md active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Resetting…</span>
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4" />
                  <span>Reset Password</span>
                </>
              )}
            </Button>
          </div>
        </form>
      )}

      {/* Back to login */}
      <p className="text-center text-sm text-muted-foreground">
        Remembered your password?{" "}
        <Link
          href="/login"
          className="font-medium text-sky-700 hover:text-sky-800 hover:underline underline-offset-4 transition-colors"
        >
          Sign In
        </Link>
      </p>
    </Card>
  );
};

export default ForgotPasswordForm;
