import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { Auth } from 'aws-amplify';
import Button from '../components/Button';
import Input from '../components/Input';

export default class SignInScreen extends Component {
  static navigationOptions = {
    title: 'Sign In',
    headerStyle: {
      backgroundColor: '#0F303F',
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
    loading: false,
    error: '',
  };

  onChangeText = (key, value) => {
    this.setState({ [key]: value });
  };

  signIn = async () => {
    this.setState(prevState => ({ loading: !prevState.loading }));
    if (this.state.username && this.state.password) {
      await Auth.signIn(this.state.username, this.state.password)
        .then((user) => {
          this.setState({ user });
          // Skip MFA with this...
          this.props.navigation.navigate('App');
          this.setState(prevState => ({ loading: !prevState.loading }));
          console.log(user);
        })
        .catch((err) => {
          this.setState({ error: err.message });
          this.setState(prevState => ({ loading: !prevState.loading }));
          console.log(err.message);
        });
    } else {
      this.setState(prevState => ({ loading: !prevState.loading }));
      this.setState({ error: 'Complete missing fields.' });
    }
  };

  confirmSignIn = async () => {
    this.setState(prevState => ({ loading: !prevState.loading }));
    if (this.state.authCode) {
      await Auth.confirmSignIn(this.state.user, this.state.authCode, 'SMS_MFA')
        .then((data) => {
          this.props.navigation.navigate('App');
          this.setState(prevState => ({ loading: !prevState.loading }));
          console.log(data);
        })
        .catch((err) => {
          this.setState({ error: err.message });
          this.setState(prevState => ({ loading: !prevState.loading }));
          console.log(err.message);
        });
    } else {
      this.setState(prevState => ({ loading: !prevState.loading }));
      this.setState({ error: 'Passcode is required.' });
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
        <Text style={styles.label}>PASSWORD:</Text>
        <Input
          placeholder="********"
          onChangeText={text => this.onChangeText('password', text)}
          value={this.state.password}
          secureTextEntry
        />
        <Button title="SIGN IN" onPress={this.signIn} style={{ backgroundColor: '#FFC50D' }} />
        <Text style={styles.label}>Enter SMS passcode here:</Text>
        <Input
          placeholder="******"
          onChangeText={text => this.onChangeText('authCode', text)}
          value={this.state.authCode}
          secureTextEntry
        />
        <Button
          title="CONFIRM SIGN IN"
          onPress={this.confirmSignIn}
          style={{ backgroundColor: '#14B0BF' }}
        />
        {this.state.loading && <ActivityIndicator />}
        <Text style={styles.error}>{this.state.error}</Text>
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
});

SignInScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
