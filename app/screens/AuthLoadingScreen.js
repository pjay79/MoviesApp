import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Auth } from 'aws-amplify';
import PropTypes from 'prop-types';

class AuthLoadingScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this.checkUser();
  }

  checkUser = async () => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        this.props.navigation.navigate(user ? 'App' : 'Auth');
        console.log('user: ', user);
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
    backgroundColor: 'steelblue',
  },
});

AuthLoadingScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default AuthLoadingScreen;
