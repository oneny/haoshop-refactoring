import { Layout, PersistLogin, Prefetch } from 'components';
import { Home, Signup, Signin, Lookbook, Lookbooks } from 'pages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Router = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route element={<Prefetch />}>
              <Route element={<Layout />}>
                <Route element={<PersistLogin />}>
                  <Route index element={<Home />} />
                  <Route path='lookbooks'>
                    <Route index element={<Lookbooks />} />
                    <Route path=':lookbookId' element={<Lookbook />} />
                  </Route>
                  <Route path='signup' element={<Signup />} />
                  <Route path='signin' element={<Signin />} />
                </Route>
              </Route>
            </Route>
        </Routes>
    </BrowserRouter>
  );
};

export default Router;
