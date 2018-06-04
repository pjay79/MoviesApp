import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import PropTypes from 'prop-types';
import Button from '../components/Button';

export default class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="SIGN IN"
          onPress={() => this.props.navigation.navigate('SignIn')}
          style={{ backgroundColor: '#FFC50D' }}
        />
        <Button
          title="SIGN UP"
          onPress={() => this.props.navigation.navigate('SignUp')}
          style={{ backgroundColor: '#FFC50D' }}
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
    backgroundColor: '#0F303F',
  },
});

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
