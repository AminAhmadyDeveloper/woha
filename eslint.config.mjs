import { FlatCompat } from "@eslint/eslintrc";
import eslint from "@eslint/js";
import query from "@tanstack/eslint-plugin-query";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";
import checkFile from "eslint-plugin-check-file";
import compat from "eslint-plugin-compat";
import a11y from "eslint-plugin-jsx-a11y";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import tslint from "typescript-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const base = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: eslint.configs.recommended,
  allConfig: eslint.configs.all,
});

const withLegacy = base.extends(
  "plugin:@typescript-eslint/recommended",
  "plugin:react-hooks/recommended",
  "plugin:prettier/recommended",
  "plugin:tailwindcss/recommended",
  "plugin:@next/next/core-web-vitals",
  "plugin:@next/next/recommended",
);

const config = [
  ...withLegacy,
  {
    plugins: {
      "@typescript-eslint": typescriptEslint,
      "check-file": checkFile,
    },
    languageOptions: { parser },
    rules: {
      "@typescript-eslint/consistent-type-imports": "error",
      "react-hooks/exhaustive-deps": "off",
      "@typescript-eslint/no-duplicate-enum-values": "off",
      "check-file/filename-naming-convention": [
        "error",
        { "**/*.{js,ts,jsx,tsx}": "KEBAB_CASE" },
        { ignoreMiddleExtensions: true },
      ],
    },
  },
];

export default tslint.config(
  eslint.configs.recommended,
  a11y.flatConfigs.recommended,
  query.configs["flat/recommended"],
  compat.configs["flat/recommended"],
  ...config,
);
