import gql from 'graphql-tag';

export default gql(`
  mutation createMovie(
      $id: ID!,
      $title: String!,
      $genre: String!,
      $director: String!,
      $author: String!,
      $createdAt: String!
    ) {
    createMovie(input: {
      id: $id, title: $title, genre: $genre, director: $director, author: $author, createdAt: $createdAt
    }) {
      id
      title
      genre
      director
      createdAt
      author
    }
  }
`);
