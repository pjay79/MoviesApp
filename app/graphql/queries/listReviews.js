import gql from 'graphql-tag';

export default gql(`
  query listReviews {
    listReviews {
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
