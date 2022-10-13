import React from "react";
import Toast from "./components/UI/Toast";
import { BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import MainNavigation from "./components/Layout/MainNavigation";
import Pages from "./pages/Pages";

const App = () => {
  return (
    <BrowserRouter>
      <MainNavigation />
      <Layout>
        <Pages />
        <Toast />
      </Layout>
    </BrowserRouter>
  );
};

export default App;
