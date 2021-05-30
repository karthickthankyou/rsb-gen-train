#!/usr/bin/env node
const chalk = require('chalk');
const fs = require('fs');
let { component, story, testScript, barrel } = require('./templates.js');

// grab component componentName from terminal argument
const [componentName] = process.argv.slice(2);
if (!componentName) {
  console.clear();
  console.log(chalk.yellow(`You must include a component name!`));
  console.log(
    chalk.hex('#aaa')(`Example: `),
    chalk.white(
      `npx rsb-comp ComponentName componentPath${chalk.hex('#777')(
        `(ex: components/cards)(optional)`,
      )}`,
    ),
  );
  console.log();
  console.log(
    chalk.hex('#aaa')(
      `Component will be created under ${chalk.white(
        `src/`,
      )} if no path is specified.\n`,
    ),
  );

  process.exit(0);
}

// grab component type from terminal argument
const [filePath] = process.argv.slice(3); // throw an error if the file path does not exit.
if (filePath && !fs.existsSync(`./src/${filePath}`)) {
  console.log(
    chalk.red(`
    Error! Component path ${`./src/${filePath}`} does not exist.
  `),
  );
  process.exit(0);
}

const dir = filePath
  ? `./src/${filePath}/${componentName}`
  : `./src/${componentName}`;

// throw an error if the file already exists
if (fs.existsSync(dir)) {
  console.log(
    chalk.red(`
    Component ${dir} already exists.
  `),
  );
  process.exit(0);
}

// create the folder
fs.mkdirSync(dir);

function writeFileErrorHandler(err) {
  if (err) throw err;
}

// component.tsx
fs.writeFile(
  `${dir}/${componentName}.tsx`,
  component(componentName),
  writeFileErrorHandler,
);
// storybook.jsx
fs.writeFile(
  `${dir}/${componentName}.stories.tsx`,
  story(componentName, filePath),
  writeFileErrorHandler,
);
// test.tsx
// Test will be added again with better arguments.
// fs.writeFile(
//   `${dir}/${componentName}.test.tsx`,
//   testScript(componentName),
//   writeFileErrorHandler
// );
// index.tsx
fs.writeFile(`${dir}/index.ts`, barrel(componentName), writeFileErrorHandler);

console.log(
  chalk.green(`
  Success! The component ${componentName} is created.
  Path: ${dir}
  `),
);
