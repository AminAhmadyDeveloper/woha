"use client";

import {
  QueryClientProvider,
  type QueryClientProviderProps,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { FC } from "react";
import { Fragment } from "react";

export const TanstackQueryProvider: FC<QueryClientProviderProps> = ({
  ...props
}) => {
  return (
    <Fragment>
      <QueryClientProvider {...props} />
      <ReactQueryDevtools client={props.client} initialIsOpen={false} />
    </Fragment>
  );
};
