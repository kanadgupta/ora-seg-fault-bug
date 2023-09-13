# Segmentation Fault Bug in [`ora`](https://github.com/sindresorhus/ora) (https://github.com/sindresorhus/ora/issues/229)

This repository demonstrates a segmentation fault error in [`ora`](https://github.com/sindresorhus/ora) when attempting to generate an executable using [`pkg`](https://github.com/vercel/pkg). See https://github.com/sindresorhus/ora/issues/229 for the related issue.

## Background

[`ora`](https://github.com/sindresorhus/ora) is a popular terminal spinner library and and [`pkg`](https://github.com/vercel/pkg) is a popular tool for packaging Node.js projects into executables.

[`ora`](https://github.com/sindresorhus/ora) is ESM-only and [`pkg`](https://github.com/vercel/pkg) currently does not support ESM (see https://github.com/vercel/pkg/issues/1291). In order to use the latest version of `ora` in a Node.js script gets built with `pkg`, we'll need a tool like `rollup` or `esbuild` to compile the ESM output into CommonJS.

## Bug

This repository contains a tiny Node.js script that uses `ora`. You can confirm it works by running:

```sh
npm install
node index.js
```

### Current Behavior

First, build the executable. You can do this by running the following:

```sh
# compiles CommonJS file and stores it in dist/rollup/index.cjs
npx rollup -c

# generates executable for your current platform/arch and stores it at dist/exe
npx pkg dist/rollup/index.cjs --target host --output dist/exe --debug
```

If you attempt to run the generated executable (located at `dist/exe`), you should see something like this:

```
$ ./dist/exe
creating ora instance
[1]    60892 segmentation fault  ./dist/exe
```

#### Reproduce issue with `esbuild`

You can also reproduce the issue if you build the CommonJS script using esbuild:

```sh
# compiles CommonJS file and stores it in dist/esbuild/index.cjs
npx esbuild index.js --bundle --platform=node --outfile=dist/esbuild/index.cjs

# generates executable for your current platform/arch and stores it at dist/exe
npx pkg dist/esbuild/index.cjs --target host --output dist/exe --debug
```

### Expected Behavior

If you go through this process again with `ora@6`, you will not see this segmentation fault error.

```sh
npm install ora@6
npx rollup -c
./dist/exe
```

The executable output will look something like this:

```
creating ora instance
✔ ora complete!
```

### Platform Info

Here are the Node/npm versions I am reproducing this with:

- Node v18.17.1
- npm 9.6.7

And here are the platforms/architectures I've confirmed the issue on:

- Alpine / x64
- Linux / x64
- macOS / arm64
- macOS / x64
