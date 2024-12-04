import map from "lodash.map";

import type { ReactElement, ReactNode } from "react";
import { Fragment } from "react";

interface ForProps<GEach> {
  each: readonly GEach[] | undefined;
  fallback?: ReactNode;
  children: (item: GEach, index: number) => ReactNode;
}

export const For = <GEach,>({
  each,
  fallback,
  children,
}: ForProps<GEach>): ReactElement | null => {
  if (each?.length === 0 && fallback) return <Fragment>{fallback}</Fragment>;

  return (
    <Fragment>
      {map(each, (item, index) => (
        <Fragment key={index}>{children(item, index)}</Fragment>
      ))}
    </Fragment>
  );
};
