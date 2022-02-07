# 🔖 @ryanccn/bookmarklet

A framework for creating bookmarklets.

It's powered by [esbuild](https://esbuild.github.io/), [esno](https://github.com/antfu/esno), and [TypeScript](https://www.typescriptlang.org/).

## Getting Started

Install `@ryanccn/bookmarklet` into your project or globally:

```bash
# locally
$ npm i -D @ryanccn/bookmarklet
$ yarn add --dev @ryanccn/bookmarklet

# globally
$ npm i -g @ryanccn/bookmarklet
$ yarn global add @ryanccn/bookmarklet
```

And build your bookmarklet!

```console
$ bookmarklet build index.ts

Built in 11.81ms
Wrote to bookmarklet.txt
[copied to clipboard]
```

## Configuration

`bookmarklet` currently reads configuration from

1. `.bookmarklet.mjs`
2. `.bookmarklet.json`

The types are as follows:

```ts
{
  target?: string | undefined;
  write?: string | false;
  print?: boolean;
  copy?: boolean;
}
```
