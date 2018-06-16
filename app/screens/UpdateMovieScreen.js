import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { graphql } from 'react-apollo';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../components/Button';
import Input from '../components/Input';

import UpdateMovie from '../graphql/mutations/UpdateMovie';
import ListMovies from '../graphql/queries/ListMovies';

class UpdateMovieScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Update Movie',
    headerStyle: {
      backgroundColor: '#0F303F',
    },
    headerTitleStyle: {
      color: 'white',
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
  });

  state = {
    id: '',
    title: '',
    genre: '',
    director: '',
    author: '',
    likes: null,
    error: '',
  };

  componentDidMount() {
    this.getMovieDetails();
  }

  onChangeText = (key, value) => {
    this.setState({ [key]: value });
  };

  getMovieDetails = () => {
    const { navigation } = this.props;
    const movie = navigation.getParam('movie');
    const {
      id, title, genre, director, author, likes,
    } = movie;
    this.setState({
      id,
      title,
      genre,
      director,
      author,
      likes,
    });
  };

  updateMovie = () => {
    this.setState({ error: '' });
    const {
      id, title, genre, director, author, likes,
    } = this.state;
    const createdAt = moment().format('MMMM Do YYYY, h:mm:ss a');
    if (title && genre && director) {
      this.props.onUpdate({
        id,
        title,
        genre,
        director,
        author,
        createdAt,
        likes,
      });
      console.log(`The movie "${title}" has been updated.`);
      this.props.navigation.navigate('All');
    } else {
      this.setState({ error: 'Complete missing fields.' });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Title:</Text>
        <Input
          placeholder="Star Wars"
          onChangeText={text => this.onChangeText('title', text)}
          value={this.state.title}
        />
        <Text>Genre</Text>
        <Input
          placeholder="Science Fiction"
          onChangeText={text => this.onChangeText('genre', text)}
          value={this.state.genre}
        />
        <Text>Director:</Text>
        <Input
          placeholder="George Lucas"
          onChangeText={text => this.onChangeText('director', text)}
          value={this.state.director}
        />
        <Button
          title="Update Movie"
          onPress={this.updateMovie}
          style={{ backgroundColor: '#0F303F' }}
        />
        <Text style={styles.error}>{this.state.error}</Text>
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
  error: {
    marginTop: 10,
    paddingHorizontal: '10%',
    color: 'red',
    fontWeight: 'bold',
    letterSpacing: 2,
    fontSize: 12,
  },
});

export default graphql(UpdateMovie, {
  options: {
    update: (proxy, { data: { updateMovie } }) => {
      try {
        const data = proxy.readQuery({ query: ListMovies });
        data.listMovies.items = [
          ...data.listMovies.items.filter(movie => movie.id !== updateMovie.id),
          updateMovie,
        ];
        proxy.writeQuery({ query: ListMovies, data });
      } catch (error) {
        console.log(error);
      }
    },
  },
  props: props => ({
    onUpdate: movie =>
      props.mutate({
        variables: movie,
        optimisticResponse: () => ({
          updateMovie: { ...movie, __typename: 'Movie' },
        }),
      }),
  }),
})(UpdateMovieScreen);

UpdateMovieScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
