// component.tsx
exports.component = (
  componentName,
) => `export interface I${componentName}Props {}

const ${componentName} = ({}: I${componentName}Props) => {
  return <div>Hello, This is ${componentName} component!</div>
}

export default ${componentName}
`

// component.stories.tsx
exports.story = (componentName, componentType) => `import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import ${componentName} from './${componentName}'

export default {
  title: '${componentType}',
  component: ${componentName},
} as ComponentMeta<typeof ${componentName}>

const Template: ComponentStory<typeof ${componentName}> = (args) => <${componentName} {...args} />

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
`

// component.test.tsx
exports.testScript = (componentName) => `import { mount } from '@cypress/react'
import ${componentName} from './${componentName}'

describe('${componentName} Component', () => {
  it('${componentName} renders', () => {
    mount(<${componentName} />)
  })
})
`

// index.ts
exports.barrel = (
  componentName,
) => `import ${componentName} from './${componentName}'

export default ${componentName}
`
