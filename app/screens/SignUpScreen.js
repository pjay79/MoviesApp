import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Auth } from 'aws-amplify';
import Button from '../components/Button';
import Input from '../components/Input';

export default class SignUpScreen extends Component {
  static navigationOptions = {
    title: 'Sign Up',
    headerStyle: {
      backgroundColor: '#0F303F',
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
    error: '',
    status: '',
  };

  onChangeText = (key, value) => {
    this.setState({ [key]: value });
  };

  signUp = async () => {
    this.setState({ loading: true, error: '' });
    const {
      username, password, email, phone_number,
    } = this.state;
    if (username && password && email && phone_number) {
      await Auth.signUp({
        username,
        password,
        attributes: {
          phone_number,
          email,
        },
      })
        .then((data) => {
          this.setState({ loading: false, status: 'User confirmation pending...' });
          console.log(data);
        })
        .catch((error) => {
          this.setState({ loading: false, error: error.message });
        });
    } else {
      this.setState({ loading: false, error: 'Complete missing fields.' });
    }
  };

  confirmSignUp = async () => {
    this.setState({ loading: true, error: '', status: '' });
    const { username, authCode } = this.state;
    if (this.state.authCode) {
      await Auth.confirmSignUp(username, authCode)
        .then(() => {
          this.setState({
            loading: false,
            status: 'Sign up successful!',
            username: '',
            email: '',
            phone_number: '',
            password: '',
            authCode: '',
          });
        })
        .catch((error) => {
          this.setState({ loading: false, error: error.message });
        });
    } else {
      this.setState({ loading: false, error: 'Passcode is required.' });
    }
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
        <Text style={styles.label}>ENTER VERIFICATION CODE HERE:</Text>
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
        <Text style={this.state.error ? styles.error : styles.status}>
          {this.state.error}
          {this.state.status}
        </Text>
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
  error: {
    marginTop: 10,
    paddingHorizontal: '10%',
    color: 'red',
    fontWeight: 'bold',
    letterSpacing: 2,
    fontSize: 12,
  },
  status: {
    marginTop: 10,
    paddingHorizontal: '10%',
    color: 'green',
    fontWeight: 'bold',
    letterSpacing: 2,
    fontSize: 12,
  },
});
