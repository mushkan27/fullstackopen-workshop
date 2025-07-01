import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import pluginCypress from "eslint-plugin-cypress"; // Import the Cypress plugin


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,jsx}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { files: ["**/*.{js,mjs,cjs,jsx}"], languageOptions: { globals: globals.browser } },
  pluginReact.configs.flat.recommended,
  { 
    files: ["cypress/**/*.{js,mjs,cjs}"], // Apply Cypress rules only to files in the cypress folder
    plugins: { cypress: pluginCypress }, 
    extends: ["plugin:cypress/recommended"] 
  },
]);
