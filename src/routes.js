import * as React from "react";
import FourOhFour from "./pages/FourOhFour";
import CustomersPage from "./pages/customers/index";
import AddressForm from "./pages/request/index";

const PAGES = {
  "^/$": CustomersPage,
  "/request": AddressForm,
  "/customer": () => <AddressForm />,
  "/404": FourOhFour
};

export const Routes = Object.keys(PAGES);

export default PAGES;
