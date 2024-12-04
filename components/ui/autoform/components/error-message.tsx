import { AlertCircle } from "lucide-react";
import React from "react";

import { Alert, AlertTitle } from "@/components/ui/alert";

export const ErrorMessage: React.FC<{ error: string }> = ({ error }) => (
  <Alert variant="destructive">
    <AlertCircle className="size-4" />
    <AlertTitle>{error}</AlertTitle>
  </Alert>
);
