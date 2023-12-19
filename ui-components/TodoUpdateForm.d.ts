import * as React from "react";
import {
  GridProps,
  SelectFieldProps,
  SwitchFieldProps,
  TextFieldProps,
} from "@aws-amplify/ui-react";
import { Todo } from "./graphql/types";
export declare type EscapeHatchProps = {
  [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
  [key: string]: string;
};
export declare type Variant = {
  variantValues: VariantValues;
  overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
  hasError: boolean;
  errorMessage?: string;
};
export declare type ValidationFunction<T> = (
  value: T,
  validationResponse: ValidationResponse,
) => ValidationResponse | Promise<ValidationResponse>;
export declare type TodoUpdateFormInputValues = {
  content?: string;
  done?: boolean;
  priority?: string;
  owner?: string;
};
export declare type TodoUpdateFormValidationValues = {
  content?: ValidationFunction<string>;
  done?: ValidationFunction<boolean>;
  priority?: ValidationFunction<string>;
  owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> &
  React.DOMAttributes<HTMLDivElement>;
export declare type TodoUpdateFormOverridesProps = {
  TodoUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
  content?: PrimitiveOverrideProps<TextFieldProps>;
  done?: PrimitiveOverrideProps<SwitchFieldProps>;
  priority?: PrimitiveOverrideProps<SelectFieldProps>;
  owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TodoUpdateFormProps = React.PropsWithChildren<
  {
    overrides?: TodoUpdateFormOverridesProps | undefined | null;
  } & {
    id?: string;
    todo?: Todo;
    onSubmit?: (fields: TodoUpdateFormInputValues) => TodoUpdateFormInputValues;
    onSuccess?: (fields: TodoUpdateFormInputValues) => void;
    onError?: (fields: TodoUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TodoUpdateFormInputValues) => TodoUpdateFormInputValues;
    onValidate?: TodoUpdateFormValidationValues;
  } & React.CSSProperties
>;
export default function TodoUpdateForm(
  props: TodoUpdateFormProps,
): React.ReactElement;
