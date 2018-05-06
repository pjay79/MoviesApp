import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
} from 'react-navigation';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import AllMoviesScreen from '../screens/AllMoviesScreen';
import DetailsScreen from '../screens/DetailsScreen';
import AddMoviesScreen from '../screens/AddMoviesScreen';
import MoreScreen from '../screens/MoreScreen';

const AllMoviesStack = createStackNavigator(
  {
    All: {
      screen: AllMoviesScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
  },
  {
    inititalRouteName: 'All',
  },
);

const AddMoviesStack = createStackNavigator(
  {
    Add: {
      screen: AddMoviesScreen,
    },
  },
  {
    inititalRouteName: 'Add',
  },
);

const MoreStack = createStackNavigator(
  {
    More: {
      screen: MoreScreen,
    },
  },
  {
    inititalRouteName: 'More',
  },
);

const MoviesTabs = createBottomTabNavigator(
  {
    'All Movies': {
      screen: AllMoviesStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name="book-multiple" size={24} color={tintColor} />,
      },
    },
    'Add Movie': {
      screen: AddMoviesStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name="book-plus" size={24} color={tintColor} />,
      },
    },
    More: {
      screen: MoreStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon2 name="options" size={24} color={tintColor} />,
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: 'pink',
      inactiveTintColor: 'white',
      style: {
        backgroundColor: 'steelblue',
      },
    },
  },
);

const AppStack = createStackNavigator(
  {
    Movies: {
      screen: MoviesTabs,
    },
  },
  {
    headerMode: 'none',
  },
);

const AuthStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    SignIn: {
      screen: SignInScreen,
    },
    SignUp: {
      screen: SignUpScreen,
    },
  },
  {
    initialRouteName: 'Home',
  },
);

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);
