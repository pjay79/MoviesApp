import gql from 'graphql-tag';

export default gql(`
  query getMovie($movieID:ID!) {
    getMovie(id:$movieID) {
        id
        title
        genre
        director
        createdAt
        author
        reviews {
          id
          rating
          content
          author
          createdAt
        }
    }
}`);
