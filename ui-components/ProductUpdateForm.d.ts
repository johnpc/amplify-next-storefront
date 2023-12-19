import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Product } from "./graphql/types";
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
export declare type ProductUpdateFormInputValues = {
  title?: string;
  description?: string;
  priceInCents?: number;
  imageUrl?: string;
  owner?: string;
};
export declare type ProductUpdateFormValidationValues = {
  title?: ValidationFunction<string>;
  description?: ValidationFunction<string>;
  priceInCents?: ValidationFunction<number>;
  imageUrl?: ValidationFunction<string>;
  owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> &
  React.DOMAttributes<HTMLDivElement>;
export declare type ProductUpdateFormOverridesProps = {
  ProductUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
  title?: PrimitiveOverrideProps<TextFieldProps>;
  description?: PrimitiveOverrideProps<TextFieldProps>;
  priceInCents?: PrimitiveOverrideProps<TextFieldProps>;
  imageUrl?: PrimitiveOverrideProps<TextFieldProps>;
  owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ProductUpdateFormProps = React.PropsWithChildren<
  {
    overrides?: ProductUpdateFormOverridesProps | undefined | null;
  } & {
    id?: string;
    product?: Product;
    onSubmit?: (
      fields: ProductUpdateFormInputValues,
    ) => ProductUpdateFormInputValues;
    onSuccess?: (fields: ProductUpdateFormInputValues) => void;
    onError?: (
      fields: ProductUpdateFormInputValues,
      errorMessage: string,
    ) => void;
    onChange?: (
      fields: ProductUpdateFormInputValues,
    ) => ProductUpdateFormInputValues;
    onValidate?: ProductUpdateFormValidationValues;
  } & React.CSSProperties
>;
export default function ProductUpdateForm(
  props: ProductUpdateFormProps,
): React.ReactElement;
