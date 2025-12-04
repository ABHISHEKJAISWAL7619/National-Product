import Spinner from "./loaders/spinner";

const variantClasses = {
  primary: "bg-blue-600 bg-navy !text-white",
  secondary:
    "bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200",
  outline:
    "bg-transparent text-gray-800 border border-gray-300 hover:bg-gray-100",
  danger: "bg-red-600 text-white border border-transparent hover:bg-red-700",
};

const sizeClasses = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

export const Button = ({
  children,
  icon,
  iconPosition = "left", // left | right
  loading = false,
  variant = "primary",
  size = "md",
  width = "w-full", // or "w-auto"
  className = "",
  type = "button",
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={props.disabled || loading}
      className={`
        flex items-center cursor-pointer justify-center gap-2
        rounded-md font-medium transition-all duration-150
        disabled:cursor-not-allowed disabled:opacity-50
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${width}
        ${className}
      `}
      {...props}
    >
      {loading && <Spinner className="w-4 h-4" />}
      {!loading && icon && iconPosition === "left" && (
        <i className={`${icon} text-lg`} />
      )}
      {children}
      {!loading && icon && iconPosition === "right" && (
        <i className={`${icon} text-lg`} />
      )}
    </button>
  );
};
