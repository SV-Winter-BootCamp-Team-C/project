import { RouterProvider } from 'react-router-dom';
import './App.css';
import Router from './Router';

function App(): JSX.Element {
  return (
    <div>
      <RouterProvider router={Router} />
    </div>
  );
}

export default App;
