import { cn } from "@/libs/utils";
import { Radio } from "antd";
import { CheckboxGroupProps } from "antd/es/checkbox";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface IMyRadioForm<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  size?: "small" | "middle" | "large";
  inputType?: "base" | "password";
  classname?: string;
  options: CheckboxGroupProps<string>['options']
}

const MyRadioForm = <T extends FieldValues>({
  control,
  name,
  label,
  required = false,
  disabled = false,
  size = "middle",
  classname = "",
  options
}: IMyRadioForm<T>) => {
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
            <Radio.Group
              block
              options={options}
              defaultValue={value}
              optionType="button"
              buttonStyle="solid"
              onChange={onChange}
              disabled={disabled}
              size={size}
            />
          </div>
          <div className="text-sm text-red-500 italic">{error?.message}</div>
        </div>
      )}
    />
  );
};

export default MyRadioForm;
