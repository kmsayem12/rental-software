import React from "react";
import PropTypes from "prop-types";
import { Modal } from "antd";
function Modals({ children, hasModalVisible, title, footer, toggleModal }) {
  return (
    <>
      <Modal
        title={title}
        visible={hasModalVisible}
        footer={footer}
        onCancel={toggleModal}
      >
        {children}
      </Modal>
    </>
  );
}

Modals.propTypes = {
  children: PropTypes.node.isRequired,
  hasModalVisible: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  footer: PropTypes.node.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default Modals;
