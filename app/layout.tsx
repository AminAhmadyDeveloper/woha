import type { FC, PropsWithChildren } from "react";

import { ConfirmDialogProvider } from "@/components/common/confirm-dialog";
import { mono, sans } from "@/lib/fonts-utils";
import { getSession } from "@/lib/session-cookie-utils";
import { cn } from "@/lib/tailwind-utils";
import { SessionProvider } from "@/providers/session-provider";
import { StylesProvider } from "@/providers/styles-provider";
import { TRPCProvider } from "@/providers/trpc-provider";

export * from "@/lib/seo-utils";

const RootLayout: FC<PropsWithChildren> = async ({ children }) => {
  const session = await getSession();

  return (
    <html lang="en" suppressHydrationWarning suppressContentEditableWarning>
      <StylesProvider />
      <body className={cn(mono.variable, sans.variable)}>
        <SessionProvider session={session}>
          <TRPCProvider>
            <ConfirmDialogProvider>{children}</ConfirmDialogProvider>
          </TRPCProvider>
        </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
