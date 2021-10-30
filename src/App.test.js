import { render, screen } from "@testing-library/react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Header from "./components/Header";
import Table from "./components/Table";

import Products from "./Products/Products.json";

configure({ adapter: new Adapter() });
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Rental fees",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Mileage",
    dataIndex: "mileage",
    key: "mileage",
  },
  {
    title: "Durability",
    dataIndex: "durability",
    key: "durability",
  },
];

test("header component", () => {
  render(<Header />);
  const linkElement = screen.getByText(/Rental Software/i);
  expect(linkElement).toBeInTheDocument();
});

test("table component", () => {
  const wrapper = shallow(<Table columns={columns} data={Products} />);
  expect(wrapper.find("Table").props().dataSource?.length).toEqual(17);
});
