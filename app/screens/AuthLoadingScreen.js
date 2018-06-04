import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import SplashScreen from 'react-native-splash-screen';
import { Auth } from 'aws-amplify';

class AuthLoadingScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this.checkUser();
    SplashScreen.hide();
  }

  checkUser = async () => {
    await Auth.currentAuthenticatedUser()
      .then((user) => {
        this.props.navigation.navigate(user ? 'App' : 'Auth');
        console.log('Cognito: ', user);
      })
      .catch((err) => {
        this.props.navigation.navigate('Auth');
        console.log(err);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F303F',
  },
});

AuthLoadingScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default AuthLoadingScreen;
