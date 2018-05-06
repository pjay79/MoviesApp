import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Auth } from 'aws-amplify';

export default class AllMoviesScreen extends Component {
  static navigationOptions = {
    title: 'All Movies',
    headerStyle: {
      backgroundColor: 'steelblue',
    },
    headerTitleStyle: {
      color: 'white',
    },
    headerLeft: null,
  };

  state = {
    username: '',
  };

  componentDidMount() {
    Auth.currentUserInfo()
      .then((data) => {
        this.setState({
          username: data.username,
        });
      })
      .catch(err => console.log('error: ', err));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome {this.state.username}</Text>
        <Text>All movies...</Text>
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
