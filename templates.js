// component.tsx
exports.component = (
  componentName,
) => `export interface I${componentName}Props { }

  const ${componentName} = ({ }: I${componentName}Props) => {
    return (
      <div>
        🛬  Hello, This is ${componentName} component!! 🛫
      </div>
    );
  };

  export default ${componentName};
  `;

// component.stories.tsx
exports.story = (componentName, componentType) => `import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import ${componentName}, { I${componentName}Props} from './${componentName}';

export default {
    title: '${componentType || 'Pages'}/${componentName}',
    component: ${componentName},
} as Meta;

const Template: Story<I${componentName}Props> = (args) => <${componentName} {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
`;

// component.test.tsx
exports.testScript = (componentName) => `import React from 'react';
import { render } from '@testing-library/react';
import ${componentName} from './${componentName}';

describe('${componentName} Component', () => {
  test('it should match the snapshot', () => {
    const { asFragment } = render(<${componentName} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
`;

// index.ts
exports.barrel = (
  componentName,
) => `import ${componentName} from './${componentName}';
  export default ${componentName};
  `;
