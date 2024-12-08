import { Code2Icon, Loader2Icon } from "lucide-react";
import type { FC } from "react";

import Link from "next/link";

import { Logout } from "@/components/common/logout";
import { Button } from "@/components/ui/button";

export const Header: FC = () => {
  return (
    <header className="container flex items-center justify-between py-4 standalone:bg-primary standalone:text-primary-foreground">
      <div className="flex items-center gap-x-2">
        <Code2Icon className="size-6" />
        <span className="font-bold">Woha</span>
      </div>
      <Logout
        suspense={
          <Button className="min-w-12">
            <Loader2Icon className="size-4 animate-spin" />
          </Button>
        }
        fallback={
          <Button className="min-w-12" asChild>
            <Link href="/login">Login</Link>
          </Button>
        }
      >
        <Button>Logout</Button>
      </Logout>
    </header>
  );
};
