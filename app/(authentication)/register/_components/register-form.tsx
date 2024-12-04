"use client";

import { type FC, Fragment } from "react";

import { register } from "@/app/(authentication)/register/_actions/register";
import { AutoForm } from "@/components/ui/autoform";
import { registerAutoFormSchema } from "@/validators/register-validator";

export const RegisterForm: FC = () => {
  return (
    <Fragment>
      <AutoForm
        schema={registerAutoFormSchema}
        onSubmit={(values) => {
          register(values);
        }}
        withSubmit
      />
    </Fragment>
  );
};
