// import { useState, useCallback } from "react";

// export const useForm = ({
//   defaultValues = {},
//   schema = null,
//   validate = null,
//   onServerError = null,
// } = {}) => {
//   const [formData, setFormData] = useState(defaultValues);
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = useCallback((field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//     setErrors((prev) => ({ ...prev, [field]: "" }));
//   }, []);

//   const validateFields = useCallback(() => {
//     if (!schema && !validate) return true;

//     let validationErrors = {};

//     // ✅ Zod
//     if (schema?.safeParse) {
//       const result = schema.safeParse(formData);
//       if (!result.success) {
//         result.error.errors.forEach((err) => {
//           const key = err.path[0];
//           validationErrors[key] = err.message;
//         });
//       }
//     }

//     // ✅ Yup
//     else if (schema?.validateSync) {
//       try {
//         schema.validateSync(formData, { abortEarly: false });
//       } catch (err) {
//         err.inner.forEach((e) => {
//           validationErrors[e.path] = e.message;
//         });
//       }
//     }

//     // ✅ Custom validator
//     if (typeof validate === "function") {
//       const customErrors = validate(formData);
//       if (customErrors) {
//         validationErrors = { ...validationErrors, ...customErrors };
//       }
//     }

//     setErrors(validationErrors);
//     return Object.keys(validationErrors).length === 0;
//   }, [formData, schema, validate]);

//   const handleSubmit = useCallback(
//     (submitFn) => async (e) => {
//       e?.preventDefault?.();
//       setErrors({});
//       setIsSubmitting(true);

//       const isValid = validateFields();
//       if (!isValid) {
//         setIsSubmitting(false);
//         return;
//       }

//       try {
//         await submitFn(formData);
//       } catch (error) {
//         // 👇 Auto-handle field errors if they follow { field: message }
//         if (error && typeof error === "object" && !Array.isArray(error)) {
//           const fieldErrors = {};
//           for (const key in error) {
//             fieldErrors[key] = error[key];
//           }
//           setErrors(fieldErrors);
//         } else {
//           console.error("Non-field server error:", error);
//         }
//       } finally {
//         setIsSubmitting(false);
//       }
//     },
//     [formData, validateFields]
//   );

//   const setFieldError = useCallback((field, message) => {
//     setErrors((prev) => ({ ...prev, [field]: message }));
//   }, []);

//   const reset = useCallback(() => {
//     setFormData(defaultValues);
//     setErrors({});
//   }, [defaultValues]);

//   return {
//     formData,
//     setFormData,
//     handleChange,
//     errors,
//     setError: setFieldError,
//     handleSubmit,
//     reset,
//     isSubmitting,
//   };
// };
// import { useState, useCallback } from "react";

// export const useForm = ({
//   defaultValues = {},
//   schema = null,
//   validate = null,
// } = {}) => {
//   const [formData, setFormData] = useState(defaultValues);
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // ---- Helper: Set nested value using string path ----
//   const updateNestedValue = (obj, path, value) => {
//     const keys = path.split(/[\.\[\]]/).filter(Boolean);
//     let temp = obj;

//     keys.forEach((key, index) => {
//       if (index === keys.length - 1) {
//         temp[key] = value;
//       } else {
//         if (!temp[key]) temp[key] = isNaN(keys[index + 1]) ? {} : [];
//         temp = temp[key];
//       }
//     });

//     return { ...obj };
//   };

//   // ---- Helper: Set error nested ----
//   const updateNestedError = (obj, path, value) => {
//     const keys = path.split(/[\.\[\]]/).filter(Boolean);
//     let temp = obj;

//     keys.forEach((key, index) => {
//       if (index === keys.length - 1) {
//         temp[key] = value;
//       } else {
//         if (!temp[key]) temp[key] = {};
//         temp = temp[key];
//       }
//     });

//     return { ...obj };
//   };

//   // ---- Main handle change ----
//   const handleChange = useCallback((field, value) => {
//     setFormData((prev) => updateNestedValue(prev, field, value));
//     setErrors((prev) => updateNestedError(prev, field, ""));
//   }, []);

//   // ---- Validation ----
//   const validateFields = useCallback(() => {
//     if (!schema && !validate) return true;

//     let validationErrors = {};

//     // ZOD
//     if (schema?.safeParse) {
//       const result = schema.safeParse(formData);
//       if (!result.success) {
//         result.error.errors.forEach((err) => {
//           const path = err.path.join(".");
//           validationErrors = updateNestedError(
//             validationErrors,
//             path,
//             err.message
//           );
//         });
//       }
//     }

//     // Yup
//     else if (schema?.validateSync) {
//       try {
//         schema.validateSync(formData, { abortEarly: false });
//       } catch (err) {
//         err.inner.forEach((e) => {
//           validationErrors = updateNestedError(
//             validationErrors,
//             e.path,
//             e.message
//           );
//         });
//       }
//     }

//     // Custom Validation
//     if (typeof validate === "function") {
//       const customErrors = validate(formData);
//       if (customErrors) {
//         validationErrors = { ...validationErrors, ...customErrors };
//       }
//     }

//     setErrors(validationErrors);
//     return Object.keys(validationErrors).length === 0;
//   }, [formData, schema, validate]);

//   // ---- Submit ----
//   const handleSubmit = useCallback(
//     (submitFn) => async (e) => {
//       e?.preventDefault?.();
//       setErrors({});
//       setIsSubmitting(true);

//       const isValid = validateFields();
//       if (!isValid) return setIsSubmitting(false);

//       try {
//         await submitFn(formData);
//       } catch (error) {
//         setErrors(error);
//       } finally {
//         setIsSubmitting(false);
//       }
//     },
//     [formData, validateFields]
//   );

//   return {
//     formData,
//     handleChange,
//     errors,
//     handleSubmit,
//     isSubmitting,
//     setFormData,
//   };
// };
// useForm.js
import { useState, useCallback } from "react";

export const useForm = ({
  defaultValues = {},
  schema = null,
  validate = null,
  onServerError = null,
} = {}) => {
  const [formData, setFormData] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // -------- Helper: Set nested value using string path --------
  const updateNestedValue = (obj, path, value) => {
    const keys = path.split(/[\.\[\]]/).filter(Boolean);
    let temp = obj;

    keys.forEach((key, i) => {
      if (i === keys.length - 1) {
        temp[key] = value;
      } else {
        if (!temp[key]) temp[key] = isNaN(keys[i + 1]) ? {} : [];
        temp = temp[key];
      }
    });

    return structuredClone(obj);
  };

  // -------- Helper: Set nested error using path --------
  const updateNestedError = (obj, path, value) => {
    const keys = path.split(/[\.\[\]]/).filter(Boolean);
    let temp = obj;

    keys.forEach((key, i) => {
      if (i === keys.length - 1) {
        temp[key] = value;
      } else {
        if (!temp[key]) temp[key] = {};
        temp = temp[key];
      }
    });

    return structuredClone(obj);
  };

  // -------- Handle field change --------
  const handleChange = useCallback((field, value) => {
    setFormData((prev) => updateNestedValue(prev, field, value));
    setErrors((prev) => updateNestedError(prev, field, ""));
  }, []);

  // -------- Validate fields --------
  const validateFields = useCallback(() => {
    if (!schema && !validate) return true;

    let validationErrors = {};

    // ---- Zod ----
    if (schema?.safeParse) {
      const result = schema.safeParse(formData);
      if (!result.success) {
        result.error.errors.forEach((err) => {
          const path = err.path.join(".");
          validationErrors = updateNestedError(
            validationErrors,
            path,
            err.message
          );
        });
      }
    }

    // ---- Yup ----
    else if (schema?.validateSync) {
      try {
        schema.validateSync(formData, { abortEarly: false });
      } catch (err) {
        err.inner.forEach((e) => {
          validationErrors = updateNestedError(
            validationErrors,
            e.path,
            e.message
          );
        });
      }
    }

    // ---- Custom validator ----
    if (typeof validate === "function") {
      const customErrors = validate(formData);
      if (customErrors)
        validationErrors = { ...validationErrors, ...customErrors };
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  }, [formData, schema, validate]);

  // -------- Submit Handler --------
  const handleSubmit = useCallback(
    (submitFn) => async (e) => {
      e?.preventDefault?.();
      setErrors({});
      setIsSubmitting(true);

      const isValid = validateFields();
      if (!isValid) {
        setIsSubmitting(false);
        return;
      }

      try {
        await submitFn(formData);
      } catch (error) {
        // Auto-handle server-side errors if key:value
        if (error && typeof error === "object" && !Array.isArray(error)) {
          const formatted = {};

          Object.entries(error).forEach(([key, msg]) => {
            validationErrors = updateNestedError(formatted, key, msg);
          });

          setErrors(formatted);
          onServerError?.(formatted);
        } else {
          console.error("Non-field server error:", error);
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, validateFields]
  );

  // -------- Set single field error manually --------
  const setFieldError = useCallback((field, message) => {
    setErrors((prev) => updateNestedError(prev, field, message));
  }, []);

  // -------- Reset form --------
  const reset = useCallback(() => {
    setFormData(defaultValues);
    setErrors({});
  }, [defaultValues]);

  return {
    formData,
    setFormData,
    handleChange,
    errors,
    setError: setFieldError,
    handleSubmit,
    reset,
    isSubmitting,
  };
};
