"use client";

import type { FC } from "react";

import CardSpotlight from "@/app/(root)/_components/card-spotlight";
import { Icon } from "@/app/(root)/_components/features-icons";
import { For } from "@/components/common/for";
import { trpc } from "@/providers/trpc-provider";

export const FeaturesList: FC = () => {
  const [features] = trpc.features.listOfFeatures.useSuspenseQuery();

  return (
    <For each={features}>
      {(feature) => {
        return (
          <CardSpotlight
            key={feature.name}
            name={feature.name}
            description={feature.description}
            logo={<Icon iconName={feature.logo} className="size-12" />}
          />
        );
      }}
    </For>
  );
};
