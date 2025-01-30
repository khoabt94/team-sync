import jslint from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tslint from "typescript-eslint";
import perfectionist from "eslint-plugin-perfectionist";
import react from "eslint-plugin-react";
import prettier from "eslint-plugin-prettier";

export default tslint.config(
  { ignores: ["dist", "src/router.ts", "!.storybook", "storybook-static"] },
  {
    extends: [jslint.configs.recommended, ...tslint.configs.recommended, ...tslint.configs.stylistic],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      react,
      perfectionist,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react/jsx-curly-brace-presence": ["error", { props: "never", children: "ignore", propElementValues: "always" }],
      "perfectionist/sort-imports": [
        "error",
        {
          type: "alphabetical",
          internalPattern: ["@routes/*", "@components/*", "@api/*", "@shared/*", "@utils/*", "@router", "@/*"],
          groups: [
            "type",
            ["builtin", "external"],
            "internal-type",
            "internal",
            "side-effect",
            ["parent-type", "sibling-type", "index-type"],
            ["parent", "sibling", "index"],
            "object",
            "unknown",
          ],
        },
      ],
      "perfectionist/sort-exports": ["error", { type: "alphabetical" }],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/no-unused-expressions": "error",
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/array-type": ["error", { default: "generic" }],
      "react/function-component-definition": ["error", { namedComponents: "function-declaration" }],
      "prefer-template": "error",
      "react/jsx-key": "error",
      "react/no-array-index-key": "error",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            { group: ["../*"], message: "Please use absolute import instead relative import." },
            {
              group: ["react-router-dom"],
              importNames: ["Navigate", "Link", "redirect", "useParams", "useNavigate"],
              message: "Please import from '@/router' instead of 'react-router-dom'.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    plugins: { prettier, "react-refresh": reactRefresh },
    rules: {
      "prettier/prettier": ["error"],
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    },
  },
);
