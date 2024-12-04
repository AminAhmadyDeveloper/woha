import { buildZodFieldConfig } from "@autoform/react";

import type { FieldTypes } from "@/components/ui/autoform/auto-form";

export const fieldConfig = buildZodFieldConfig<FieldTypes, object>();
