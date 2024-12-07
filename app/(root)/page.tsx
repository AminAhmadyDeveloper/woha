import { type FC, Suspense } from "react";

import { FeaturesList } from "@/app/(root)/_components/features-list";
import { HydrateClient } from "@/trpc/caller";

const MainPage: FC = async () => {
  return (
    <main className="container w-full">
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        <HydrateClient>
          <Suspense fallback={<>Loading...</>}>
            <FeaturesList />
          </Suspense>
        </HydrateClient>
      </div>
    </main>
  );
};

export default MainPage;
