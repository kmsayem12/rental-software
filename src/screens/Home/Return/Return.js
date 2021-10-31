import React, { useContext, useState } from "react";
import { Form, Button } from "antd";
import Modal from "../../../components/Modal";
import { ProductContext } from "../../../Context/ProductContext";
import {
  calculateMileageToCountDays,
  calculateMileageToPrice,
  calculateDurability,
  discountCalculate,
} from "../../../lib";
import AddFrom from "../AddForm";

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};

function Return() {
  const [hasModal, setModal] = useState(false);
  const [hasConfirmAlert, setConfirmAlert] = useState(false);
  const [product, setProduct] = useState({});
  const [price, setPrice] = useState("");
  const [, dispatch] = useContext(ProductContext);

  const [form] = Form.useForm();

  const toggleModal = () => {
    setModal(!hasModal);
  };

  const toggleConfirmAlert = () => {
    setConfirmAlert(!hasConfirmAlert);
  };

  const onFinish = (values) => {
    const use_mileage = values?.use_mileage;
    const price = calculateMileageToPrice(use_mileage, product?.price);
    const countDays = calculateMileageToCountDays(use_mileage);
    const discount =
      product?.minimum_rent_period < countDays ? values?.discount : 0;
    const discountPrice = discountCalculate(price, discount);
    const afterDiscountPrice = price - discountPrice;
    setPrice(afterDiscountPrice);

    if (hasConfirmAlert) {
      saveReturn(
        use_mileage,
        countDays,
        afterDiscountPrice,
        values?.needing_repair
      );
    } else {
      toggleConfirmAlert();
    }
  };

  const saveReturn = (
    use_mileage,
    countDays,
    afterDiscountPrice,
    needing_repair
  ) => {
    const durability = calculateDurability(
      countDays,
      product?.minimum_rent_period
    );
    const updateProduct = {
      ...product,
      mileage: use_mileage,
      durability: product?.durability - durability,
      rent: afterDiscountPrice,
      needing_repair,
    };
    dispatch({ type: "update", payload: updateProduct });
    // close all modal
    toggleConfirmAlert();
    toggleModal();
  };

  const changeProduct = (product) => {
    setProduct(product);
    form.setFieldsValue({
      rental_period: product?.minimum_rent_period,
      mileage: product?.mileage,
    });
  };

  const submitButton = (
    <Button type="primary" form="returnForm" key="submit" htmlType="submit">
      Ok
    </Button>
  );

  return (
    <Form
      {...layout}
      form={form}
      id="returnForm"
      onFinish={onFinish}
      name="control-hooks"
    >
      <Button onClick={toggleModal}>Return</Button>
      <Modal
        title="Return a product"
        hasModalVisible={hasModal}
        toggleModal={toggleModal}
        footer={[
          <Button key="cancel" onClick={toggleModal}>
            Cancel
          </Button>,
          submitButton,
        ]}
      >
        <AddFrom addType={"return"} changeProduct={changeProduct} />
      </Modal>
      <Modal
        title="Return a product"
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
          Your total price is {price} <br /> do you want to proceed?
        </div>
      </Modal>
    </Form>
  );
}

export default Return;
