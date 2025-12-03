import * as yup from "yup";

export const createProductionSchema = yup.object().shape({
  batch: yup.string().required("Batch No is required"),
});

export const updateProductionSchema = yup.object().shape({
  batch: yup.string().required("Batch No is required"),
  semiFinishedKg: yup.number().typeError("Must be a number").min(0).nullable(),
  // semiPieces: yup.number().typeError("Must be a number").min(0).nullable(),
  reusableWaste: yup
    .number()
    .typeError("Must be a number")
    .min(0)
    .required("Reusable waste is required"),
  waste: yup
    .number()
    .typeError("Must be a number")
    .min(0)
    .required("Waste is required"),
  shortAccess: yup
    .number()
    .typeError("Must be a number")
    .min(0)
    .required("Short and Access is required"),
  status: yup.string().required("Status is required"),
});
