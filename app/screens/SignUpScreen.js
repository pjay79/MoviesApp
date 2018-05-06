import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  };

  updateDetails = (key, value) => {
    this.setState({ [key]: value });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>First Name:</Text>
        <Input
          placeholder="Bob"
          onChangeText={text => this.updateDetails('firstname', text)}
          value={this.state.firstname}
        />
        <Text>Last Name:</Text>
        <Input
          placeholder="Smith"
          onChangeText={text => this.updateDetails('lastname', text)}
          value={this.state.lastname}
        />
        <Text>Email:</Text>
        <Input
          placeholder="bob@gmail.com"
          onChangeText={text => this.updateDetails('email', text)}
          value={this.state.email}
        />
        <Text>Password:</Text>
        <Input
          placeholder="********"
          onChangeText={text => this.updateDetails('password', text)}
          value={this.state.password}
          secureTextEntry
        />
        <Button
          title="Sign Up"
          onPress={() => {
            console.log('Sign Up');
          }}
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
