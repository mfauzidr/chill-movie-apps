interface FormFieldProps {
  id: string
  label: string
  placeholder: string
  type?: 'text' | 'password'
}

const FormField = ({ id, label, placeholder, type = 'text' }: FormFieldProps) => {
  return (
    <div className="flex w-full flex-col gap-1.5">
      <label className="text-xs font-medium leading-[140%] tracking-[0.2px] text-white md:text-sm lg:text-base" htmlFor={id}>{label}</label>
      <input
        className={`w-full rounded-[18px] border-[0.58px] border-solid border-[rgba(231,227,252,0.23)] bg-transparent py-2.5 pl-3 pr-10 text-xs text-[rgba(193,194,196,1)] focus:border-[rgba(231,227,252,0.5)] focus:outline-none md:px-3.5 md:py-3 md:text-sm lg:px-4 lg:py-3.5 lg:text-base ${type === 'password' ? "bg-[url('/assets/icons/eye-off.svg')] bg-size-[16px_16px] bg-position-[right_18px_center] bg-no-repeat" : ''}`}
        type={type}
        name={id}
        id={id}
        placeholder={placeholder}
      />
    </div>
  )
}

export default FormField