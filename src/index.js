import "./index.scss";
import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";

import { CartState } from "./state/cart";

import { BrowserRouter, Switch, Route } from "react-router-dom";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

export const routes = [
  {
    path: "/cart",
    component: lazy(() => import("./pages/Cart/Cart")),
    exact: true
  },
  {
    path: "/",
    component: lazy(() => import("./pages/Main/Main")),
    exact: true
  },
  {
    path: "*",
    component: lazy(() => import("./pages/Main/Main")),
    exact: false
  }
];

const renderRoutes = routes;

root.render(
  <StrictMode>
    <CartState>
      <Suspense
        fallback={
          <div
            className="loader"
            style={{
              display: "grid",
              placeItems: "center",
              width: "100vw",
              height: "100vh"
            }}
          >
            <img
              src="data:image/jpeg;base64,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"
              alt="loading..."
            />
          </div>
        }
      >
        <BrowserRouter>
          <Switch>
            {renderRoutes.map((route, key) => (
              <Route
                key={key}
                path={route.path}
                exact={route.exact}
                component={route.component}
              />
            ))}
          </Switch>
        </BrowserRouter>
      </Suspense>
    </CartState>
  </StrictMode>
);
