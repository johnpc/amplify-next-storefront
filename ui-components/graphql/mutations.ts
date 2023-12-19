/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createProduct = /* GraphQL */ `
  mutation CreateProduct(
    $condition: ModelProductConditionInput
    $input: CreateProductInput!
  ) {
    createProduct(condition: $condition, input: $input) {
      createdAt
      description
      id
      imageUrl
      owner
      priceInCents
      profileProductsId
      seller {
        address
        avatarUrl
        balanceInCents
        city
        country
        createdAt
        email
        id
        name
        owner
        state
        updatedAt
        userId
        zipcode
        __typename
      }
      title
      updatedAt
      __typename
    }
  }
`;
export const createProfile = /* GraphQL */ `
  mutation CreateProfile(
    $condition: ModelProfileConditionInput
    $input: CreateProfileInput!
  ) {
    createProfile(condition: $condition, input: $input) {
      address
      avatarUrl
      balanceInCents
      city
      country
      createdAt
      email
      id
      name
      owner
      products {
        nextToken
        __typename
      }
      state
      updatedAt
      userId
      zipcode
      __typename
    }
  }
`;
export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $condition: ModelTodoConditionInput
    $input: CreateTodoInput!
  ) {
    createTodo(condition: $condition, input: $input) {
      content
      createdAt
      done
      id
      owner
      priority
      updatedAt
      __typename
    }
  }
`;
export const deleteProduct = /* GraphQL */ `
  mutation DeleteProduct(
    $condition: ModelProductConditionInput
    $input: DeleteProductInput!
  ) {
    deleteProduct(condition: $condition, input: $input) {
      createdAt
      description
      id
      imageUrl
      owner
      priceInCents
      profileProductsId
      seller {
        address
        avatarUrl
        balanceInCents
        city
        country
        createdAt
        email
        id
        name
        owner
        state
        updatedAt
        userId
        zipcode
        __typename
      }
      title
      updatedAt
      __typename
    }
  }
`;
export const deleteProfile = /* GraphQL */ `
  mutation DeleteProfile(
    $condition: ModelProfileConditionInput
    $input: DeleteProfileInput!
  ) {
    deleteProfile(condition: $condition, input: $input) {
      address
      avatarUrl
      balanceInCents
      city
      country
      createdAt
      email
      id
      name
      owner
      products {
        nextToken
        __typename
      }
      state
      updatedAt
      userId
      zipcode
      __typename
    }
  }
`;
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $condition: ModelTodoConditionInput
    $input: DeleteTodoInput!
  ) {
    deleteTodo(condition: $condition, input: $input) {
      content
      createdAt
      done
      id
      owner
      priority
      updatedAt
      __typename
    }
  }
`;
export const updateProduct = /* GraphQL */ `
  mutation UpdateProduct(
    $condition: ModelProductConditionInput
    $input: UpdateProductInput!
  ) {
    updateProduct(condition: $condition, input: $input) {
      createdAt
      description
      id
      imageUrl
      owner
      priceInCents
      profileProductsId
      seller {
        address
        avatarUrl
        balanceInCents
        city
        country
        createdAt
        email
        id
        name
        owner
        state
        updatedAt
        userId
        zipcode
        __typename
      }
      title
      updatedAt
      __typename
    }
  }
`;
export const updateProfile = /* GraphQL */ `
  mutation UpdateProfile(
    $condition: ModelProfileConditionInput
    $input: UpdateProfileInput!
  ) {
    updateProfile(condition: $condition, input: $input) {
      address
      avatarUrl
      balanceInCents
      city
      country
      createdAt
      email
      id
      name
      owner
      products {
        nextToken
        __typename
      }
      state
      updatedAt
      userId
      zipcode
      __typename
    }
  }
`;
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $condition: ModelTodoConditionInput
    $input: UpdateTodoInput!
  ) {
    updateTodo(condition: $condition, input: $input) {
      content
      createdAt
      done
      id
      owner
      priority
      updatedAt
      __typename
    }
  }
`;
