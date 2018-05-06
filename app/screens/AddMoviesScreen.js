import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class AddMoviesScreen extends Component {
  static navigationOptions = {
    title: 'Add Movie',
    headerStyle: {
      backgroundColor: 'steelblue',
    },
    headerTitleStyle: {
      color: 'white',
    },
    headerLeft: null,
    tabBarIcon: ({ tintColor }) => <Icon name="book-plus" size={24} color={tintColor} />,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Add movies...</Text>
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
