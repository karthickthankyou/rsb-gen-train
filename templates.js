// component.tsx
exports.component = (
  componentName,
) => `export interface I${componentName}Props {}

export const ${componentName} = ({}: I${componentName}Props) => {
  return <div>Hello, This is ${componentName} component!</div>
}
`

// component.stories.tsx
exports.story = (componentName, componentType) => `
import type { Meta, StoryObj } from '@storybook/react';
import { ${componentName} } from './${componentName}';

const meta: Meta<typeof ${componentName}> = {
  title: '${componentType}/${componentName}',
  component: ${componentName},
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
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
) => `export ${componentName} from './${componentName}'
`
