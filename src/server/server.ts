import bodyParser = require("body-parser");

import * as express from "express";
import customersSeed from "./seed";
import { createUuid, ErrorList } from "./utils";

const isAvialable = (email, customers) =>
  !customers.find(customer => customer.email === email);

const customers = customersSeed;

const DEVELOPMENT = process.env.NODE_ENV !== "development";
const apiPrefix = DEVELOPMENT ? "/api" : "";

const server = express();
const port = process.env.PORT || 3000;

server.use(express.static("public"));
server.use("/request", express.static("public"));
server.use("/customer", express.static("public"));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.get(`${apiPrefix}/customers`, (req, res) => {
  res.status(200).json(customers);
});

server.get(`${apiPrefix}/customers/:id`, (req, res) => {
  const { id } = req.params;
  const customer = customers.find(customer => customer.id === id);
  if (!customer) {
    return res.status(400).json({ error: ErrorList.CUSTOMER_NOT_FOUND });
  }
  res.status(200).json(customer);
});

server.post(`${apiPrefix}/create`, (req, res) => {
  const { email } = req.body;
  if (!isAvialable(email, customers)) {
    return res.status(409).json({ error: ErrorList.EMAIL_ALREADY_TAKEN });
  }

  const id = createUuid();
  customers.push({ ...req.body, id });
  return res.status(200).json({ customerId: id });
});

server.post(`${apiPrefix}/withdraw`, (req, res) => {
  const { id, amount } = req.body;

  if (!id) {
    return res.status(500).end();
  }

  const customerIndex = customers.findIndex(customer => customer.id === id);
  if (!customerIndex) {
    return res.status(400).json({ error: ErrorList.CUSTOMER_NOT_FOUND });
  }

  const customer = customers[customerIndex];

  if (customer.balance - amount < 0) {
    return res.status(400).json({ error: ErrorList.NOT_ENAUGH_FOUNDS });
  }

  customers[customerIndex].balance -= amount;
  return res.status(200).json({ newBalance: customers[customerIndex].balance });
});

server.listen(port, () => {
  console.info(`Listening on port: ${port}`);
});
