/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateProduct = /* GraphQL */ `
  subscription OnCreateProduct(
    $filter: ModelSubscriptionProductFilterInput
    $owner: String
  ) {
    onCreateProduct(filter: $filter, owner: $owner) {
      createdAt
      description
      id
      imageKey
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
export const onCreateProfile = /* GraphQL */ `
  subscription OnCreateProfile(
    $filter: ModelSubscriptionProfileFilterInput
    $owner: String
  ) {
    onCreateProfile(filter: $filter, owner: $owner) {
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
export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo(
    $filter: ModelSubscriptionTodoFilterInput
    $owner: String
  ) {
    onCreateTodo(filter: $filter, owner: $owner) {
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
export const onDeleteProduct = /* GraphQL */ `
  subscription OnDeleteProduct(
    $filter: ModelSubscriptionProductFilterInput
    $owner: String
  ) {
    onDeleteProduct(filter: $filter, owner: $owner) {
      createdAt
      description
      id
      imageKey
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
export const onDeleteProfile = /* GraphQL */ `
  subscription OnDeleteProfile(
    $filter: ModelSubscriptionProfileFilterInput
    $owner: String
  ) {
    onDeleteProfile(filter: $filter, owner: $owner) {
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
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo(
    $filter: ModelSubscriptionTodoFilterInput
    $owner: String
  ) {
    onDeleteTodo(filter: $filter, owner: $owner) {
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
export const onUpdateProduct = /* GraphQL */ `
  subscription OnUpdateProduct(
    $filter: ModelSubscriptionProductFilterInput
    $owner: String
  ) {
    onUpdateProduct(filter: $filter, owner: $owner) {
      createdAt
      description
      id
      imageKey
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
export const onUpdateProfile = /* GraphQL */ `
  subscription OnUpdateProfile(
    $filter: ModelSubscriptionProfileFilterInput
    $owner: String
  ) {
    onUpdateProfile(filter: $filter, owner: $owner) {
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
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo(
    $filter: ModelSubscriptionTodoFilterInput
    $owner: String
  ) {
    onUpdateTodo(filter: $filter, owner: $owner) {
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
