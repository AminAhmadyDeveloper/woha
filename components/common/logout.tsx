"use client";

import type {
  FC,
  MouseEventHandler,
  PropsWithChildren,
  ReactNode,
} from "react";
import { Fragment, useTransition } from "react";

import { logout } from "@/actions/logout";
import { useConfirm } from "@/components/common/confirm-dialog";
import { Switcher } from "@/components/common/switcher";
import { Button } from "@/components/ui/button";
import { useSession } from "@/providers/session-provider";

interface LogoutProps extends PropsWithChildren {
  suspense?: ReactNode;
  fallback?: ReactNode;
}

export const Logout: FC<LogoutProps> = ({ children, fallback, suspense }) => {
  const [isPending, startTransition] = useTransition();
  const { session } = useSession();

  const confirm = useConfirm();

  const onSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
    const isConfirmed = await confirm({
      title: "Logout",
      description: "Are you sure you want to logout?",
      confirmText: "Logout",
      cancelText: "Cancel",
    });
    if (isConfirmed) {
      e.stopPropagation();
      e.preventDefault();
      startTransition(logout);
    }
  };

  return (
    <Switcher selectSecondChild={!session}>
      <Switcher selectSecondChild={isPending}>
        <Button asChild onClick={onSubmit}>
          {children}
        </Button>
        <Fragment>{suspense}</Fragment>
      </Switcher>
      <Fragment>{fallback}</Fragment>
    </Switcher>
  );
};
