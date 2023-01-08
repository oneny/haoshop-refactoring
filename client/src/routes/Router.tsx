import { Layout, PersistLogin, Prefetch } from 'components';
import { Home, Signup, Signin, Lookbook, Lookbooks } from 'pages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// const Home = lazy(() => import('pages/Home').then(({ Home }) => ({ default: Home })));
// const Signup = lazy(() => import('pages/Signup').then(({ Signup }) => ({ default: Signup })));
// const Signin = lazy(() => import('pages/Signin').then(({ Signin }) => ({ default: Signin })));
// const Lookbook = lazy(() => import('pages/Lookbook').then(({ Lookbook }) => ({ default: Lookbook })));

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
