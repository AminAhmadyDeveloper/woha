"use client";

import type { FC, PropsWithChildren } from "react";

import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import { useSession } from "@/providers/session-provider";

export const Logout: FC<PropsWithChildren> = ({ children }) => {
  const { session } = useSession();
  if (!session) return null;

  return (
    <form action={logout}>
      <Button asChild>{children}</Button>
    </form>
  );
};
