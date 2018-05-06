import React from 'react';
import Amplify from 'aws-amplify';
import MainNavigator from './app/routes/MainNavigator';
import config from './app/config/aws-exports';

Amplify.configure(config);

const App = () => <MainNavigator />;

export default App;
