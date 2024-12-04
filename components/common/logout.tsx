"use client";

import { LogOutIcon } from "lucide-react";
import type { FC, MouseEventHandler } from "react";
import { useTransition } from "react";

import { logout } from "@/actions/logout";
import { useConfirm } from "@/components/common/confirm-dialog";
import { Switcher } from "@/components/common/switcher";
import { Button } from "@/components/ui/button";

interface LogoutProps {
  iconButton?: true;
}

export const Logout: FC<LogoutProps> = ({ iconButton }) => {
  const [, startTransition] = useTransition();

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
    <Switcher selectSecondChild={!!iconButton}>
      <Button size="sm" type="button" onClick={onSubmit}>
        Logout
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="mt-auto rounded-lg"
        aria-label="Logout"
        onClick={onSubmit}
      >
        <LogOutIcon className="size-4 text-primary" />
      </Button>
    </Switcher>
  );
};
