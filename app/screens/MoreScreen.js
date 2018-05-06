import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Auth } from 'aws-amplify';
import Button from '../components/Button';

export default class MoreScreen extends Component {
  static navigationOptions = {
    title: 'More',
    headerStyle: {
      backgroundColor: 'steelblue',
    },
    headerTitleStyle: {
      color: 'white',
    },
    headerLeft: null,
  };

  signOut = () => {
    Auth.signOut()
      .then((data) => {
        this.props.navigation.navigate('Auth');
        console.log(data);
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Sign Out" onPress={this.signOut} style={{ backgroundColor: 'steelblue' }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
