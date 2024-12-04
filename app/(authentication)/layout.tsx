import { ChevronLeftIcon } from "lucide-react";
import type { FC, PropsWithChildren } from "react";

import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/session-cookie-utils";

const AuthenticationLayout: FC<Readonly<PropsWithChildren>> = async ({
  children,
}) => {
  const { session } = await getSession();
  if (session) redirect("/");

  return (
    <div className="grid h-screen w-screen overflow-hidden md:grid-cols-2">
      <div className="order-2 col-span-full flex items-center justify-center py-12 md:order-1 md:col-span-1">
        {children}
      </div>
      <div className="relative block bg-muted">
        <Button asChild variant="link" className="absolute left-0 top-3 gap-2">
          <Link href="/">
            <ChevronLeftIcon className="size-4" />
            Back
          </Link>
        </Button>
        <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="size-full object-cover dark:invert"
        />
      </div>
    </div>
  );
};

export default AuthenticationLayout;
