import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Homepage from "../pages/Homepage";
import RootLayout from "../layout/RootLayout";
import Signin from "../pages/auth/Signin";
import Signup from "../pages/auth/Signup";
const ROOT = "/";
const SIGNIN = "/login";
const REGISTER = "/register";
export const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path={ROOT} element={<RootLayout />}>
      <Route index element={<Homepage />} />
      <Route path={SIGNIN} element={<Signin />} />
      <Route path={REGISTER} element={<Signup />} />
      <Route />
    </Route>
  )
);
