import gql from 'graphql-tag';

export default gql`
  subscription NewMovieSubscription {
    onCreateMovie {
      id
      title
      genre
      director
    }
  }
`;
