import type { Meta, StoryObj } from '@storybook/react-vite';
import { CodeBlock } from './CodeBlock';

//1. メタ情報: コンポーネントの基本設定
const meta = {
    title: 'UI/CodeBlock',
    component: CodeBlock,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        title: { control: 'text' },
        code: { control: 'text' },
        lang: {
            options: ['typescript', 'javascript', 'csharp', 'python', 'sql', 'bash', 'json', 'markdown'],
            control: 'radio',
         },
    }
}satisfies Meta<typeof CodeBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Typescript: Story = {
    args: {
        title: 'samplecode.tsx',
        code: `import React from 'react';

interface ProfileCardProps {
  name: string;
  age: number;
  isOnline?: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ name, age, isOnline = false }) => {
  const status = isOnline ? 'Online' : 'Offline';

  return (
    <div className="profile-card">
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>Status: {status}</p>
    </div>
  );
};

export default ProfileCard;`,
        lang: 'typescript'
    },
};
export const CSharp: Story = {
    args: {
        title: 'samplecode.tsx',
        code: `public IEnumerable<WeatherForecast> Get()
{
    if (++_count % 5 == 0)
        throw new Exception("error");

    return Enumerable.Range(1, 5).Select(index => new WeatherForecast
    {
        Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
        TemperatureC = Random.Shared.Next(-20, 55),
        Summary = Summaries[Random.Shared.Next(Summaries.Length)]
    })
    .ToArray();
}`,
        lang: 'csharp'
    },
};