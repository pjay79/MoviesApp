import gql from 'graphql-tag';

export default gql(`
  query listMovies{
    listMovies {
      items {
        id
        title
        genre
        director
        reviews {
          rating
          content
          createdAt
          author
        }
      }
    }
  }`);
