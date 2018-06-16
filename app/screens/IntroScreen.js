import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AppIntroSlider from 'react-native-app-intro-slider';
import Ionicons from 'react-native-vector-icons/Ionicons';

const slides = [
  {
    key: '1',
    title: 'Movies',
    text: 'Searchable database of the best movies.',
    image: require('../assets/images/popcorn.png'),
    imageStyle: { height: 240, width: 240 },
    backgroundColor: '#0F303F',
  },
  {
    key: '2',
    title: 'Reviews',
    text: 'All movies can be rated and reviewed.',
    image: require('../assets/images/tickets.png'),
    imageStyle: { height: 240, width: 240 },
    backgroundColor: '#FFC50D',
  },
  {
    key: '3',
    title: 'Favourites',
    text: 'Create a list of your favourites',
    image: require('../assets/images/3d-glasses.png'),
    imageStyle: { height: 240, width: 240 },
    backgroundColor: '#0F303F',
  },
  {
    key: '4',
    title: 'Users',
    text: 'Connect with other film buffs.',
    image: require('../assets/images/director-chair.png'),
    imageStyle: { height: 240, width: 240 },
    backgroundColor: '#FFC50D',
  },
];

class IntroScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    SplashScreen.hide();
  }

  skipIntro = () => {
    this.props.navigation.navigate('Home');
  };

  renderNextButton = () => (
    <View style={styles.buttonCircle}>
      <Ionicons
        name="md-arrow-round-forward"
        color="rgba(255, 255, 255, .9)"
        size={24}
        style={{ backgroundColor: 'transparent' }}
      />
    </View>
  );

  renderDoneButton = () => (
    <View style={styles.buttonCircle}>
      <Ionicons
        name="md-checkmark"
        color="rgba(255, 255, 255, .9)"
        size={24}
        style={{ backgroundColor: 'transparent' }}
      />
    </View>
  );

  render() {
    return (
      <AppIntroSlider
        slides={slides}
        showSkipButton
        onSkip={this.skipIntro}
        onDone={this.skipIntro}
        renderDoneButton={this.renderDoneButton}
        renderNextButton={this.renderNextButton}
      />
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
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 320,
    height: 320,
  },
});

IntroScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default IntroScreen;
