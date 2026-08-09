import { getMe } from "@/service/getMe";
import { Navbar } from "@/components/shared/navbar";
import React from "react";

const PublicGroupLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const user = await getMe();
  return (
    <div>
      <Navbar user={user} />
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </div>
  );
};

export default PublicGroupLayout;
