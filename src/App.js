import React from "react";
import "./App.less";
import Layout from "./components/Layouts";

import Homescreen from "./screens/Home";

const App = () => (
  <div className="App">
    <Layout>
      <Homescreen />
    </Layout>
  </div>
);

export default App;
