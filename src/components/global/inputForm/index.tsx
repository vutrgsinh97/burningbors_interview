import { Input } from "antd";
import { HTMLInputTypeAttribute } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface IMyInputForm<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute | undefined;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: string;
  size?: "small" | "middle" | "large";
  inputType?: "base" | "password";
}

const MyInputForm = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  required = false,
  disabled = false,
  defaultValue,
  size = "middle",
  inputType = "base",
}: IMyInputForm<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className="space-y-1">
          {label && (
            <label htmlFor={name} className="flex gap-1">
              <div className="text-base text-gray-900">{label}</div>
              {required && <span className="text-red-500 text-sm">*</span>}
            </label>
          )}
          <div className="">
            {inputType === "base" && (
              <Input
                value={value}
                placeholder={placeholder}
                defaultValue={defaultValue}
                onChange={onChange}
                disabled={disabled}
                type={type}
                id={name}
                name={name}
                size={size}
                className="bg-gray-50! border-2! border-gray-200! rounded-lg!"
              />
            )}
            {inputType === "password" && (
              <Input.Password
                value={value}
                placeholder={placeholder}
                defaultValue={defaultValue}
                onChange={onChange}
                disabled={disabled}
                type={type}
                id={name}
                name={name}
                size={size}
                className="bg-gray-50! border-2! border-gray-200! rounded-lg!"
              />
            )}
          </div>
          <div className="text-sm text-red-500 italic">{error?.message}</div>
        </div>
      )}
    />
  );
};

export default MyInputForm;
