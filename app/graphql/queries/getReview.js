import gql from 'graphql-tag';

export default gql(`
  query getReview($id:ID!) {
    getReview(id:$id) {
        id
        movieID
        content
        rating
        createdAt
        author
    }
}`);
