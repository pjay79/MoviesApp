import gql from 'graphql-tag';

export default gql(`
  mutation deleteReview($id:ID!) {
    deleteReview(id:$id) {
        id
    }
}`);
