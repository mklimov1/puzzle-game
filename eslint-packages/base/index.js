module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    `prettier`
  ],
  parserOptions: {
    ecmaVersion: `latest`,
    sourceType: `module`,
  },
  plugins: [`import`, `prettier`],
  rules: {
    indent: `off`,
    quotes: [`error`, `backtick`],
    "import/extensions": [`error`, `never`],
    'no-multiple-empty-lines': [`error`, { max: 1, }],
    "lines-between-class-members": `off`,
    "no-underscore-dangle": `off`,
    "no-multi-spaces": `error`,
    'padded-blocks': [`error`, `never`],
    'comma-spacing': [`error`, { "before": false, "after": true, }],
    'semi': [`error`, `always`],
    "comma-dangle": [`error`, {
      "arrays": `never`,
      "objects": `always`,
      "imports": `never`,
      "exports": `never`,
      "functions": `never`,
    }],
    "prefer-destructuring": [`error`, {
      "array": true,
      "object": true,
    }, {
      "enforceForRenamedProperties": false,
    }],
    'object-curly-spacing': [`error`, `always`],
    'array-bracket-spacing': [`error`, `never`],
    'key-spacing': [`error`, { "beforeColon": false, "afterColon": true, }],
    "space-before-blocks": `error`,
    "space-before-blocks": `error`,
    "indent": [`error`, 2],
    'arrow-parens': [`error`, `always`],
    'space-infix-ops': `error`,
  },
};
