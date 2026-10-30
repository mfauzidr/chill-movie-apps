import { useState, type InputHTMLAttributes } from "react";

interface InputFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "id" | "type" | "className"
> {
  id: string;
  label?: string;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  error?: string;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
}

const InputField = ({
  id,
  label,
  type = "text",
  error,
  containerClassName = "",
  labelClassName = "",
  inputClassName = "",
  name,
  ...inputProps
}: InputFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const isFile = type === "file";

  return (
    <div className={`flex w-full flex-col gap-1.5 ${containerClassName}`}>
      {label && (
        <label
          className={`text-xs font-medium leading-[140%] tracking-[0.2px] text-text-light md:text-sm lg:text-base ${labelClassName}`}
          htmlFor={id}
        >
          {label}
        </label>
      )}

      <div className="relative w-full">
        <input
          {...inputProps}
          className={`${isFile ? "text-xs text-greyscale-400 file:mr-3 file:rounded-md file:border-0 file:bg-paper-background file:px-3 file:py-2 file:text-text-light" : "w-full rounded-[18px] border-[0.58px] border-solid border-text-light/23 py-2.5 pl-3 pr-10 text-xs text-greyscale-400 focus:border-text-light/50 focus:outline-none md:px-3.5 md:py-3 md:text-sm lg:px-4 lg:py-3.5 lg:text-base"} ${inputClassName}`}
          type={isPassword && !showPassword ? "password" : type}
          name={name ?? id}
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
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
      {error && (
        <span id={`${id}-error`} className="text-xs text-error">
          {error}
        </span>
      )}
    </div>
  );
};

export default InputField;
