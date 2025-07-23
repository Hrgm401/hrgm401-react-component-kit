import { CodeBlock } from './components/CodeBlock.tsx';
import {DragFileSpace} from './components/DragFileSpace.tsx';
import {ExplanatorySidebar} from './components/ExplanatorySidebar.tsx';
import {IconTabs} from './components/IconTabs.tsx';
import {InputSelect} from './components/InputSelect.tsx';
import {ScrollableList} from './components/ScrollableList.tsx';
import {SelectButton} from './components/SelectButton.tsx';
import {TabButton} from './components/TabButton.tsx';
import {Table} from './components/Table.tsx';
import {TabWithLine} from './components/TabWithLine.tsx';
import { codeBlokVal, dragFileSpaceVal } from './testdata/template.tsx'
import './App.css'

function App() {
  return (
    <div>
      <CodeBlock title={codeBlokVal.title} code={codeBlokVal.code} />
      <DragFileSpace handleFileChange={dragFileSpaceVal.handleFileChange} />
    </div>
  )
}

export default App
