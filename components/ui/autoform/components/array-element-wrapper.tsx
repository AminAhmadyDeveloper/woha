import type { ArrayElementWrapperProps } from "@autoform/react";
import { TrashIcon } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";

export const ArrayElementWrapper: React.FC<ArrayElementWrapperProps> = ({
  children,
  onRemove,
}) => {
  return (
    <div className="relative mt-2 rounded-md border p-4">
      <Button
        onClick={onRemove}
        variant="ghost"
        size="sm"
        className="absolute right-2 top-2"
        type="button"
      >
        <TrashIcon className="size-4" />
      </Button>
      {children}
    </div>
  );
};
