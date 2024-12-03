"use client";

import * as React from "react";

import type { SessionValidationResult } from "@/lib/authentication-api";

export const SessionContext = React.createContext(
  {} as SessionValidationResult,
);

interface SessionProviderProps {
  session: SessionValidationResult;
  children: React.ReactNode;
}

export const SessionProvider: React.FC<SessionProviderProps> = ({
  children,
  session,
}) => {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => React.useContext(SessionContext);
