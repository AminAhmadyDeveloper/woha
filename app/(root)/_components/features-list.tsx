"use client";

import type { FC } from "react";
import { Fragment } from "react";

import { trpc } from "@/providers/trpc-provider";

export const FeaturesList: FC = () => {
  const [features] = trpc.features.listOfFeatures.useSuspenseQuery();

  return (
    <Fragment>
      {features?.map((feature) => {
        return <span key={feature.name}>{feature.name}</span>;
      })}
    </Fragment>
  );
};
