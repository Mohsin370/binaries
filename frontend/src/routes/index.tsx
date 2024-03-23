import { useRoutes } from "react-router-dom";
import { Suspense, lazy } from "react";

const Loadable = (Component: any) => (props: any) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </Suspense>
  );
};
const Login = Loadable(lazy(() => import("../pages/auth/Login")));
const Register = Loadable(lazy(() => import("../pages/auth/Register")));
const ForgotPassword = Loadable(
  lazy(() => import("../pages/auth/ForgotPassword"))
);
const ResetPassword = Loadable(
  lazy(() => import("../pages/auth/ResetPassword"))
);

export const Router = () => {
  return useRoutes([
    {
      path: "auth",
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forgot-password", element: <ForgotPassword /> },
        { path: "reset-password", element: <ResetPassword /> },
        { path: "*", element: <div>Page not found</div> },
      ],
    },
    {
      path: "*",
      element: <div>Page not found</div>,
    },
  ]);
};
