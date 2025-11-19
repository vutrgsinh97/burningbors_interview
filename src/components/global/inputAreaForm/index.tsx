import { cn } from "@/libs/utils";
import { Input } from "antd";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface IMyInputAreaForm<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: string;
  size?: "small" | "middle" | "large";
  classname?: string;
}

const MyInputAreaForm = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  required = false,
  disabled = false,
  defaultValue,
  size = "middle",
  classname = ""
}: IMyInputAreaForm<T>) => {
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
            <Input.TextArea
              value={value}
              placeholder={placeholder}
              defaultValue={defaultValue}
              onChange={onChange}
              disabled={disabled}
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

export default MyInputAreaForm;
