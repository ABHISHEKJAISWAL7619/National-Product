import * as yup from "yup";

export const batchSchema = yup.object().shape({
  date: yup.string().required("Date is required"),
  batchNo: yup.string().required("Batch No is required"),
  quantity: yup
    .number()
    .typeError("quantity must be a number")
    .positive("quantity must be greater than 0")
    .required("quantity is required"),
  type: yup
    .string()
    .oneOf(["solderingWire", "solderingStick"], "Invalid type selected")
    .required("Type is required"),
  outputItem: yup.string().required("Output item is required"),
});
