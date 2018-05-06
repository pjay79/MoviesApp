import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Auth } from 'aws-amplify';
import Button from '../components/Button';
import Input from '../components/Input';

export default class SignUpScreen extends Component {
  static navigationOptions = {
    title: 'Sign Up',
    headerStyle: {
      backgroundColor: 'steelblue',
      elevation: 0,
      borderBottomWidth: 0,
    },
    headerTintColor: 'white',
  };

  state = {
    username: '',
    email: '',
    phone_number: '',
    password: '',
    authCode: '',
    // user: {},
  };

  updateDetails = (key, value) => {
    this.setState({ [key]: value });
  };

  signUp = () => {
    const {
      username, password, email, phone_number,
    } = this.state;
    Auth.signUp({
      username,
      password,
      attributes: {
        phone_number,
        email,
      },
    })
      .then(() => console.log('User sign up success!!'))
      .catch(err => console.log('Error signing up user: ', err));
  };

  confirmSignUp = () => {
    Auth.confirmSignUp(this.state.username, this.state.authCode)
      .then(() => {
        this.props.navigation.navigate('App');
        console.log('Confirm user sign up success!!');
      })
      .catch(err => console.log('Error confirming signing up user: ', err));
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
        <Text>Email:</Text>
        <Input
          placeholder="bob@gmail.com"
          onChangeText={text => this.updateDetails('email', text)}
          value={this.state.email}
        />
        <Text>Phone number:</Text>
        <Input
          placeholder="+61XXXXXXXX"
          onChangeText={text => this.updateDetails('phone_number', text)}
          value={this.state.phone_number}
        />
        <Text>Password:</Text>
        <Input
          placeholder="********"
          onChangeText={text => this.updateDetails('password', text)}
          value={this.state.password}
          secureTextEntry
        />
        <Button title="Sign Up" onPress={this.signUp} style={{ backgroundColor: 'steelblue' }} />
        <Text>Auth code:</Text>
        <Input
          placeholder="******"
          onChangeText={text => this.updateDetails('authCode', text)}
          value={this.state.authCode}
        />
        <Button
          title="Confirm Sign Up"
          onPress={this.confirmSignUp}
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

SignUpScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
