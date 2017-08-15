ESLint-plugin-React-SSR
=======================

[![Maintenance Status][status-image]][status-url] [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Build Status][appveyor-image]][appveyor-url] [![Dependency Status][deps-image]][deps-url] [![Coverage Status][coverage-image]][coverage-url] [![Code Climate][climate-image]][climate-url]

React specific linting rules for ESLint

# Installation

Install [ESLint](https://www.github.com/eslint/eslint) either locally or globally.

```sh
$ npm install eslint --save-dev
```

If you installed `ESLint` globally, you have to install React plugin globally too. Otherwise, install it locally.

```sh
$ npm install eslint-plugin-react-ssr --save-dev
```

# Configuration

Add `plugins` section and specify ESLint-plugin-React as a plugin.

```json
{
  "plugins": [
    "react-ssr"
  ]
}
```

# List of supported rules

* [react/no-constructor-dom](docs/rules/no-constructor-dom.md): Prevent usage of `window/document` in `constructor`
* [react/no-will-mount-dom](docs/rules/no-will-mount-dom.md): Prevent usage of `window/document` in `componentWillMount`

# Shareable configurations

## All

This plugin also exports an `all` configuration that includes every available rule.
This pairs well with the `eslint:all` rule.

```json
{
  "plugins": [
    "react-ssr"
  ],
  "extends": ["eslint:all", "plugin:react-ssr/all"]
}
```

**Note**: These configurations will import `eslint-plugin-react-ssr` and enable JSX in [parser options](http://eslint.org/docs/user-guide/configuring#specifying-parser-options).

# License

ESLint-plugin-React is licensed under the [MIT License](http://www.opensource.org/licenses/mit-license.php).
