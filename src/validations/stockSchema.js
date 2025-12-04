import * as yup from "yup";

export const stockSchema = yup.object().shape({
  productName: yup.string().required("Product Name is required"),
  // quantity: yup.string().required("Quantity is required"),
  unitPrice: yup.number().required("unitPrice is required"),
  symbol: yup.string().required("symbol is required"),
});
