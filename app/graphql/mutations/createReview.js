import gql from 'graphql-tag';

export default gql(`
  mutation createReview(
      $id: ID!,
      $movieID: ID!,
      $rating: Int!,
      $content: String!,
      $author: String!,
      $createdAt: String!
    ) {
    createReview(input: {
      id: $id, movieID: $movieID, rating: $rating, content: $content, author: $author, createdAt: $createdAt
    }) {
      id
      movieID
      rating
      content
      author
      createdAt
    }
  }
`);
