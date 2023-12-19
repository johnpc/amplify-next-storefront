import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Profile } from "./graphql/types";
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
export declare type ProfileUpdateFormInputValues = {
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
export declare type ProfileUpdateFormValidationValues = {
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
export declare type ProfileUpdateFormOverridesProps = {
  ProfileUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
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
export declare type ProfileUpdateFormProps = React.PropsWithChildren<
  {
    overrides?: ProfileUpdateFormOverridesProps | undefined | null;
  } & {
    id?: string;
    profile?: Profile;
    onSubmit?: (
      fields: ProfileUpdateFormInputValues
    ) => ProfileUpdateFormInputValues;
    onSuccess?: (fields: ProfileUpdateFormInputValues) => void;
    onError?: (
      fields: ProfileUpdateFormInputValues,
      errorMessage: string
    ) => void;
    onChange?: (
      fields: ProfileUpdateFormInputValues
    ) => ProfileUpdateFormInputValues;
    onValidate?: ProfileUpdateFormValidationValues;
  } & React.CSSProperties
>;
export default function ProfileUpdateForm(
  props: ProfileUpdateFormProps
): React.ReactElement;
