/**
 * Disabled rule due to bug in typescript-eslint
 * https://github.com/typescript-eslint/typescript-eslint/issues/1856
 * 
 * Change to ["error"] when fix is confirmed
 * "@typescript-eslint/no-unused-vars": ["error"],
 */

module.exports = {
  parser: `@typescript-eslint/parser`,
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint",
  ],
  plugins: ["@typescript-eslint", "prettier"],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
  },
  env: {
    browser: true,
    node: true,
  },
  rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "off",
    quotes: "off",
    "@typescript-eslint/quotes": [
      2,
      "backtick",
      {
        avoidEscape: true,
      },
    ],
    indent: ["error", 2, { SwitchCase: 1 }],
    "prettier/prettier": [
      "error",
      {
        trailingComma: "es5",
        semi: false,
        singleQuote: false,
        printWidth: 120,
      },
    ],
  },
}
