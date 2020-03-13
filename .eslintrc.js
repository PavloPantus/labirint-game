module.exports = {
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
  extends: ['airbnb', '@mate-academy/eslint-config'],
  env: {
    commonjs: true,
    node: true,
    es6: true,
    browser: true
  },
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module"
  },
  "globals": {
    it: false
  },
  rules: {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx", ".ts", ".tsx"] }],
    'no-console': 'off',
    "no-param-reassign": 0,
    'react/prop-types': 'off',
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
    ]
  }
};
