import gql from 'graphql-tag';

export default gql(`
  mutation createReview(
      $movieID: String!
      $content: String!,
      $rating: Int!,
    ) {
    createReview(input: {
      movieID: $movieID, content: $content, rating: $rating
    }) {
      id
      movieID
      content
      rating
      createdAt
      author
    }
  }
`);
