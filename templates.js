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
import ${componentName} from './index'

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
exports.cypressTestScript = (
  componentName,
) => `import { mount } from '@cypress/react'
import ${componentName} from './index'

describe('${componentName} Component', () => {
  it('${componentName} renders', () => {
    mount(<${componentName} />)
  })
})
`

// component.test.tsx
exports.jestTestScript = (componentName) => `import React from 'react';
import { render } from '@testing-library/react';
import ${componentName} from './index';

describe('${componentName} Component', () => {
  test('it should match the snapshot', () => {
    const { asFragment } = render(<${componentName} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
`

// index.ts
exports.barrel = (
  componentName,
) => `import ${componentName} from './${componentName}'

export default ${componentName}
`
