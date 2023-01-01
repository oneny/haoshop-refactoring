import { Layout, PersistLogin, Prefetch } from 'components';
import { Home, Signup, Signin } from 'pages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Prefetch />}>
          <Route element={<Layout />}>
            <Route element={<PersistLogin />}>
              <Route index element={<Home />} />
            </Route>
            <Route path='signup' element={<Signup />} />
            <Route path='signin' element={<Signin />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
