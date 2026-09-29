import { useState } from "react";

interface FormFieldProps {
  id: string;
  label: string;
  placeholder: string;
  type?: "text" | "password";
}

const FormField = ({
  id,
  label,
  placeholder,
  type = "text",
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="flex w-full flex-col gap-1.5">
      <label
        className="text-xs font-medium leading-[140%] tracking-[0.2px] text-text-light md:text-sm lg:text-base"
        htmlFor={id}
      >
        {label}
      </label>

      <div className="relative w-full">
        <input
          className="w-full rounded-[18px] border-[0.58px] border-solid border-text-light/23 bg-transparent py-2.5 pl-3 pr-10 text-xs text-greyscale-400 focus:border-text-light/50 focus:outline-none md:px-3.5 md:py-3 md:text-sm lg:px-4 lg:py-3.5 lg:text-base"
          type={isPassword && !showPassword ? "password" : "text"}
          name={id}
          id={id}
          placeholder={placeholder}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 top-1/2 -translate-y-1/2"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <img
              src={
                showPassword
                  ? "/assets/icons/eye-on.svg"
                  : "/assets/icons/eye-off.svg"
              }
              alt=""
              className="h-4 w-4"
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default FormField;