import gql from 'graphql-tag';

export default gql(`
  mutation deleteMovie($id:ID!) {
    deleteMovie(input: {id:$id}) {
        id
    }
}`);
