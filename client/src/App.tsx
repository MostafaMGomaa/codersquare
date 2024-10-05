import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ListPosts, ViewPost, Signup } from './pages';
import { NavBar } from './components';

function App() {
  return (
    <>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListPosts />} />
          <Route path="/post/:id" element={<ViewPost />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
