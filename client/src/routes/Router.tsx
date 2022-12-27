import { Layout } from 'components';
import { Home, Signup, Signin } from 'pages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='signup' element={<Signup />} />
          <Route path='signin' element={<Signin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
