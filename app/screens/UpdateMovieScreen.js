import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { graphql } from 'react-apollo';
import { Auth } from 'aws-amplify';
import moment from 'moment';
import Button from '../components/Button';
import Input from '../components/Input';

import UpdateMovie from '../graphql/mutations/UpdateMovie';
import ListMovies from '../graphql/queries/ListMovies';

class UpdateMovieScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Update Movie',
    headerStyle: {
      backgroundColor: 'steelblue',
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
    createdAt: '',
  };

  componentDidMount() {
    this.getUser();
    this.updateState();
  }

  onChangeText = (key, value) => {
    this.setState({ [key]: value });
  };

  getUser = async () => {
    await Auth.currentUserInfo()
      .then((data) => {
        this.setState({ author: data.username });
      })
      .catch(err => console.log('error: ', err));
  };

  updateState = () => {
    const { navigation } = this.props;
    const movie = navigation.getParam('movie');
    const createdAt = moment().format('MMMM Do YYYY, h:mm:ss a');
    this.setState({
      id: movie.id,
      title: movie.title,
      genre: movie.genre,
      director: movie.director,
      createdAt,
    });
  };

  updateMovie = () => {
    const {
      id, title, genre, director, author, createdAt,
    } = this.state;
    this.props.onUpdate({
      id,
      title,
      genre,
      director,
      author,
      createdAt,
    });
    console.log(`The movie "${title}" has been updated.`);
    this.props.navigation.navigate('All');
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
          style={{ backgroundColor: 'steelblue' }}
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
  },
});

export default graphql(UpdateMovie, {
  props: props => ({
    onUpdate: movie =>
      props.mutate({
        variables: movie,
        optimisticResponse: {
          __typename: 'Mutation',
          updateMovie: { ...movie, __typename: 'Movie' },
        },
      }),
  }),
  options: {
    // refetchQueries: [{ query: ListMovies }],
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
})(UpdateMovieScreen);

UpdateMovieScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
