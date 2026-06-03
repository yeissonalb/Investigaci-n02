
import RootLayout from "./Components/RootLayout";
import HomePage from "./Pages/HomePage";
import UsersPage from "./Pages/UsersPage";
import LoginPage from "./Pages/LoginPage";
import { requireAdmin } from "./utils/authGuard";

import {
  createRootRoute,
  createRoute,
  createRouter,
  createBrowserHistory,
  redirect,
} from "@tanstack/react-router";
import { TOKEN_KEY } from "./Services/AuthService";
import { decodeToken, isTokenExpired } from "./utils/decodeToken";

const rootRoute = createRootRoute({
  component: RootLayout,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const usersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/users",
  component: UsersPage,
  beforeLoad: requireAdmin,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
  beforeLoad: () => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (!token) return

    try {
      const user = decodeToken(token)
      if (!isTokenExpired(user.exp) && user.role === 'admin') {
        throw redirect({ to: '/users' })
      }
    } catch (error) {
      if (error?.to) throw error
    }
  },
});

rootRoute.addChildren([homeRoute, usersRoute, loginRoute]);

const router = createRouter({
  routeTree: rootRoute,
  history: createBrowserHistory(),
  defaultErrorComponent: () => <div>Something went wrong</div>,
});

export default router;
