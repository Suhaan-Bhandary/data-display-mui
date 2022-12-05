import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import TodoTable from './components/TodoTable/TodoTable';

function App() {
  return (
    <div className="App">
      <TodoTable />
    </div>
  );
}

export default App;
