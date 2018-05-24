import React, { Component } from 'react';
import { Platform, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import Button from '../components/Button';
import Input from '../components/Input';

export default class DetailsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('movie').title,
    headerStyle: {
      backgroundColor: 'steelblue',
      elevation: 0,
      borderBottomWidth: 0,
    },
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons
          name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
          size={30}
          color="white"
          style={{ marginLeft: 10 }}
        />
      </TouchableOpacity>
    ),
    headerRight: (
      <TouchableOpacity
        onPress={() => navigation.navigate('Update', { movie: navigation.getParam('movie') })}
      >
        <FontAwesome name="edit" size={20} color="white" style={{ marginRight: 10 }} />
      </TouchableOpacity>
    ),
    headerTintColor: 'white',
    tabBarIcon: ({ tintColor }) => (
      <MaterialCommunityIcons name="book-open-variant" size={24} color={tintColor} />
    ),
  });

  state = {
    isModalVisible: false,
    rating: '',
    content: '',
  };

  onChangeText = (key, value) => {
    this.setState({ [key]: value });
  };

  toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });

  render() {
    const { navigation } = this.props;
    const movie = navigation.getParam('movie');
    return (
      <View style={styles.container}>
        <View style={styles.movieDetails}>
          <Text>{movie.title}</Text>
          <Text>{movie.genre}</Text>
          <Text>{movie.director}</Text>
          <Text>
            Added by {movie.author} on {movie.createdAt}
          </Text>
        </View>
        {/* <View style={styles.movieReviews}>
          {movie.reviews.map(review => (
            <View>
              <Text>{review.rating}</Text>
              <Text>{review.content}</Text>
              <Text>{review.author}</Text>
              <Text>{review.createdAt}</Text>
            </View>
          ))}
        </View> */}
        <Button
          title="Add Review"
          onPress={this.toggleModal}
          style={{ backgroundColor: 'steelblue' }}
        />
        <Modal
          isVisible={this.state.isModalVisible}
          onSwipe={() => this.setState({ isModalVisible: false })}
          swipeDirection="down"
        >
          <View style={styles.modalContent}>
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.subtitle}>Directed by {movie.director}</Text>
            <View>
              <Text>Rating:</Text>
              <Input
                placeholder="Enter a rating between 1 to 10"
                onChangeText={text => this.onChangeText('rating', text)}
                value={this.state.rating}
              />
            </View>
            <View>
              <Text>Review:</Text>
              <Input
                placeholder="What say you?"
                onChangeText={text => this.onChangeText('content', text)}
                value={this.state.content}
              />
            </View>
            <View>
              <Button
                title="Add Review"
                onPress={() => {}}
                style={{ backgroundColor: 'steelblue' }}
              />
              <Button
                title="Close"
                onPress={this.toggleModal}
                style={{ backgroundColor: 'steelblue' }}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
  },
  movieDetails: {
    alignItems: 'center',
  },
  movieReviews: {
    alignItems: 'center',
  },
  modalContent: {
    height: '75%',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#E9E9EF',
    borderColor: 'steelblue',
    borderWidth: 5,
  },
});

DetailsScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
