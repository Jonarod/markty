# Make a plugin


1. Copy this folder
2. Install Markty as a dependency : `npm i markty --save`
3. Go to `package.json` and replace `Markty` with `Markty-[pluginName]`
4. Write your code from `src/index.js`: ES6 available, so you can `import` whatever is necessary
5. Write your tests in `test/index.js`


# Publish to npm

1. Make sure release version is aligned with your needs (change it in `package.json` at `version: 0.0.0`)
2. From the console: `npm publish` 
