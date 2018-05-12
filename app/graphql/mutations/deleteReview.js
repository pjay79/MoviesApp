import gql from 'graphql-tag';

export default gql(`
  mutation deleteReview($id:ID!) {
    deleteReview((input: {id:$id})) {
        id
    }
}`);
