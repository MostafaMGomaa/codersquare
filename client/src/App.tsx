import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { ListPosts, ViewPost, SignupForm } from './pages';
import { NavBar } from './components';

function App() {
  return (
    <>
      <NavBar />
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListPosts />} />
          <Route path="/post/:id" element={<ViewPost />} />
          <Route path="/signup" element={<SignupForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
