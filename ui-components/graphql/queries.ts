/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
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
export const getProfile = /* GraphQL */ `
  query GetProfile($id: ID!) {
    getProfile(id: $id) {
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
export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
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
export const listProducts = /* GraphQL */ `
  query ListProducts(
    $filter: ModelProductFilterInput
    $id: ID
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listProducts(
      filter: $filter
      id: $id
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        createdAt
        description
        id
        imageUrl
        owner
        priceInCents
        profileProductsId
        title
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listProfiles = /* GraphQL */ `
  query ListProfiles(
    $filter: ModelProfileFilterInput
    $id: ID
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listProfiles(
      filter: $filter
      id: $id
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $id: ID
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listTodos(
      filter: $filter
      id: $id
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        content
        createdAt
        done
        id
        owner
        priority
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
