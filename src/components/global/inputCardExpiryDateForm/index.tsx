import { cn } from "@/libs/utils";
import { Input } from "antd";
import { HTMLInputTypeAttribute } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface IMyInputCardExpiryDateForm<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute | undefined;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: string;
  size?: "small" | "middle" | "large";
  classname?: string
}

const MyInputCardExpiryDateForm = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  required = false,
  disabled = false,
  defaultValue,
  size = "middle",
  classname = ""
}: IMyInputCardExpiryDateForm<T>) => {
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
              maxLength={5}
              onChange={(e) => {
                let val = e.target.value.replace(/\D/g, "");
                if (val.length > 4) val = val.slice(0, 4);

                let month = val.slice(0, 2);
                const year = val.slice(2, 4);
                if (Number(month) > 12) month = "12";

                let formatted = month;
                if (year) formatted += "/" + year;

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

export default MyInputCardExpiryDateForm;
