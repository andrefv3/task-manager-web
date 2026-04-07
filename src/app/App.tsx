import { RouterProvider } from 'react-router-dom';
import { MainProvider } from './providers/MainProvider';
import { router } from './routes/AppRouter';

function App() {
  return (
    <MainProvider>
      <RouterProvider router={router} />
    </MainProvider>
  );
}

export default App;