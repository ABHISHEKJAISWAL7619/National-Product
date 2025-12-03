import * as Yup from "yup";

export const incomingSchema = Yup.object().shape({
  date: Yup.string().required("Date is required"),
  invoiceNo: Yup.string().required("Invoice number is required"),

  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required"),

  products: Yup.array()
    .of(
      Yup.object().shape({
        itemId: Yup.string().required("Product is required"),

        quantity: Yup.number()
          .typeError("KG must be number")
          .required("Quantity is required")
          .positive("KG must be greater than 0"),

        // isPieces: Yup.boolean(),

        // pieces: Yup.mixed().when("isPieces", {
        //   is: true,
        //   then: Yup.number()
        //     .typeError("Pieces must be a number")
        //     .required("Pieces Quantity is required")
        //     .positive("Pieces must be greater than 0"),
        //   otherwise: Yup.mixed()
        //     .nullable()
        //     .transform(() => null),
        // }),
      })
    )
    .min(1, "At least one product is required"),
});
