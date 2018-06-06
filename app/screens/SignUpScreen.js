import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { Auth } from 'aws-amplify';
import Button from '../components/Button';
import Input from '../components/Input';

export default class SignUpScreen extends Component {
  static navigationOptions = {
    title: 'Sign Up',
    headerStyle: {
      backgroundColor: '#0F303F',
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
    loading: false,
  };

  onChangeText = (key, value) => {
    this.setState({ [key]: value });
  };

  signUp = async () => {
    this.setState({ loading: true });
    const {
      username, password, email, phone_number,
    } = this.state;
    await Auth.signUp({
      username,
      password,
      attributes: {
        phone_number,
        email,
      },
    })
      .then(() => console.log('User sign up success!!'))
      .catch(err => console.log('Error signing up user: ', err));
    this.setState({ loading: false });
  };

  confirmSignUp = async () => {
    this.setState({ loading: true });
    await Auth.confirmSignUp(this.state.username, this.state.authCode)
      .then(() => {
        this.props.navigation.navigate('App');
        console.log('Confirm user sign up success!!');
      })
      .catch(err => console.log('Error confirming signing up user: ', err));
    this.setState({ loading: false });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>USERNAME:</Text>
        <Input
          placeholder="Bob"
          onChangeText={text => this.onChangeText('username', text)}
          value={this.state.username}
        />
        <Text style={styles.label}>EMAIL:</Text>
        <Input
          placeholder="bob@gmail.com"
          onChangeText={text => this.onChangeText('email', text)}
          value={this.state.email}
        />
        <Text style={styles.label}>PHONE NUMBER:</Text>
        <Input
          placeholder="+61XXXXXXXX"
          onChangeText={text => this.onChangeText('phone_number', text)}
          value={this.state.phone_number}
        />
        <Text style={styles.label}>PASSWORD:</Text>
        <Input
          placeholder="********"
          onChangeText={text => this.onChangeText('password', text)}
          value={this.state.password}
          secureTextEntry
        />
        <Button title="SIGN UP" onPress={this.signUp} style={{ backgroundColor: '#FFC50D' }} />
        <Text style={styles.label}>ENTER SMS PASSCODE HERE:</Text>
        <Input
          placeholder="******"
          onChangeText={text => this.onChangeText('authCode', text)}
          value={this.state.authCode}
        />
        <Button
          title="CONFIRM SIGN UP"
          onPress={this.confirmSignUp}
          style={{ backgroundColor: '#14B0BF' }}
        />
        {this.state.loading && <ActivityIndicator />}
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
  label: {
    alignSelf: 'flex-start',
    paddingLeft: '10%',
    fontWeight: 'bold',
    letterSpacing: 2,
    fontSize: 10,
  },
});

SignUpScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
