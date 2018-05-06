import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Auth } from 'aws-amplify';
import Button from '../components/Button';
import Input from '../components/Input';

export default class SignInScreen extends Component {
  static navigationOptions = {
    title: 'Sign In',
    headerStyle: {
      backgroundColor: 'steelblue',
      elevation: 0,
      borderBottomWidth: 0,
    },
    headerTintColor: 'white',
  };

  state = {
    username: '',
    password: '',
    authCode: '',
    user: {},
  };

  updateDetails = (key, value) => {
    this.setState({ [key]: value });
  };

  signIn = () => {
    Auth.signIn(this.state.username, this.state.password)
      .then((user) => {
        this.setState({ user });
        console.log(user);
      })
      .catch(err => console.log(err));
  };

  confirmSignIn = () => {
    Auth.confirmSignIn(this.state.user, this.state.authCode, 'SMS_MFA')
      .then((data) => {
        this.props.navigation.navigate('App');
        console.log(data);
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Username:</Text>
        <Input
          placeholder="Bob"
          onChangeText={text => this.updateDetails('username', text)}
          value={this.state.username}
        />
        <Text>Password:</Text>
        <Input
          placeholder="********"
          onChangeText={text => this.updateDetails('password', text)}
          value={this.state.password}
          secureTextEntry
        />
        <Button title="Sign In" onPress={this.signIn} style={{ backgroundColor: 'steelblue' }} />
        <Text>Confirm Sign In:</Text>
        <Input
          placeholder="******"
          onChangeText={text => this.updateDetails('authCode', text)}
          value={this.state.authCode}
          secureTextEntry
        />
        <Button
          title="Sign In"
          onPress={this.confirmSignIn}
          style={{ backgroundColor: 'steelblue' }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

SignInScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
