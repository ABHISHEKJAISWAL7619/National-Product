"use client";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "@/hooks/useForm";
import { loginSchema } from "@/validations/loginSchema";
import { loginuser } from "@/redux/slice/auth-slice";
import { errorToast, successToast } from "@/utils/toastMessage";
import Input from "@/components/common/Input";
import { Button } from "@/components/common/Button";

const Signin = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const { formData, handleChange, handleSubmit, errors, reset } = useForm({
    defaultValues: {
      email: "abhi@gmail.com",
      password: "123456",
    },
    schema: loginSchema,
  });

  const onSubmit = async (data) => {
    try {
      await dispatch(loginuser(data)).unwrap();
      successToast("Welcome back to National Product!");
      reset();
      router.push("/");
    } catch (error) {
      errorToast(error?.message || "Signin failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        {/* Logo / Branding */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 md:text-4xl">
            <span className="text-blue-600">National</span>{" "}
            {/* <span className="text-black">Krishna</span>{" "} */}
            <span className="text-green-600">Product</span>
          </h1>
          <p className="mt-2 text-gray-600">Sign in to continue</p>
        </div>

        {/* Signin Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            label="Email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            error={errors.email}
          />

          <Input
            type="password"
            name="password"
            placeholder="Enter your password"
            label="Password"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            error={errors.password}
          />
          <Button
            disabled={loading}
            loading={loading}
            type="submit"
            className="w-full cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 py-2.5 text-white hover:opacity-90"
          >
            Sign In
          </Button>
        </form>

        {/* Extra Links */}
        {/* <div className="mt-5 text-center text-sm text-gray-600">
          <p>
            Don’t have an account?{" "}
            <a
              onClick={() => router.push("/auth/signup")}
              className="cursor-pointer font-semibold text-blue-600 hover:underline"
            >
              Create one
            </a>
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default Signin;
