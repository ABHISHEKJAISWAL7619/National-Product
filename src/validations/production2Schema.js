import * as yup from "yup";

export const createProduction2Schema = yup.object().shape({
  productionId: yup.string().required("Batch selection is required"),
  quantity: yup
    .number()
    .typeError("Quantity must be a number")
    .min(1, "Quantity must be at least 1")
    .required("Quantity is required"),
  productName: yup.string().required("productName selection is required"),
});

const numberTransform = (value, originalValue) =>
  originalValue === "" || originalValue === null ? null : Number(originalValue);

export const updateProduction2Schema = yup.object().shape({
  productionId: yup.string().required("Batch selection is required"),
  quantity: yup
    .number()
    .typeError("Quantity must be a number")
    .min(1)
    .required(),
  productName: yup.string().required("productName selection is required"),
  gauge: yup.number().transform(numberTransform).nullable(),
  flux: yup.number().transform(numberTransform).nullable(),
  fluxQty: yup.number().transform(numberTransform).nullable(),
  semiFinishedKg: yup.number().typeError("Must be a number").min(0).required(),
  semiPieces: yup.number().typeError("Must be a number").min(0).required(),
  reusableWaste: yup.number().typeError("Must be a number").min(0).required(),
  waste: yup.number().typeError("Must be a number").min(0).required(),
  shortAndAccess: yup.number().typeError("Must be a number").min(0).required(),
  gula: yup.number().transform(numberTransform).nullable(),
  available: yup.number().transform(numberTransform).nullable(),
  status: yup.string().oneOf(["pending", "completed"]).required(),
});
