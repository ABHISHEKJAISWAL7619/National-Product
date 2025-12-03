import React from "react";

const ToggleSwitch = ({
  checked,
  onChange,
  size = "md",
  onColor = "bg-black",
  offColor = "bg-gray-200",
  knobColor = "bg-white",
  borderColor = "border-gray-300",
  className = "",
  disabled = false,
  ...props
}) => {
  const sizes = {
    sm: {
      switch: "h-4 w-8",
      knob: "h-3 w-3 start-[1px] top-[1px]",
    },
    md: {
      switch: "h-6 w-11",
      knob: "h-5 w-5 start-[2px] top-[2px]",
    },
    lg: {
      switch: "h-8 w-14",
      knob: "h-7 w-7 start-[2px] top-[2px]",
    },
  };

  const currentSize = sizes[size] || sizes.md;

  return (
    <label
      className={`inline-flex items-center ${
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      } ${className}`}
    >
      <input
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        aria-checked={checked}
        {...props}
      />
      <div
        className={`relative rounded-full transition-colors duration-200 peer-focus:outline-none ${currentSize.switch} ${checked ? onColor : offColor}`}
      >
        <div
          className={`absolute rounded-full transition-all duration-200 content-[''] ${currentSize.knob} ${knobColor} ${borderColor} ${checked ? "translate-x-full" : ""} `}
        />
      </div>
    </label>
  );
};

export default ToggleSwitch;
