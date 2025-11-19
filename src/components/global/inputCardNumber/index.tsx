import { cn } from "@/libs/utils";
import { Input } from "antd";
import { HTMLInputTypeAttribute } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface IMyInputCardNumberForm<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute | undefined;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: string;
  size?: "small" | "middle" | "large";
  maxNumber?: number;
  classname?: string
}

const MyInputCardNumberForm = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  required = false,
  disabled = false,
  defaultValue,
  size = "middle",
  maxNumber = 16,
  classname = ""
}: IMyInputCardNumberForm<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className={cn("space-y-1", classname)}>
          {label && (
            <label htmlFor={name} className="flex gap-1">
              <div className="text-base text-gray-900">{label}</div>
              {required && <span className="text-red-500 text-sm">*</span>}
            </label>
          )}
          <div className="">
            <Input
              value={value}
              placeholder={placeholder}
              defaultValue={defaultValue}
              onChange={(e) => {
                let raw = e.target.value.replace(/\D/g, "");
                if (raw.length > maxNumber) raw = raw.slice(0, maxNumber);
                const formatted = raw.match(/.{1,4}/g)?.join(" ") ?? "";
                onChange(formatted);
              }}
              disabled={disabled}
              type={type}
              id={name}
              name={name}
              size={size}
              className="bg-gray-50! border-2! border-gray-200! rounded-lg!"
            />
          </div>
          <div className="text-sm text-red-500 italic">{error?.message}</div>
        </div>
      )}
    />
  );
};

export default MyInputCardNumberForm;
