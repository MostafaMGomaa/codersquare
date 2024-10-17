import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  ListPosts,
  ViewPost,
  SignupForm,
  LoginForm,
  UserProfile,
} from './pages';
import { NavBar } from './components';
import { CreatePost, ErrorPage } from './pages';
import { ProtectedRoute } from './utils/protected-route';

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
          <Route element={<ProtectedRoute />}>
            <Route path="/post/:id" element={<ViewPost />} />
            <Route path="/post/create" element={<CreatePost />}></Route>
            <Route path="/me" element={<UserProfile />}></Route>
          </Route>
          <Route
            path="*"
            element={
              <ErrorPage
                errorMessage="Page Not Found"
                errorDetails="Sorry, we can't find that page. You'll find lots to explore on the home page."
                statusCode={404}
                icon={
                  <FontAwesomeIcon
                    icon={faTriangleExclamation}
                    className="text-orange-600 text-8xl mb-4  animate-bounce"
                  />
                }
              />
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
