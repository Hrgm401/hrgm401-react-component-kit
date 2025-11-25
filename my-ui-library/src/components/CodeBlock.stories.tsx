import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, useEffect } from 'react';
import { CodeBlock } from './CodeBlock';

const SAMPLE_CODE_MAP: Record<string, string> = {
  typescript: `interface User {
  id: number;
  name: string;
  isActive: boolean;
}

const users: User[] = [
  { id: 1, name: "Alice", isActive: true },
  { id: 2, name: "Bob", isActive: false },
  { id: 3, name: "Charlie", isActive: true },
];

// アクティブなユーザーの名前を抽出
const getActiveUserNames = (users: User[]): string[] => {
  return users
    .filter(user => user.isActive)
    .map(user => user.name);
};

console.log(getActiveUserNames(users));`,

  csharp: `//コメント
  public IEnumerable<WeatherForecast> Get()
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

  sql: `-- ユーザーと注文履歴を取得するクエリ
SELECT 
    u.user_id,
    u.username,
    COUNT(o.order_id) as total_orders,
    SUM(o.total_amount) as total_spent
FROM 
    users u
LEFT JOIN 
    orders o ON u.user_id = o.user_id
WHERE 
    u.created_at >= '2024-01-01'
GROUP BY 
    u.user_id, u.username
ORDER BY 
    total_spent DESC;`,

  python: `# データ処理のサンプルスクリプト
def process_data(data_list):
    """
    数値リストから偶数のみを取り出し、2倍にする
    """
    result = [x * 2 for x in data_list if x % 2 == 0]
    return result

if __name__ == "__main__":
    data = [1, 2, 3, 4, 5, 6]
    processed = process_data(data)
    print(f"Result: {processed}")`,

  json: `{
  "app": {
    "name": "SketchDesignEditor",
    "version": "1.0.0",
    "settings": {
      "theme": "dark",
      "notifications": true,
      "retryAttempts": 3
    }
  },
  "features": [
    "code-generation",
    "syntax-highlighting",
    "cloud-sync"
  ]
}`,

java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
        int count = 10;
        if (count > 5) {
            User user = new User("Alice");
            user.login();
        }
    }
}`,

  go: `package main
import "fmt"

type Person struct {
    Name string
    Age  int
}

func main() {
    p := Person{Name: "Gopher", Age: 10}
    fmt.Printf("Hello, %s\\n", p.Name)
}`,

  rust: `fn main() {
    let name = "Rustacean";
    println!("Hello, {}!", name);
    
    let mut numbers = vec![1, 2, 3];
    numbers.push(4);
    
    match numbers.len() {
        0 => println!("Empty"),
        _ => println!("Has elements"),
    }
}`,

  php: `<?php
class User {
    public $name;
    
    public function __construct($name) {
        $this->name = $name;
    }
}

$users = [new User("Alice"), new User("Bob")];
foreach ($users as $user) {
    echo "Hello, " . $user->name . "<br>";
}`,

  rb: `class Greeter
  def initialize(name)
    @name = name
  end

  def say_hello
    puts "Hello, #{@name}!"
  end
end

g = Greeter.new("Ruby")
g.say_hello`,

  html: `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>Sample Page</title>
</head>
<body>
    <div id="app" class="container">
        <h1>Hello HTML</h1>
        <button onclick="alert('Click')">Button</button>
    </div>
</body>
</html>`,

  css: `.container {
    display: flex;
    justify-content: center;
    background-color: #f0f0f0;
}

h1 {
    color: #333;
    font-size: 24px;
}

#app:hover {
    opacity: 0.8;
}`,

  scss: `$primary-color: #333;

.container {
  display: flex;
  
  h1 {
    color: $primary-color;
    &:hover {
      color: lighten($primary-color, 20%);
    }
  }
}`,

  sh: `#!/bin/bash
# ディレクトリのバックアップ
BACKUP_DIR="/var/backups"
DATE=$(date +%Y%m%d)

echo "Starting backup..."
if [ -d "$BACKUP_DIR" ]; then
  tar -czf archive_$DATE.tar.gz /home/user/data
  echo "Backup completed."
else
  echo "Error: Directory not found."
fi`,

  yaml: `version: "3.8"
services:
  web:
    image: nginx:latest
    ports:
      - "8080:80"
    environment:
      - NODE_ENV=production
    volumes:
      - ./data:/var/www/html`,

  dockerfile: `FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]`,

  md: `# Markdown Sample
## List
- Item 1
- Item 2

## Code
\`\`\`javascript
const a = 1;
\`\`\`
> Quote here`,

  xml: `<?xml version="1.0" encoding="UTF-8"?>
<note>
  <to>Tove</to>
  <from>Jani</from>
  <heading>Reminder</heading>
  <body>Don't forget me this weekend!</body>
</note>`,

  diff: `--- a/index.js
+++ b/index.js
@@ -1,3 +1,3 @@
-const greeting = "Hello";
+const greeting = "Hi";
 console.log(greeting);`,

};

const SAMPLE_TITLE_MAP: Record<string, string> = {
  ...Object.keys(SAMPLE_CODE_MAP).reduce((acc, key) => {
    acc[key] = `Sample.${key}`;
    return acc;
  }, {} as Record<string, string>)
};

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
        code: { 
            options: Object.keys(SAMPLE_CODE_MAP),
            control: 'select'
         },
        lang: {
            options: ['typescript', 'javascript', 'csharp', 'python', 'sql', 'bash', 'json', 'markdown'],
            control: 'select',
         },
        onChange: {
            description: '入力値変更時に呼出し',
            action: 'changed'
        },
        isDarkMode: { control: 'boolean' },
        readonly: { control: 'boolean' },
    }
}satisfies Meta<typeof CodeBlock>;

export default meta;
type Story = StoryObj<typeof CodeBlock>;

export const Default: Story = {
    args: {
        title: 'SampleCode.tsx',
        isDarkMode: false,
        code: 'typescript',
        lang: 'typescript',
    },
    render: (args) => {
        const initialCode = SAMPLE_CODE_MAP[args.code] || args.code;
        const [title, setTitle] = useState(args.title);
        const [code, setCode] = useState(initialCode);
        const [lang, setLang] = useState<string | null>('typescript');
        const [isDark, setIsDark] = useState(args.isDarkMode);

        useEffect(() => {
            setCode(SAMPLE_CODE_MAP[args.code]);
            setTitle(SAMPLE_TITLE_MAP[args.code]);
            setLang(args.code);
        },[args.code])
        useEffect(() => {
            setTitle(args.title);
        },[args.title])

        useEffect(() => {
            setLang(args.lang);
        },[args.lang])

        useEffect(() => {
            setIsDark(args.isDarkMode);
        },[args.isDarkMode])

        const handleChange = (val: string) => {
            args.onChange(val);
            setCode(val);
        };

        return(
            <div className='w-full h-[400px]'>
                <CodeBlock 
                    title={title} 
                    code={code} 
                    lang={lang} 
                    onChange={handleChange} 
                    isDarkMode={isDark}
                />
            </div>
        )
    }
};

