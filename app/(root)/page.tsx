import { type FC, Fragment, Suspense } from "react";

import { FeaturesList } from "@/app/(root)/_components/features-list";
import { Logout } from "@/components/common/logout";
import { Button } from "@/components/ui/button";
import { HydrateClient } from "@/trpc/caller";

const MainPage: FC = async () => {
  return (
    <Fragment>
      <Logout>
        <Button>Logout</Button>
      </Logout>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        <HydrateClient>
          <Suspense fallback={<>Loading...</>}>
            <FeaturesList />
          </Suspense>
        </HydrateClient>
      </div>
    </Fragment>
  );
};

export default MainPage;
