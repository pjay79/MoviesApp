import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
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
    tabBarIcon: ({ tintColor }) => <Icon name="options" size={24} color={tintColor} />,
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
