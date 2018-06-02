import React from 'react';
import Amplify, { Auth } from 'aws-amplify';
import AWSAppSyncClient from 'aws-appsync';
import { Rehydrated } from 'aws-appsync-react';
import { AUTH_TYPE } from 'aws-appsync/lib/link/auth-link';
import { ApolloProvider } from 'react-apollo';
import awsConfig from './app/aws-exports';
import appSyncConfig from './app/aws-appsync';
import MainNavigator from './app/routes/MainNavigator';

Amplify.configure(awsConfig);

const appSyncClient = new AWSAppSyncClient({
  url: appSyncConfig.graphqlEndpoint,
  region: appSyncConfig.region,
  auth: {
    type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
    jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken(),
  },
});

const App = () => (
  <ApolloProvider client={appSyncClient}>
    <Rehydrated>
      <MainNavigator />
    </Rehydrated>
  </ApolloProvider>
);

export default App;
