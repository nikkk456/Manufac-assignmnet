import { MantineProvider } from '@mantine/core';
import Home from './component/Home';
import '@mantine/core/styles.css';

function App() {
  return (
   <MantineProvider>
   <Home/>
   </MantineProvider>
  );
}

export default App;
