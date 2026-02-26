import * as Yup from "yup";

export const compositionSchema = Yup.object().shape({
  productName: Yup.string().trim().required("Composition name is required"),
  category: Yup.string().required("Category is required"),
  subcategory: Yup.string().required("Subcategory is required"),
  symbol: Yup.string().required("symbol is required"),
  productCode: Yup.string().required("productCode is required"),
  compositions: Yup.array()
    .of(
      Yup.object().shape({
        itemId: Yup.string().required("Please select an item"),
        percentage: Yup.number()
          .typeError("Percentage must be a number")
          .min(0.01, "Minimum 0.01% required")
          .max(100, "Maximum 100% allowed")
          .required("Item percentage is required"),
      }),
    )
    .min(1, "At least one item required"),
});
