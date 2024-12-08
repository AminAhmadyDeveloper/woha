import { type FC } from "react";

import { FeaturesList } from "@/app/(root)/_components/features-list";
import { HydrateClient, trpc } from "@/trpc/caller";

const MainPage: FC = async () => {
  await trpc.features.listOfFeatures.prefetch();

  return (
    <main className="container w-full">
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        <HydrateClient>
          <FeaturesList />
        </HydrateClient>
      </div>
    </main>
  );
};

export default MainPage;
