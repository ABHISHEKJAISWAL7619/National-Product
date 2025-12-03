import * as yup from "yup";

export const memberSchema = yup.object().shape({
  name: yup.string().required("Name is required"),

  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),

  mobile: yup
    .string()
    .matches(/^\d{10}$/, "Mobile must be 10 digits")
    .required("Mobile is required"),

  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .when("$isEdit", {
      is: false,
      then: (schema) => schema.required("Password is required"),
      otherwise: (schema) => schema.notRequired(),
    }),

  roleId: yup.string().required("Role is required"),

  address: yup.object().shape({
    state: yup.string().required("State is required"),
    city: yup.string().required("City is required"),
    zip: yup.string().required("Zip code is required"),
    address: yup.string().required("Address is required"),
  }),

  isVerified: yup.boolean().required("status is required"),
});
