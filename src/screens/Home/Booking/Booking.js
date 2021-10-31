import React, { useContext, useState } from "react";
import { Form, Button } from "antd";
import AddFrom from "../AddForm";
import Modal from "../../../components/Modal";
import { ProductContext } from "../../../Context/ProductContext";
import { numberOfDays, discountCalculate } from "../../../lib";

const layout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 16,
  },
};

function Booking() {
  const [hasModal, setModal] = useState(false);
  const [hasConfirmAlert, setConfirmAlert] = useState(false);
  const [price, setPrice] = useState("");
  const [product, setProduct] = useState({});
  const [, dispatch] = useContext(ProductContext);
  const [form] = Form.useForm();

  const toggleModal = () => {
    setModal(!hasModal);
  };

  const toggleConfirmAlert = () => {
    setConfirmAlert(!hasConfirmAlert);
  };

  const onFinish = (values) => {
    const countDays = numberOfDays(values?.from_to_date);
    const price = product?.price * countDays;
    const discount =
      product?.minimum_rent_period < countDays ? values?.discount : 0;
    const discountPrice = discountCalculate(price, discount);
    const afterDiscountPrice = price - discountPrice;
    setPrice(afterDiscountPrice);

    if (hasConfirmAlert) {
      saveReturn(afterDiscountPrice, values?.needing_repair);
    } else {
      toggleConfirmAlert();
    }
  };

  const saveReturn = (afterDiscountPrice, needing_repair) => {
    const updateProduct = {
      ...product,
      availability: false,
      rent: afterDiscountPrice,
      needing_repair,
    };
    dispatch({ type: "update", payload: updateProduct });
    toggleConfirmAlert();
    toggleModal();
    form.resetFields();
  };

  const changeProduct = (product) => {
    setProduct(product);
    form.setFieldsValue({
      rental_period: product?.minimum_rent_period,
      mileage: product?.mileage,
    });
  };

  const submitButton = (
    <Button type="primary" form="bookingForm" key="submit" htmlType="submit">
      Ok
    </Button>
  );

  return (
    <>
      <Form
        {...layout}
        form={form}
        id="bookingForm"
        onFinish={onFinish}
        name="control-hooks"
      >
        <Button type="primary" onClick={toggleModal}>
          Book
        </Button>
        <Modal
          title="Book a product"
          hasModalVisible={hasModal}
          toggleModal={toggleModal}
          footer={[
            <Button key="cancel" onClick={toggleModal}>
              Cancel
            </Button>,
            submitButton,
          ]}
        >
          <AddFrom changeProduct={changeProduct} />
        </Modal>
        <Modal
          title="Book a product"
          hasModalVisible={hasConfirmAlert}
          toggleModal={toggleConfirmAlert}
          footer={[
            <Button key="cancel" onClick={toggleConfirmAlert}>
              Cancel
            </Button>,
            submitButton,
          ]}
        >
          <div className="text-center">
            Your estimated price is {price} <br /> do you want to proceed?
          </div>
        </Modal>
      </Form>
    </>
  );
}

export default Booking;
