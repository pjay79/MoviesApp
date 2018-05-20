import React, { Component } from 'react';
import { Platform, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BackIcon from 'react-native-vector-icons/Ionicons';

export default class DetailsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Details',
    headerStyle: {
      backgroundColor: 'steelblue',
      elevation: 0,
      borderBottomWidth: 0,
    },
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <BackIcon
          name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
          size={30}
          color="white"
          style={{ marginLeft: 10 }}
        />
      </TouchableOpacity>
    ),
    headerTintColor: 'white',
    tabBarIcon: ({ tintColor }) => <Icon name="book-open-variant" size={24} color={tintColor} />,
  });

  render() {
    const { navigation } = this.props;
    const movie = navigation.getParam('movie', 'NO-ID');
    return (
      <View style={styles.container}>
        <Text>{movie.title}</Text>
        <Text>{movie.genre}</Text>
        <Text>{movie.director}</Text>
        <Text>Added by:</Text>
        <Text>
          {movie.author} on {movie.createdAt}
        </Text>
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

DetailsScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
