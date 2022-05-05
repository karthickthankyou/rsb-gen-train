#!/usr/bin/env node
const chalk = require('chalk')
const fs = require('fs')
let {
  component,
  story,
  testScript,
  barrel,
  jestTestScript,
  cypressTestScript,
} = require('./templates.js')

// grab component componentName from terminal argument
const [componentPath, testType] = process.argv.slice(2, 4)

// Terminate if the component path is missing
if (!componentPath) {
  console.clear()
  console.log(chalk.red(`You must include a component name!`))
  console.log()
  console.log(
    chalk.hex('#aaa')(`Example: `),
    chalk.white(`npx rsb-gen src/components/atoms/Card01`),
  )

  console.log(chalk.hex('#777')(`Mention the path from the project root.`))
  console.log()
  process.exit(0)
}

if (testType && !['-c', '--cypress', '-j', '--jest'].includes(testType)) {
  console.log(
    chalk.red(`The test type included is invalid.
  `),
  )
  console.log(
    chalk.hex('#aaa')(`Valid options are -c, --cypress, -j, and --jest.
    `),

    chalk.white(`
Example: npx rsb-gen src/components/atoms/Card01 --jest
`),
  )

  process.exit(0)
}

const parentDir = componentPath.split('/').slice(0, -1).join('/') || '/'
const componentName = componentPath.split('/').slice(-1)

// Terminate if the parent directory does not exist.
if (!fs.existsSync(parentDir)) {
  console.log(
    chalk.red(`
  Parent directory ${parentDir} does not exist.
  `),
  )
  process.exit(0)
}

// Terminate if the component already exists.
if (fs.existsSync(componentPath)) {
  console.log(
    chalk.red(`
  Component directory ${componentPath} already exists.
  `),
  )
  process.exit(0)
}

// 1. create the folder
fs.mkdirSync(componentPath)

function writeFileErrorHandler(err) {
  if (err) throw err
}

// component.tsx
fs.writeFile(
  `${componentPath}/${componentName}.tsx`,
  component(componentName),
  writeFileErrorHandler,
)
// storybook.jsx
fs.writeFile(
  `${componentPath}/${componentName}.stories.tsx`,
  story(componentName, componentPath),
  writeFileErrorHandler,
)
// test.tsx
// Test will be added again with better arguments.
if (['-c', '--cypress'].includes(testType)) {
  fs.writeFile(
    `${componentPath}/${componentName}.spec.tsx`,
    cypressTestScript(componentName),
    writeFileErrorHandler,
  )
}
if (['-j', '--jest'].includes(testType)) {
  fs.writeFile(
    `${componentPath}/${componentName}.test.tsx`,
    jestTestScript(componentName),
    writeFileErrorHandler,
  )
}

fs.writeFile(
  `${componentPath}/index.ts`,
  barrel(componentName),
  writeFileErrorHandler,
)

console.log(
  chalk.green(`
  Success! The component ${chalk.white(componentName)} is created.
  Path: ${componentPath}
  `),
)
