import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ListPosts, ViewPost } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListPosts />} />
        <Route path="/post/:id" element={<ViewPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
