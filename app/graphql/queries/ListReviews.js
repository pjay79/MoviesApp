import gql from 'graphql-tag';

export default gql(`
  query listReviews($movieID: ID!) {
    listReviews(movieID: $movieID) {
      items {
         id
         movieID
         rating
         content
         author
         createdAt
       }
     }
   }`);
