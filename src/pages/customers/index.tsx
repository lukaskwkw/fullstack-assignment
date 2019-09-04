import * as React from "react";
import CustomersList from "./components/List";
import { useEffect, useState } from "react";

const customersUrl = "/api/customers";

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch(customersUrl)
      .then(res => res.json())
      .then(customers => setCustomers(customers));
  }, []);

  return (
    <div>{customers.length > 0 && <CustomersList customers={customers} />}</div>
  );
};

export default CustomersPage;
