module.exports = {
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:@next/next/recommended",
    "prettier",
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  env: {
    browser: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "@typescript-eslint/ban-types": "warn",
    "no-use-before-define": 0,
    "padded-blocks": 0,
    "react/jsx-no-target-blank": 0,
    "react/jsx-uses-react": 2,
    "react/jsx-uses-vars": 2,
    "react/prop-types": 0,
    "react/react-in-jsx-scope": 2,
  },
};
