import bodyParser = require("body-parser");

import * as express from "express";
import customersSeed from "./seed";
import { createUuid } from "./utils";

const server = express();
const port = process.env.PORT || 3000;

const customers = customersSeed;

server.use(express.static("public"));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

const isAvialable = email =>
  !customers.find(customer => customer.email === email);

server.get("/customers", (req, res) => {
  res.status(200).json(customers);
});

server.get("/customers/:id", (req, res) => {
  const { id } = req.params;
  console.info({ id });
  // if (!id) {
  //   return res.status(200).json(customers);
  // }
  const customer = customers.find(customer => customer.id === id);
  if (!customer) {
    return res.status(400).json({ error: "CUSTOMER_NOT_FOUND" });
  }
  res.status(200).json(customer);
});

server.post("/create", (req, res) => {
  console.info({ body: req.body });
  const { email } = req.body;
  if (!isAvialable(email)) {
    return res.status(409).json({ error: "EMAIL_ALREADY_TAKEN" });
  }

  const id = createUuid();
  customers.push({ ...req.body, id });
  return res.status(200).json({ customerId: id });
});

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.info(`Listening on port: ${port}`);
});
