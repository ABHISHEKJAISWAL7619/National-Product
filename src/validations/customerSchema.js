import * as yup from "yup";

export const customerSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  mobile: yup
    .string()
    .matches(/^\d{10}$/, "Mobile must be 10 digits")
    .required("Mobile is required"),
  address: yup.object().shape({
    country: yup.string().required("Country is required"),
    city: yup.string().required("City is required"),
    zipCode: yup.string().required("Zip code is required"),
    address: yup.string().required("Address is required"),
  }),
});
