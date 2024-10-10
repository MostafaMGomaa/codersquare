import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { ListPosts, ViewPost, SignupForm, LoginForm } from './pages';
import { NavBar } from './components';
import { CreatePost } from './pages/posts/create-post';

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/signin" element={<LoginForm />} />
          <Route path="/" element={<ListPosts />} />
          <Route path="/post/:id" element={<ViewPost />} />
          <Route path="/post/create" element={<CreatePost />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
