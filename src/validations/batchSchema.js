import * as yup from "yup";

export const batchSchema = yup.object().shape({
  date: yup.string().required("Date is required"),
  batchNo: yup.string().required("Batch No is required"),
  pieces: yup
    .number()
    .typeError("Pieces must be a number")
    .positive("Pieces must be greater than 0")
    .required("Pieces is required"),
  type: yup
    .string()
    .oneOf(["solderingWire", "solderingStick"], "Invalid type selected")
    .required("Type is required"),
  outputItem: yup.string().required("Output item is required"),
});
