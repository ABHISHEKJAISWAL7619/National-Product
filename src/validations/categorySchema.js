// @/validations/categorySchema.js
import * as Yup from "yup";

export const categorySchema = Yup.object().shape({
  category: Yup.string().required("Category is required"),
});
