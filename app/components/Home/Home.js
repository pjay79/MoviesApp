import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import Button from '../Button';
import styles from './styles';

const Home = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.header}>Book App</Text>
    <View>
      <Button
        title="Sign In"
        onPress={() => navigation.navigate('SignIn')}
        style={{ backgroundColor: 'black' }}
      />
      <Button
        title="Sign Up"
        onPress={() => navigation.navigate('SignUp')}
        style={{ backgroundColor: 'lightpink', borderWidth: 1, borderColor: 'white' }}
      />
    </View>
  </View>
);

export default Home;

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
