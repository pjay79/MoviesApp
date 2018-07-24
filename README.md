# MoviesApp

React Native, AWS AppSync, AWS Amplify, AWS Cognito, GraphQL, DynamoDB.
Please note: this is a work still in progress, and many features are not fully developed yet.

**Update 24th July:**

AWS Amplify library can be modularized:
https://github.com/aws-amplify/amplify-js/wiki/Amplify-Modularization

There are some new helpers also available to reduce boilerplate code, see this article for details:
https://medium.com/open-graphql/save-hundreds-of-lines-of-code-in-your-next-graphql-app-with-this-one-weird-trick-3bef9ef0d45a

![screenflow](https://user-images.githubusercontent.com/14052885/41508913-19d8108a-728f-11e8-9c49-7a40f4bb3799.jpeg)

## Screenshots

### iOS

![simulator screen shot - iphone x - 2018-06-18 at 16 00 02](https://user-images.githubusercontent.com/14052885/41520887-3a79dede-7313-11e8-95fa-8706bd85dff4.png)
![simulator screen shot - iphone x - 2018-06-18 at 16 00 44](https://user-images.githubusercontent.com/14052885/41520888-3aaff99c-7313-11e8-8014-713f3d2c62d2.png)
![simulator screen shot - iphone x - 2018-06-18 at 16 05 25](https://user-images.githubusercontent.com/14052885/41520889-3ae482ac-7313-11e8-8995-7983088cc70d.png)
![simulator screen shot - iphone x - 2018-06-18 at 16 06 02](https://user-images.githubusercontent.com/14052885/41520890-3b18997a-7313-11e8-9bc3-34571ee5cdc7.png)
![simulator screen shot - iphone x - 2018-06-18 at 16 06 09](https://user-images.githubusercontent.com/14052885/41520891-3b4dcc62-7313-11e8-878f-e9c3319c7560.png)
![simulator screen shot - iphone x - 2018-06-18 at 16 07 04](https://user-images.githubusercontent.com/14052885/41520892-3b832a6a-7313-11e8-8faa-e03d46f3e56c.png)
![simulator screen shot - iphone x - 2018-06-18 at 16 07 19](https://user-images.githubusercontent.com/14052885/41520893-3bb73fe4-7313-11e8-82b7-1dcf533cbc20.png)
![simulator screen shot - iphone x - 2018-06-18 at 16 07 24](https://user-images.githubusercontent.com/14052885/41520894-3bec8762-7313-11e8-86eb-0b215dc26797.png)
![simulator screen shot - iphone x - 2018-06-18 at 16 08 09](https://user-images.githubusercontent.com/14052885/41520895-3c230d3c-7313-11e8-90c7-04f369c57206.png)
![simulator screen shot - iphone x - 2018-06-18 at 16 08 47](https://user-images.githubusercontent.com/14052885/41520896-3c599eb0-7313-11e8-8cdc-f1442ee31b8c.png)
![simulator screen shot - iphone x - 2018-06-18 at 16 09 44](https://user-images.githubusercontent.com/14052885/41520897-3c915b48-7313-11e8-8018-4c2cf58c80a9.png)
![simulator screen shot - iphone x - 2018-06-18 at 16 09 47](https://user-images.githubusercontent.com/14052885/41520898-3cc73862-7313-11e8-9fd6-b2f827a885fe.png)

## Technology stack:

- aws-amplify
- aws-amplify-react-native
- aws-appsync
- aws-appsync-react
- aws-sdk
- graphql-tag
- lodash
- moment
- prop-types
- react-apollo
- react-native-app-intro-slider
- react-native-elements
- react-native-modal
- react-native-splash-screen
- react-native-vector-icons
- react-navigation
- react-navigation-material-bottom-tabs
- react-navigation-tabs
- uuid

## Installation

### React Native setup:

`brew install node`  
`brew install watchman`  
`npm install -g react-native-cli`

And also install Xcode for iOS simulator + Android Studio / Genymotion for Android simulator. Alternatively connect up a hardware device.

### Project setup:

Clone the repo:
`git clone https://github.com/pjay79/MoviesApp.git`  
Change to the project folder:
`cd MoviesApp`  
Add dependencies:
`npm install` or `yarn`

### Amazon

Sign up to AWS Free Tier:  
https://aws.amazon.com/free/

### AWS Mobile CLI setup

(note: you will be directed to create a new **IAM** user and prompted to enter the **accessKeyId** and **secretAccessKey**, store these in a safe place):

`npm install -g awsmobile-cli`  
`awsmobile configure`  
`awsmobile init` (in the project folder)

![awsmobile2](https://user-images.githubusercontent.com/14052885/41520984-b04a9234-7313-11e8-9d6e-ead22f033725.jpeg)

`awsmobile user-signin enable`  
`awsmobile push`  
`awsmobile console` (opens the aws console in browser)

This project's source directory is 'app'.

### AWS AppSync setup:

In the aws console **Services** section locate **AWS AppSync** and then do the following:

- select **Create API**

![appsync-starter](https://user-images.githubusercontent.com/14052885/41519711-0afcbaf6-730d-11e8-87d8-255a19960345.jpeg)

- enter API name **AWS Movies App** and select authorization type to **Amazon Cognito User Pool**

![appsync-settings](https://user-images.githubusercontent.com/14052885/41507521-184374f2-7277-11e8-9b26-ab5d22a56ba3.jpeg)
![appsync-settings-userpool](https://user-images.githubusercontent.com/14052885/41507522-18768892-7277-11e8-9c6b-355653347db1.jpeg)

- select **Custom Schema**

Paste the following into the Custom Schema box:

```
type Movie {  
    id: ID!  
    title: String!  
    genre: String!  
    director: String!  
    reviews: [Review]  
    likes: Int!  
    author: String!  
    createdAt: String!  
}

type Review {  
    id: ID!  
    movieID: ID!  
    rating: Int!  
    content: String!  
    author: String!  
    createdAt: String!  
}

type Query {  
    fetchMovie(id: ID!): Movie
}

schema {  
    query: Query  
}
```

Select **Save** and then **Create Resources**, then select type **Movie** with table name **MovieTable**. Repeat the same process for type **Review** with table name **ReviewTable**.

![create resources](https://user-images.githubusercontent.com/14052885/41507580-4a4fe6b4-7278-11e8-87c6-6dcfd3df5657.jpeg)

### Update resolvers

Back in the AppSync console, find the Data Type **Movie** and **attach** a resolver to the **reviews** field, it should look like this:

![resolver-reviews](https://user-images.githubusercontent.com/14052885/41519804-977471ea-730d-11e8-8abb-047845e242c9.jpeg)

Back again in the AppSync console, find the Data Type **Query** and modify resolver for the **listReviews** field, it should look like this:

![resolver-query](https://user-images.githubusercontent.com/14052885/41508261-38668d92-7285-11e8-9ba0-d2efd369eb22.jpeg)

### DynamoDB table index:

From your AppSync console:

- select **DataSources**
- select **ReviewTable**
- select **Create index** in DynamoDB
- select primary key **movieID**, and index name **movieID-index**
- set read and write capacity to 1 unit each

![create-index](https://user-images.githubusercontent.com/14052885/41519854-f0a4d624-730d-11e8-89cc-c1b3a1ea5348.jpeg)

![index-table](https://user-images.githubusercontent.com/14052885/41508128-1d491220-7283-11e8-9d08-2f581042fd48.jpeg)

### Add AppSync configuration

Download the React Native AppSync.js file:

![appsync-config](https://user-images.githubusercontent.com/14052885/41519914-43c0cfe8-730e-11e8-9ee8-4a0329ec2b12.jpeg)

Add the contents of this file to **app/aws-appsync.js** as follows:

```
export default {  
    graphqlEndpoint: 'ENTER_ENDPOINT',  
    region: 'ENTER_REGION',  
    authenticationType: 'AMAZON_COGNITO_USER_POOLS',  
    apiKey: 'null',  
};
```

### AWS Cognito

In the aws console **Services** section locate **Cognito** and select **Manage User Pools**. Here you can customise the user and authorisation settings. For this project **MFA** has been set to **OPTIONAL**.

![cognito-page](https://user-images.githubusercontent.com/14052885/41520257-1d1a67b2-7310-11e8-81a4-ae8696976e09.jpeg)

### Launch

Run on ios:
`react-native run-ios`  
Run on android:
`react-native run-android`
