import React from "react";
import { Layout } from "antd";
import { HeaderStyles } from "./styles";

const { Header } = Layout;
function Headers() {
  return (
    <HeaderStyles>
      <Header>
        <h3>Rental Software</h3>
      </Header>
    </HeaderStyles>
  );
}

export default Headers;
