import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
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
  validationResponse: ValidationResponse
) => ValidationResponse | Promise<ValidationResponse>;
export declare type ProfileCreateFormInputValues = {
  userId?: string;
  email?: string;
  avatarUrl?: string;
  balanceInCents?: number;
  name?: string;
  address?: string;
  zipcode?: string;
  city?: string;
  state?: string;
  owner?: string;
  country?: string;
};
export declare type ProfileCreateFormValidationValues = {
  userId?: ValidationFunction<string>;
  email?: ValidationFunction<string>;
  avatarUrl?: ValidationFunction<string>;
  balanceInCents?: ValidationFunction<number>;
  name?: ValidationFunction<string>;
  address?: ValidationFunction<string>;
  zipcode?: ValidationFunction<string>;
  city?: ValidationFunction<string>;
  state?: ValidationFunction<string>;
  owner?: ValidationFunction<string>;
  country?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> &
  React.DOMAttributes<HTMLDivElement>;
export declare type ProfileCreateFormOverridesProps = {
  ProfileCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
  userId?: PrimitiveOverrideProps<TextFieldProps>;
  email?: PrimitiveOverrideProps<TextFieldProps>;
  avatarUrl?: PrimitiveOverrideProps<TextFieldProps>;
  balanceInCents?: PrimitiveOverrideProps<TextFieldProps>;
  name?: PrimitiveOverrideProps<TextFieldProps>;
  address?: PrimitiveOverrideProps<TextFieldProps>;
  zipcode?: PrimitiveOverrideProps<TextFieldProps>;
  city?: PrimitiveOverrideProps<TextFieldProps>;
  state?: PrimitiveOverrideProps<TextFieldProps>;
  owner?: PrimitiveOverrideProps<TextFieldProps>;
  country?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ProfileCreateFormProps = React.PropsWithChildren<
  {
    overrides?: ProfileCreateFormOverridesProps | undefined | null;
  } & {
    clearOnSuccess?: boolean;
    onSubmit?: (
      fields: ProfileCreateFormInputValues
    ) => ProfileCreateFormInputValues;
    onSuccess?: (fields: ProfileCreateFormInputValues) => void;
    onError?: (
      fields: ProfileCreateFormInputValues,
      errorMessage: string
    ) => void;
    onChange?: (
      fields: ProfileCreateFormInputValues
    ) => ProfileCreateFormInputValues;
    onValidate?: ProfileCreateFormValidationValues;
  } & React.CSSProperties
>;
export default function ProfileCreateForm(
  props: ProfileCreateFormProps
): React.ReactElement;
