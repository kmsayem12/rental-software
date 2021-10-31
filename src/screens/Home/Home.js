import React, { useContext } from "react";
import Table, { TableFilterColumn } from "../../components/Table";
import Card from "../../components/Card";
import Booking from "./Booking";
import Return from "./Return";
import { ProductContext } from "../../Context/ProductContext";

import { HomeStyles } from "./styles";

function Home() {
  const [state] = useContext(ProductContext);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      ...TableFilterColumn("name", "Name"),
    },
    {
      title: "Rental fees",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      ...TableFilterColumn("price", "Rental fees"),
    },
    {
      title: "Total Price",
      dataIndex: "rent",
      key: "rent",
      sorter: (a, b) => a.rent - b.rent,
      ...TableFilterColumn("rent", "Total Price"),
    },
    {
      title: "Mileage",
      dataIndex: "mileage",
      key: "mileage",
      sorter: (a, b) => a.mileage - b.mileage,
      ...TableFilterColumn("mileage", "Mileage"),
    },
    {
      title: "Durability",
      dataIndex: "durability",
      key: "durability",
      sorter: (a, b) => a.durability - b.durability,
      ...TableFilterColumn("durability", "Durability"),
    },
    {
      title: "Need to fix",
      key: "needing_repair",
      dataIndex: "needing_repair",
      ...TableFilterColumn("needing_repair", "Need to fix"),
      render: (needing_repair) => (needing_repair ? "Yes" : "No"),
    },
    {
      title: "Available",
      key: "availability",
      dataIndex: "availability",
      sorter: (a, b) => a.availability - b.availability,
      ...TableFilterColumn("availability", "Available"),
      render: (availability) => (availability ? "Yes" : "No"),
    },
  ];

  return (
    <HomeStyles>
      <Card>
        <div className="page-header">
          <Booking />
          <Return />
        </div>
        <Table columns={columns} data={state} />
      </Card>
    </HomeStyles>
  );
}

export default Home;
