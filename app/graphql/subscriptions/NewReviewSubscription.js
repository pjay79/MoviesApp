import gql from 'graphql-tag';

export default gql`
  subscription NewReviewSubscription {
    onCreateMovie {
      id
      movieID
      rating
      content
    }
  }
`;
