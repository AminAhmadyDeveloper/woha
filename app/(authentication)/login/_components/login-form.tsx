"use client";

import { type FC, Fragment } from "react";

import Link from "next/link";

import { login } from "@/app/(authentication)/login/_actions/login";
import { AutoForm } from "@/components/ui/autoform";
import { Button } from "@/components/ui/button";
import { loginAutoFormSchema } from "@/validators/login-validator";

export const LoginForm: FC = () => {
  return (
    <Fragment>
      <AutoForm
        schema={loginAutoFormSchema}
        onSubmit={(values) => {
          login(values);
        }}
      >
        <Button type="submit" className="w-full">
          Login
        </Button>
        <Button type="button" variant="outline" className="w-full" asChild>
          <Link href="/api/oauth/github">LoginWith Github</Link>
        </Button>
      </AutoForm>
    </Fragment>
  );
};
