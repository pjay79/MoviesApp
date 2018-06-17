# MoviesApp

React Native, AWS AppSync, AWS Amplify, AWS Cognito, GraphQL, DynamoDB

![screenflow](https://user-images.githubusercontent.com/14052885/41508913-19d8108a-728f-11e8-9c49-7a40f4bb3799.jpeg)

## Screenshots

### iOS

### Android

## Technology stack:

* aws-amplify
* aws-amplify-react-native
* aws-appsync
* aws-appsync-react
* aws-sdk
* graphql-tag
* lodash
* moment
* prop-types
* react-apollo
* react-native-app-intro-slider
* react-native-elements
* react-native-modal
* react-native-splash-screen
* react-native-vector-icons
* react-navigation
* react-navigation-material-bottom-tabs
* react-navigation-tabs
* uuid

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
`awsmobile user-signin enable`  
`awsmobile push`  
`awsmobile console` (opens the aws console in browser)

This project's source directory is 'app'.

### AWS AppSync setup:

In the aws console **Services** section locate AWS AppSync and then do the following:

* select **Create API**

![appsync-starter](https://user-images.githubusercontent.com/14052885/41507523-1bef2f2e-7277-11e8-9ca4-3c7e2183de4b.jpeg)

* enter API name **AWS Movies App** and select authorization type to **Amazon Cognito User Pool**

![appsync-settings](https://user-images.githubusercontent.com/14052885/41507521-184374f2-7277-11e8-9b26-ab5d22a56ba3.jpeg)
![appsync-settings-userpool](https://user-images.githubusercontent.com/14052885/41507522-18768892-7277-11e8-9c6b-355653347db1.jpeg)

* select **Custom Schema**

Paste the following into the Custom Schema box:

type Movie {  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id: ID!  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;title: String!  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;genre: String!  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;director: String!  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;reviews: [Review]  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;likes: Int!  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;author: String!  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;createdAt: String!  
}

type Review {  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id: ID!  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;movieID: ID!  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;rating: Int!  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;content: String!  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;author: String!  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;createdAt: String!  
}

type Query {  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fetchMovie(id: ID!): Movie
}

schema {  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;query: Query  
}

Select **Save** and then **Create Resources**, then select type **Movie** with table name **MovieTable**. Repeat the same process for type **Review** with table name **ReviewTable**.

![create resources](https://user-images.githubusercontent.com/14052885/41507580-4a4fe6b4-7278-11e8-87c6-6dcfd3df5657.jpeg)

### Update resolvers

Back in the AppSync console, find the Data Type **Movie** and **attach** a resolver to the **reviews** field, it should look like this:

![resolver-mapping](https://user-images.githubusercontent.com/14052885/41508211-6668d480-7284-11e8-820d-5602cc709165.jpeg)

Back again in the AppSync console, find the Data Type **Query** and modify resolver for the **listReviews** field, it should look like this:

![resolver-query](https://user-images.githubusercontent.com/14052885/41508261-38668d92-7285-11e8-9ba0-d2efd369eb22.jpeg)

### DynamoDB table index:

From your AppSync console:

* select **DataSources**
* select **ReviewTable**
* select **Create index** in DynamoDB
* select primary key **movieID**, and index name **movieID-index**
* set read and write capacity to 1 unit each

![create-index](https://user-images.githubusercontent.com/14052885/41508164-7eee0882-7283-11e8-8217-3386283a99e1.jpeg)

![index-table](https://user-images.githubusercontent.com/14052885/41508128-1d491220-7283-11e8-9d08-2f581042fd48.jpeg)

### Add AppSync configuration

Download the React Native AppSync.js file:

![appsync-config](https://user-images.githubusercontent.com/14052885/41507495-ad8713bc-7276-11e8-9b0f-83b189a10724.jpeg)

Add the contents of this file to **app/aws-appsync.js** as follows:

export default {  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;graphqlEndpoint: 'ENTER_ENDPOINT',  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;region: 'ENTER_REGION',  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;authenticationType: 'AMAZON_COGNITO_USER_POOLS',  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;apiKey: 'null',  
};

### Launch

Run on ios:
`react-native run-ios`  
Run on android:
`react-native run-android`
