import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet, AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import { Auth } from 'aws-amplify';

class AuthLoadingScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this.checkIntro();
  }

  checkIntro = async () => {
    const value = await AsyncStorage.getItem('@SKIP_INTRO');
    if (value !== null || value === 'true') {
      this.checkUser();
    } else {
      this.props.navigation.navigate('Intro');
    }
  };

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
