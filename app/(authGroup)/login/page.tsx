import React from "react";
import LoginForm from "../_components/LoginForm";
import { Wrench, CheckCircle, ShieldCheck, Clock, Star } from "lucide-react";

const LoginPage = () => {
  return (
    <div className="min-h-screen grid lg:grid-cols-12 bg-gray-50 dark:bg-gray-950 font-sans">
      {/* Left side: Project Info & Vibes */}
      <div className="hidden lg:flex lg:col-span-6 relative overflow-hidden bg-linear-to-br from-sky-600 via-sky-500 to-amber-500 flex-col justify-between p-12 text-white">
        {/* Background decorative patterns */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_50%)]" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="absolute right-10 top-1/3 w-60 h-60 rounded-full bg-sky-400/20 blur-2xl pointer-events-none" />

        {/* Brand Header */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20">
            <Wrench className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-black tracking-tight">
            FixIt<span className="text-sky-100">Now</span>
          </span>
        </div>

        {/* Core Message & Vibes */}
        <div className="relative z-10 space-y-8 my-auto">
          <div className="space-y-4">
            <h1 className="text-4xl xl:text-5xl font-extrabold tracking-tight leading-tight">
              Welcome Back to FixItNow.
            </h1>
            <p className="text-lg text-sky-50/90 leading-relaxed font-light">
              Sign in to manage your appointments, connect with service professionals, or trace your ongoing job statuses.
            </p>
          </div>

          {/* Key Value Props */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm p-3.5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
              <ShieldCheck className="h-6 w-6 text-sky-200 shrink-0" />
              <div>
                <h4 className="font-semibold text-sm">Secure Sign In</h4>
                <p className="text-xs text-sky-100/80">Your account is protected with enterprise-grade security protocols.</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm p-3.5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
              <Clock className="h-6 w-6 text-sky-200 shrink-0" />
              <div>
                <h4 className="font-semibold text-sm">Efficient Dashboards</h4>
                <p className="text-xs text-sky-100/80">Quick links to check tasks, message customers, or track status.</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm p-3.5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
              <CheckCircle className="h-6 w-6 text-sky-200 shrink-0" />
              <div>
                <h4 className="font-semibold text-sm">Instant Notifications</h4>
                <p className="text-xs text-sky-100/80">Stay updated on active service requests and incoming offers.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer/Vibes Stats */}
        <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-6">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full border-2 border-sky-500 bg-gray-300 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&fit=crop&crop=faces&q=80" alt="avatar" />
              </div>
              <div className="w-8 h-8 rounded-full border-2 border-sky-500 bg-gray-300 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&fit=crop&crop=faces&q=80" alt="avatar" />
              </div>
              <div className="w-8 h-8 rounded-full border-2 border-sky-500 bg-gray-300 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=80&fit=crop&crop=faces&q=80" alt="avatar" />
              </div>
            </div>
            <span className="text-xs font-medium text-sky-100">Joined by 10k+ users</span>
          </div>

          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-white text-white" />
            ))}
            <span className="text-xs font-bold ml-1">4.9/5 Rating</span>
          </div>
        </div>
      </div>

      {/* Right side: Login Form Portal */}
      <div className="col-span-12 lg:col-span-6 flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-12 bg-white dark:bg-gray-950">
        <div className="mx-auto w-full max-w-105 space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Welcome Back!
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Sign in to your FixItNow account
            </p>
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
