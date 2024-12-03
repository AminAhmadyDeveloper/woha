import type { FC } from "react";

import { redirect } from "next/navigation";

import { LoginForm } from "@/app/(authentication)/login/_components/login-form";
import { getSession } from "@/lib/session-cookie-utils";

const LoginPage: FC = async () => {
  const { session } = await getSession();

  if (session) redirect("/");

  return <LoginForm />;
};

export default LoginPage;
