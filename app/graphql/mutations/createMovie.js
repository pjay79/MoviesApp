import gql from 'graphql-tag';

export default gql(`
  mutation createMovie(
      $title: String!,
      $genre: String!,
      $director: String!
    ) {
    createMovie(input: {
      title: $title, genre: $genre, director: $director
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
