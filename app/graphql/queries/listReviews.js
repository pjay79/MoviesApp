import gql from 'graphql-tag';

export default gql(`
  query listReviews($id: ID!) {
    listReviews(movieID: $id) {
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
