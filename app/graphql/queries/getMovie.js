import gql from 'graphql-tag';

export default gql(`
  query getMovie($movieId:ID!) {
    getMovie(id:$movieId) {
        id
        title
        genre
        director
        createdAt
        author
    }
}`);
