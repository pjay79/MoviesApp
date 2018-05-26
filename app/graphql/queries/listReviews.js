import gql from 'graphql-tag';

export default gql(`
  query listReviews($movieID: ID!) {
    listReviews(id: $movieID) {
      items {
         id
         movieID
         rating
         content
         createdAt
         author
       }
     }
   }`);
