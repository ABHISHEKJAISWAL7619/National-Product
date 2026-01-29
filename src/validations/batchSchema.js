import * as yup from "yup";

export const batchSchema = yup.object().shape({
  date: yup.string().required("Date is required"),
  batchNo: yup.string().required("Batch No is required"),
  quantity: yup
    .number()
    .typeError("quantity must be a number")
    .positive("quantity must be greater than 0")
    .required("quantity is required"),
  reuseable: yup.string().required("reuseable No is required"),
  type: yup
    .string()
    .oneOf(["solderingWire", "solderingStick"], "Invalid type selected")
    .required("Type is required"),
  outputItem: yup.string().required("Output item is required"),
  inputItem: yup
    .array()
    .of(
      yup.object().shape({
        itemId: yup.string().required("Item is required"),
        quantity: yup
          .number()
          .typeError("Quantity must be a number")
          .positive("Quantity must be greater than 0")
          .required("Quantity is required"),
        reuseableQty: yup
          .number()
          .typeError("Reuseable quantity must be a number")
          .min(0, "Minimum 0 allowed"),
      }),
    )
    .min(1, "At least one input item is required"),
});
