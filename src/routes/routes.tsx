import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import RootLayout from "../layout/RootLayout";
const Homepage = React.lazy(() => import('../pages/Homepage'))
const Signin  = React.lazy(() => import('../pages/auth/Signin'))
const Signup = React.lazy(() =>import('../pages/auth/Signup'))
const ImageList = React.lazy(() =>import('../pages/list/ImageList'))
const NotFound = React.lazy(() =>import('../pages/NotFound'))
const ROOT = "/";
const SIGNIN = "/login";
const REGISTER = "/register";
const LIST = "/imageList"
const NOTFOUND = "*"
export const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path={ROOT} element={<RootLayout />}>
      <Route index element={<Homepage />} />
      <Route path={SIGNIN} element={<Signin />} />
      <Route path={REGISTER} element={<Signup />} />
      <Route path={LIST} element={<ImageList/>}/>
      <Route path={NOTFOUND} element={<NotFound/>}/>
      <Route />
    </Route>
  )
);
