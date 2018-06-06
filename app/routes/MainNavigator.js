import React from 'react';
import { Platform } from 'react-native';
import PropTypes from 'prop-types';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
} from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

// Screens
import LoadingScreen from '../screens/LoadingScreen';
import IntroScreen from '../screens/IntroScreen';
import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import AllMoviesScreen from '../screens/AllMoviesScreen';
import DetailsScreen from '../screens/DetailsScreen';
import UpdateMovieScreen from '../screens/UpdateMovieScreen';
import AddMoviesScreen from '../screens/AddMoviesScreen';
import MoreScreen from '../screens/MoreScreen';

// Tab bar icons
const AllMoviesIcon = ({ tintColor }) => (
  <MaterialCommunityIcons name="book-multiple" size={20} color={tintColor} />
);
const AddMoviesIcon = ({ tintColor }) => (
  <MaterialCommunityIcons name="book-plus" size={20} color={tintColor} />
);
const MoreIcon = ({ tintColor }) => <SimpleLineIcons name="options" size={20} color={tintColor} />;

const AllMoviesStack = createStackNavigator(
  {
    All: {
      screen: AllMoviesScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
    Update: {
      screen: UpdateMovieScreen,
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

const MoviesTabsAndroid = createMaterialBottomTabNavigator(
  {
    'All Movies': {
      screen: AllMoviesStack,
      navigationOptions: {
        tabBarIcon: AllMoviesIcon,
      },
    },
    'Add Movie': {
      screen: AddMoviesStack,
      navigationOptions: {
        tabBarIcon: AddMoviesIcon,
      },
    },
    More: {
      screen: MoreStack,
      navigationOptions: {
        tabBarIcon: MoreIcon,
      },
    },
  },
  {
    activeTintColor: '#FFC50D',
    inactiveTintColor: 'white',
    barStyle: {
      backgroundColor: '#0F303F',
    },
  },
);

const MoviesTabs = createBottomTabNavigator(
  {
    'All Movies': {
      screen: AllMoviesStack,
      navigationOptions: {
        tabBarIcon: AllMoviesIcon,
      },
    },
    'Add Movie': {
      screen: AddMoviesStack,
      navigationOptions: {
        tabBarIcon: AddMoviesIcon,
      },
    },
    More: {
      screen: MoreStack,
      navigationOptions: {
        tabBarIcon: MoreIcon,
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: '#FFC50D',
      inactiveTintColor: 'white',
      showIcon: true,
      style: {
        backgroundColor: '#0F303F',
      },
    },
  },
);

const AppStack = createStackNavigator(
  {
    Movies: {
      screen: Platform.OS === 'ios' ? MoviesTabs : MoviesTabsAndroid,
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
    Loading: LoadingScreen,
    Intro: IntroScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Loading',
  },
);

AllMoviesIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

AddMoviesIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

MoreIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};
