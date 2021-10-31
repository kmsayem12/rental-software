import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Form, Input, InputNumber, Select, DatePicker } from "antd";
import moment from "moment";
import { dateFormat } from "../../../constants";
import { ProductContext } from "../../../Context/ProductContext";

const { RangePicker } = DatePicker;
const { Option } = Select;
const rules = [{ required: true }];

function AddFrom({ changeProduct, addType = "booking" }) {
  const [state] = useContext(ProductContext);
  // product must have durability more than 0
  const productWithDurability = state.filter((item) => item.durability > 0);

  const selectProduct = (value) => {
    const product = state[value];
    changeProduct(product);
  };

  // product options
  const productOptions = productWithDurability.map((product, index) => (
    <Option value={index} key={index}>
      {product.name}
    </Option>
  ));

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().endOf("day");
  };
  const discountTooltip =
    "The discount will be applied when rents the product longer than the minimum rental period";

  return (
    <>
      <Form.Item name="product" label="Product" rules={rules}>
        <Select
          placeholder="Select a product"
          onChange={selectProduct}
          allowClear
        >
          {productOptions}
        </Select>
      </Form.Item>
      <Form.Item name="rental_period" label="Rental Period">
        <Input readOnly />
      </Form.Item>
      <Form.Item name="mileage" label="Mileage">
        <Input readOnly />
      </Form.Item>
      <Form.Item name="discount" label="Discount" tooltip={discountTooltip}>
        <InputNumber
          formatter={(value) => `${value}%`}
          parser={(value) => value.replace("%", "")}
          min="0"
          style={{ width: "100%" }}
        />
      </Form.Item>
      {addType === "return" ? (
        <Form.Item name="use_mileage" label="Use Mileage">
          <Input />
        </Form.Item>
      ) : (
        <Form.Item name="from_to_date" label="From Date To Date" rules={rules}>
          <RangePicker
            disabledDate={disabledDate}
            style={{ width: "100%" }}
            format={dateFormat}
          />
        </Form.Item>
      )}

      <Form.Item name="needing_repair" label="Need Repair" rules={rules}>
        <Select placeholder="Select a repair" allowClear>
          <Option value={true}>Yes</Option>
          <Option value={false}>No</Option>
        </Select>
      </Form.Item>
    </>
  );
}

AddFrom.propTypes = {
  changeProduct: PropTypes.func.isRequired,
  addType: PropTypes.string,
};

export default AddFrom;
