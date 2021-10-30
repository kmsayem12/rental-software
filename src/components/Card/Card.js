import React from "react";
import PropTypes from "prop-types";
import { Card } from "antd";
import { CardStyles } from "./styles";

function Cards({ size = "small", children }) {
  return (
    <CardStyles>
      <Card size={size}>{children}</Card>
    </CardStyles>
  );
}

Cards.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.string,
};

export default Cards;
