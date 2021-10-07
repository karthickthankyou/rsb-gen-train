#!/usr/bin/env node
const chalk = require('chalk')
const fs = require('fs')
let { component, story, testScript, barrel } = require('./templates.js')

// grab component componentName from terminal argument
const [componentPath] = process.argv.slice(2)

// Terminate if the component path is missing
if (!componentPath) {
  console.clear()
  console.log(chalk.yellow(`You must include a component name!`))
  console.log(
    chalk.hex('#aaa')(`Example: `),
    chalk.white(
      `npx rsb-gen path/ComponentName ${chalk.hex('#777')(
        `(ex: atoms/Card01 will create src/components/atoms/Card01)`,
      )}`,
    ),
  )
  console.log()
  process.exit(0)
}

const fullDir = `./src/components/${componentPath}`
const parentDir = fullDir.split('/').slice(0, -1).join('/')
const componentName = fullDir.split('/').slice(-1)

// Terminate if the parent directory does not exist.
if (!fs.existsSync(parentDir)) {
  console.log(
    chalk.red(`
    Parent directory ${parentDir} does not exist.
  `),

    'Have you created the directories src/components ?',
  )
  process.exit(0)
}

// Terminate if the component already exists.
if (fs.existsSync(fullDir)) {
  console.log(
    chalk.red(`
    Component directory ${fullDir} already exists.
  `),
  )
  process.exit(0)
}

// 1. create the folder
fs.mkdirSync(fullDir)

function writeFileErrorHandler(err) {
  if (err) throw err
}

// component.tsx
fs.writeFile(
  `${fullDir}/${componentName}.tsx`,
  component(componentName),
  writeFileErrorHandler,
)
// storybook.jsx
fs.writeFile(
  `${fullDir}/${componentName}.stories.tsx`,
  story(componentName, componentPath),
  writeFileErrorHandler,
)
// test.tsx
// Test will be added again with better arguments.
fs.writeFile(
  `${fullDir}/${componentName}.test.tsx`,
  testScript(componentName),
  writeFileErrorHandler,
)
// index.tsx
fs.writeFile(
  `${fullDir}/index.ts`,
  barrel(componentName),
  writeFileErrorHandler,
)

console.log(
  chalk.green(`
  Success! The component ${componentName} is created.
  Path: ${parentDir}/${componentName}
  `),
)
