import * as Yup from "yup";

export const priceSchema = Yup.object().shape({
  itemId: Yup.string().required("Item is required"),

  targetKg: Yup.number()
    .required("Target Kg is required")
    .min(1, "Target Kg must be at least 1"),
});
