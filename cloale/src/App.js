import { createGlobalStyle } from "styled-components";
import Header from "./Header";
import CenterAlign from "./style/centerAlign";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, { Suspense, lazy } from "react";

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <CenterAlign>
        <Header />
        <Switch>
          <Route
            path="/"
            render={({ history, location, match }) => {
              const Page = lazy(() =>
                import("./pages" + location.pathname).catch((e) => {
                  if (/not find module/.test(e.message)) {
                    return import("./pages/NotFound.js");
                  }
                  if (/Loading chunk \d+ failed/.test(e.message)) {
                    window.location.reload();
                    return;
                  }
                  throw e;
                })
              );
              return (
                <Suspense fallback={<div>Loading..</div>}>
                  <Page />
                </Suspense>
              );
            }}
          />
        </Switch>
      </CenterAlign>
    </BrowserRouter>
  );
}
