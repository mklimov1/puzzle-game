module.exports = {
  extends: [`plugin:@typescript-eslint/recommended`],
  plugins: [`@typescript-eslint`],
  parserOptions: {
    parser: `@typescript-eslint/parser`,
    project: [`./tsconfig.json`],
  },
  rules: {
    "import/no-extraneous-dependencies": [`error`, { devDependencies: true, }],
    "@typescript-eslint/quotes": [`error`, `backtick`],
    "@typescript-eslint/lines-between-class-members": [`off`],
    "import/prefer-default-export": `off`,
    "@typescript-eslint/brace-style": `off`,
    "@typescript-eslint/indent": `off`,

    'semi': `off`,
    '@typescript-eslint/semi': [`error`, `always`],
    "@typescript-eslint/member-delimiter-style": [
      `warn`,
      {
        "multiline": {
          "delimiter": `semi`,
          "requireLast": true,
        },
        "singleline": {
          "delimiter": `semi`,
          "requireLast": false,
        },
      }
    ],
    "@typescript-eslint/space-before-blocks": `error`,
    "@typescript-eslint/indent": [`error`, 2],
    '@typescript-eslint/type-annotation-spacing': `error`,
  },
};
