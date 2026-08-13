import React from "react";
import { StatCardProps } from "@/lib/types";

const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  gradient,
  iconBg,
  iconColor,
  trend,
}: StatCardProps) => {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-6 ${gradient} shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
    >
      {/* Background decoration circles */}
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10" />
      <div className="absolute -right-8 -bottom-4 h-32 w-32 rounded-full bg-white/5" />

      <div className="relative z-10 flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-white/80">{title}</p>
          <p className="mt-2 text-3xl font-bold text-white">{value}</p>
          {subtitle && <p className="mt-1 text-xs text-white/60">{subtitle}</p>}
          {trend && (
            <div className="mt-2 flex items-center gap-1">
              <span
                className={`text-xs font-medium ${
                  trend.positive ? "text-green-300" : "text-red-300"
                }`}
              >
                {trend.positive ? "↑" : "↓"} {trend.value}
              </span>
            </div>
          )}
        </div>
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBg}`}
        >
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
