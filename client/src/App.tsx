import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ListPosts, ViewPost } from './components';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListPosts />} />
          <Route path="/post/:id" element={<ViewPost />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
