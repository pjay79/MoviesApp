import gql from 'graphql-tag';

export default gql(`
  query listMovies{
    listMovies{
      items {
        id
        title
        genre
        director
        author
        createdAt
        reviews {
          id
          rating
          content
          author
          createdAt
        }
      }
    }
  }`);
