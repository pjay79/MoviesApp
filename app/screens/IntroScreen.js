import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import PropTypes from 'prop-types';
import SplashScreen from 'react-native-splash-screen';

class IntroScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Intro Screen</Text>
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

// IntroScreen.propTypes = {
//   navigation: PropTypes.shape({
//     navigate: PropTypes.func.isRequired,
//   }).isRequired,
// };

export default IntroScreen;
