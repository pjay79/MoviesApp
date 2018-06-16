import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Auth } from 'aws-amplify';
import Button from '../components/Button';

export default class MoreScreen extends Component {
  static navigationOptions = {
    title: 'More',
    headerStyle: {
      backgroundColor: '#0F303F',
    },
    headerTitleStyle: {
      color: 'white',
    },
    headerLeft: null,
  };

  state = {
    loading: false,
  };

  signOut = async () => {
    this.setState({ loading: true });
    await Auth.signOut()
      .then((data) => {
        this.props.navigation.navigate('Auth');
        console.log(data);
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Sign Out" onPress={this.signOut} style={{ backgroundColor: '#0F303F' }} />
        {this.state.loading && <ActivityIndicator />}
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

MoreScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
