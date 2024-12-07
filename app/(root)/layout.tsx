import { type FC, Fragment, type PropsWithChildren } from "react";

import { Header } from "@/components/layout/header";

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Fragment>
      <Header />
      {children}
    </Fragment>
  );
};

export default MainLayout;
