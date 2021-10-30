import React from "react";
import "./App.less";
import Layout from "./components/Layouts";
import ProductContextProvider from "./Context/ProductContext";

import Homescreen from "./screens/Home";

const App = () => (
  <div className="App">
    <Layout>
      <ProductContextProvider>
        <Homescreen />
      </ProductContextProvider>
    </Layout>
  </div>
);

export default App;
