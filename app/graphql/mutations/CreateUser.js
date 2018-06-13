import gql from 'graphql-tag';

export default gql(`
  mutation createUser(
      $id: ID!,
      $username: String!,
      $createdAt: String!
    ) {
    createUser(input: {
      id: $id, username: $username, createdAt: $createdAt
    }) {
      id
      username
      createdAt
    }
  }
`);
