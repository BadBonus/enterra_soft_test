module.exports = {
  root: true,
  env: {
    node: true,
  },
  // eslint-disable-next-line prettier/prettier
  extends: ["plugin:vue/vue3-essential", "eslint:recommended", "plugin:prettier/recommended"],
  parserOptions: {
    parser: "@babel/eslint-parser",
  },
  plugins: ["prettier"],
  rules: {
    "no-extra-boolean-cast": "off",
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-unused-vars": "warn",
    "vue/no-unused-vars": "warn",
    "vue/no-unused-components": process.env.NODE_ENV === "production" ? "warn" : "warn",
    "vue/multi-word-component-names": "off",

    "prettier/prettier": [
      "off",
      {
        endOfLine: "auto",
      },
    ],
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off",
  },
};
