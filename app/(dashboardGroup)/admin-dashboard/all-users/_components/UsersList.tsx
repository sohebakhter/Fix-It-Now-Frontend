"use client";

import React, { useState, useMemo } from "react";
import { Search, Users, ShieldAlert, UserCheck, Shield, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { UserCard } from "./UserCard";
import type { TUserData } from "@/lib/types";

interface UsersListProps {
  initialUsers: TUserData[];
}

export function UsersList({ initialUsers }: UsersListProps) {
  const users = initialUsers;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");

  // Statistics
  const stats = useMemo(() => {
    const total = users.length;
    const active = users.filter((u) => u.status !== "BAN").length;
    const banned = users.filter((u) => u.status === "BAN").length;
    const admins = users.filter((u) => u.role === "ADMIN").length;
    const technicians = users.filter((u) => u.role === "TECHNICIAN").length;
    const customers = users.filter((u) => u.role === "CUSTOMER").length;

    return { total, active, banned, admins, technicians, customers };
  }, [users]);

  // Filtered Users
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole =
        selectedRole === "ALL" || user.role?.toUpperCase() === selectedRole;

      const matchesStatus =
        selectedStatus === "ALL" ||
        (selectedStatus === "BAN" && user.status === "BAN") ||
        (selectedStatus === "UN_BAN" && user.status !== "BAN");

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchTerm, selectedRole, selectedStatus]);

  return (
    <div className="space-y-8">
      {/* Overview Cards (Premium Stats Dashboard Grid) */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {[
          { label: "Total Users", value: stats.total, icon: Users, color: "text-blue-500 bg-blue-500/10" },
          { label: "Active Users", value: stats.active, icon: UserCheck, color: "text-green-500 bg-green-500/10" },
          { label: "Banned Users", value: stats.banned, icon: ShieldAlert, color: "text-red-500 bg-red-500/10" },
          { label: "Admins", value: stats.admins, icon: Shield, color: "text-indigo-500 bg-indigo-500/10" },
          { label: "Technicians", value: stats.technicians, icon: Sparkles, color: "text-amber-500 bg-amber-500/10" },
          { label: "Customers", value: stats.customers, icon: Users, color: "text-teal-500 bg-teal-500/10" },
        ].map((item) => (
          <div key={item.label} className="flex flex-col justify-between rounded-2xl border border-border/40 bg-card p-4 shadow-2xs hover:shadow-xs transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">{item.label}</span>
              <item.icon className={`size-5 rounded-lg p-1 ${item.color}`} />
            </div>
            <span className="text-2xl font-black mt-2 text-foreground">{item.value}</span>
          </div>
        ))}
      </div>

      {/* Filters & Search Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-card/40 border border-border/40 p-4 rounded-3xl backdrop-blur-xs">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/60" />
          <Input
            placeholder="Search by name or email..."
            className="pl-10 h-10 rounded-xl bg-card border-border/60 focus-visible:ring-primary/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Dropdowns */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground">Role:</span>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="h-10 px-3 py-1.5 rounded-xl border border-border/60 bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
            >
              <option value="ALL">All Roles</option>
              <option value="ADMIN">Admin</option>
              <option value="TECHNICIAN">Technician</option>
              <option value="CUSTOMER">Customer</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="h-10 px-3 py-1.5 rounded-xl border border-border/60 bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
            >
              <option value="ALL">All Statuses</option>
              <option value="UN_BAN">Active</option>
              <option value="BAN">Banned</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid List */}
      {filteredUsers.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-border/80 rounded-3xl bg-muted/5">
          <Users className="size-10 text-muted-foreground/40 mb-3" />
          <h3 className="text-base font-bold text-foreground">No Users Found</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-xs">
            We could not find any users matching your current search query or filter options.
          </p>
        </div>
      )}
    </div>
  );
}

export default UsersList;
