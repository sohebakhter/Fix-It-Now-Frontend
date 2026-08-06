"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { loginAction } from "../_actions/authActions";
import { useEffect, useActionState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
// import { useRouter } from "next/navigation";

const LoginFrom = () => {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "";
  const [state, action, pending] = useActionState(
    loginAction.bind(null, redirectTo),
    false,
  );

  useEffect(() => {
    if (!state) return;

    if (!state.success) {
      toast.error(state.message || "Login Failed");
    }
  }, [state]);

  return (
    <form action={action} className="space-y-4">
      <Card className="p-5 space-y-4">
        <Input
          name="email"
          type="email"
          placeholder="Enter Your Email"
          required
        ></Input>
        <Input
          name="password"
          type="password"
          placeholder="Enter Your Password"
          required
        ></Input>
        <Button type="submit" disabled={pending}>
          {pending ? "Logging In..." : "Login"}
        </Button>
      </Card>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="underline">
          Register Now
        </Link>
      </p>
    </form>
  );
};

export default LoginFrom;
