import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
    email: '',
    password: '',
  };

  updateDetails = (key, value) => {
    this.setState({ [key]: value });
  };

  render() {
    return (
      <View style={styles.container}>
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
          title="Sign In"
          onPress={() => {
            console.log('Sign In');
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
