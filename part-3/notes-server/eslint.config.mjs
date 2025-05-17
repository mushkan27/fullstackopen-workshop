// eslint.config.js (CommonJS style)
const js = require("@eslint/js");
const globals = require("globals");
const { defineConfig } = require("eslint/config");

module.exports = defineConfig([
  {
    files: ["**/*.{js,cjs,mjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: globals.node,
    },
    ...js.configs.recommended,
    rules: {
      "no-console": 0,
      "eqeqeq": "error",
    },
  },
]);
