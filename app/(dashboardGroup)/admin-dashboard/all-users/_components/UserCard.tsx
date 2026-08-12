import React from "react";
import { Mail, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import UpdateUserButton from "./UpdateUserButton";
import DeleteUserButton from "./DeleteUserButton";
import type { TUserData } from "@/lib/types";

interface UserCardProps {
  user: TUserData;
}

export function UserCard({ user }: UserCardProps) {
  const isBanned = user.status === "BAN";
  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";

  const getRoleBadgeStyles = (role: string) => {
    switch (role?.toUpperCase()) {
      case "ADMIN":
        return "bg-indigo-500/10 text-indigo-600 border-indigo-500/20 dark:bg-indigo-500/20 dark:text-indigo-400";
      case "TECHNICIAN":
        return "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:bg-amber-500/20 dark:text-amber-400";
      case "CUSTOMER":
      default:
        return "bg-teal-500/10 text-teal-600 border-teal-500/20 dark:bg-teal-500/20 dark:text-teal-400";
    }
  };

  const formattedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  return (
    <Card className="group overflow-hidden rounded-3xl border border-border/50 bg-card hover:shadow-md transition-all duration-300 flex flex-col justify-between">
      <CardHeader className="space-y-4 pb-4">
        {/* Top Section: Avatar and status badges */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center space-x-4">
            <Avatar className="h-14 w-14 border border-border/30 shadow-xs bg-linear-to-br from-primary/10 to-primary/5 text-primary font-bold">
              <AvatarFallback className="bg-primary/5 text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <CardTitle className="text-lg font-extrabold text-foreground truncate max-w-37.5 sm:max-w-50" title={user.name}>
                {user.name}
              </CardTitle>
              <Badge variant="outline" className={`mt-1.5 rounded-lg text-[10px] font-semibold px-2 py-0.5 ${getRoleBadgeStyles(user.role)}`}>
                {user.role}
              </Badge>
            </div>
          </div>

          <Badge
            variant="outline"
            className={`rounded-lg text-xs px-2.5 py-0.5 font-medium shrink-0 ${
              isBanned
                ? "bg-red-500/10 text-red-600 border-red-500/20 dark:bg-red-900/20 dark:text-red-400"
                : "bg-green-500/10 text-green-600 border-green-500/20 dark:bg-green-950/20 dark:text-green-400"
            }`}
          >
            {isBanned ? "Banned" : "Active"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 flex-1 text-sm text-muted-foreground pb-4">
        {/* User details */}
        <div className="flex items-center gap-2 text-muted-foreground min-w-0">
          <Mail className="size-4 shrink-0 text-muted-foreground/60" />
          <span className="truncate" title={user.email}>{user.email}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="size-4 shrink-0 text-muted-foreground/60" />
          <span>Joined {formattedDate}</span>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-end gap-2 border-t border-border/30 bg-muted/5 py-4 px-6 text-xs">
        <UpdateUserButton userId={user.id} currentStatus={user.status} />
        <DeleteUserButton userId={user.id} userName={user.name} />
      </CardFooter>
    </Card>
  );
}

export default UserCard;
