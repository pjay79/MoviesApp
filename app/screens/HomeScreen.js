import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage, Image } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Button from '../components/Button';

export default class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    SplashScreen.hide();
    AsyncStorage.setItem('@SKIP_INTRO', 'true');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.title}>moviesapp</Text>
          <Image source={require('../assets/images/icon.png')} />
        </View>
        <View style={styles.middle}>
          <Text style={styles.description}>React Native</Text>
          <Text style={styles.description}>Apollo GraphQL</Text>
          <Text style={styles.description}>AWS AppSync & AWS Amplify</Text>
        </View>
        <View style={styles.bottom}>
          <Button
            title="SIGN IN"
            onPress={() => this.props.navigation.navigate('SignIn')}
            style={{ backgroundColor: '#FFC50D' }}
          />
          <Button
            title="SIGN UP"
            onPress={() => this.props.navigation.navigate('SignUp')}
            style={{ backgroundColor: '#14B0BF' }}
          />
        </View>
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
  top: {
    alignItems: 'center',
  },
  middle: {
    alignItems: 'center',
    marginVertical: 30,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 54,
    fontFamily: 'AvenirNext-Bold',
  },
  description: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'AvenirNext-Regular',
  },
});

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
