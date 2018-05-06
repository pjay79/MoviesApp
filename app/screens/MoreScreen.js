import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
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

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Sign Out"
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});
