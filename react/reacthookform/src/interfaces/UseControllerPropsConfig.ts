import { RegisterOptions, UnpackNestedValue, FieldValues, FieldPath, FieldPathValue } from "react-hook-form";

export declare type UseControllerPropConfigs<TFormModel, TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> = {
    name: keyof TFormModel;
    rules?: Omit<RegisterOptions<TFieldValues, TName>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
    defaultValue?: UnpackNestedValue<FieldPathValue<TFieldValues, TName>>;
    label?: string
  };