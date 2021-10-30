import React from "react";
import PropTypes from "prop-types";
import { Layout } from "antd";
import Header from "../Header";
const { Content } = Layout;

function Layouts({ children }) {
  return (
    <Layout>
      <Header />
      <Content style={{ padding: "0 50px" }}>{children}</Content>
    </Layout>
  );
}

Layouts.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layouts;
