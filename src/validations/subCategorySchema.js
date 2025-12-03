// @/validations/subCategorySchema.js
import * as Yup from "yup";

export const subCategorySchema = Yup.object().shape({
  name: Yup.string().trim().required("Subcategory name is required"),

  category: Yup.string().required("Please select a category"),
});
