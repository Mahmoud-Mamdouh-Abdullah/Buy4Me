Easily run a TypeScript application with ts-node and nodemon. Just add it to your project:

```bash
npm install --save-dev run-typescript-in-nodemon
```

Then add something like this to your package.json:

```json
"scripts": {
    "start": "run-typescript-in-nodemon src/index.ts --whatever-parameters-you-need"
}
```

And then start your app under nodemon with:

```bash
npm start
```

If any of your typescript code changes, the application will restart.

This package was adapted from the awesome [Magda](https://magda.io) project.
