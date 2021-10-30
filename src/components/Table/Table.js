import React from "react";
import PropTypes from "prop-types";
import { Table } from "antd";

function Tables({ columns, data }) {
  return <Table columns={columns} dataSource={data} />;
}

Tables.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
};

export default Tables;
