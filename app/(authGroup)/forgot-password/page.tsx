import React from "react";
import ForgotPasswordForm from "../_components/ForgotPasswordForm";
import { Wrench, KeyRound, ShieldCheck, MailCheck } from "lucide-react";

const ForgotPasswordPage = () => {
  return (
    <div className="min-h-screen grid lg:grid-cols-12 bg-gray-50 dark:bg-gray-950 font-sans">
      {/* Left side: Branding & Tips */}
      <div className="hidden lg:flex lg:col-span-6 relative overflow-hidden bg-linear-to-br from-sky-900 via-sky-800 to-sky-700 flex-col justify-between p-12 text-white">
        {/* Background decorative patterns */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_50%)]" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="absolute right-10 top-1/3 w-60 h-60 rounded-full bg-sky-500/20 blur-2xl pointer-events-none" />

        {/* Brand Header */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20">
            <Wrench className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-black tracking-tight">
            FixIt<span className="text-sky-300">Now</span>
          </span>
        </div>

        {/* Core Message */}
        <div className="relative z-10 space-y-8 my-auto">
          <div className="space-y-4">
            <h1 className="text-4xl xl:text-5xl font-extrabold tracking-tight leading-tight">
              Recover Your Account.
            </h1>
            <p className="text-lg text-sky-100/90 leading-relaxed font-light">
              No worries — just follow the three quick steps to securely reset
              your password and get back to managing your services.
            </p>
          </div>

          {/* Steps overview */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm p-3.5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
              <MailCheck className="h-6 w-6 text-sky-300 shrink-0" />
              <div>
                <h4 className="font-semibold text-sm">Step 1 — Enter Email</h4>
                <p className="text-xs text-sky-200/80">
                  Tell us the email associated with your account.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm p-3.5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
              <KeyRound className="h-6 w-6 text-sky-400 shrink-0" />
              <div>
                <h4 className="font-semibold text-sm">Step 2 — Verify OTP</h4>
                <p className="text-xs text-sky-200/80">
                  Enter the one-time code we send to your inbox.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm p-3.5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
              <ShieldCheck className="h-6 w-6 text-sky-400 shrink-0" />
              <div>
                <h4 className="font-semibold text-sm">
                  Step 3 — Set New Password
                </h4>
                <p className="text-xs text-sky-300/80">
                  Choose a strong new password and you&apos;re back in.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 border-t border-white/10 pt-6">
          <p className="text-xs text-sky-300/70">
            Your account security is our priority. OTPs expire after a short
            time for your protection.
          </p>
        </div>
      </div>

      {/* Right side: Forgot Password Form */}
      <div className="col-span-12 lg:col-span-6 flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-12 bg-white dark:bg-gray-950">
        <div className="mx-auto w-full max-w-105 space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Forgot Password?
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Reset it in 3 easy steps — no sweat.
            </p>
          </div>

          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
