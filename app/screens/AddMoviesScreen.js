import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Auth } from 'aws-amplify';
import { graphql } from 'react-apollo';
import uuidV4 from 'uuid/v4';
import moment from 'moment';
import Button from '../components/Button';
import Input from '../components/Input';

import CreateMovie from '../graphql/mutations/CreateMovie';
import ListMovies from '../graphql/queries/ListMovies';

class AddMoviesScreen extends Component {
  static navigationOptions = {
    title: 'Add Movie',
    headerStyle: {
      backgroundColor: '#0F303F',
    },
    headerTitleStyle: {
      color: 'white',
    },
    headerLeft: null,
  };

  state = {
    title: '',
    genre: '',
    director: '',
    user: '',
    error: '',
    status: '',
  };

  componentDidMount() {
    this.getUser();
  }

  onChangeText = (key, value) => {
    this.setState({ [key]: value });
  };

  getUser = async () => {
    await Auth.currentUserInfo()
      .then((data) => {
        this.setState({ user: data.username });
      })
      .catch(error => console.log(`Error: ${error.message}`));
  };

  addMovie = () => {
    this.setState({ error: '' });
    const {
      title, genre, director, user,
    } = this.state;
    const id = uuidV4();
    const createdAt = moment().format('MMMM Do YYYY, h:mm:ss a');
    if (title && genre && director) {
      this.props.onAddMovie({
        id,
        title,
        genre,
        director,
        author: user,
        createdAt,
        likes: 0,
      });
      this.setState({
        title: '',
        genre: '',
        director: '',
        status: 'Movie added!',
      });
      setTimeout(() => this.setState({ status: '' }), 1000);
      console.log(`The movie "${title}" has been added.`);
      console.log(`Details - id: ${id}, createdAt: ${createdAt}, by ${user}`);
    } else {
      this.setState({ error: 'Complete missing fields.' });
      setTimeout(() => this.setState({ error: '' }), 1000);
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
        <Button title="Add Movie" onPress={this.addMovie} style={{ backgroundColor: '#0F303F' }} />
        <Text style={this.state.error ? styles.error : styles.status}>
          {this.state.error}
          {this.state.status}
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
  error: {
    marginTop: 10,
    paddingHorizontal: '10%',
    color: 'red',
    fontWeight: 'bold',
    letterSpacing: 2,
    fontSize: 12,
  },
  status: {
    marginTop: 10,
    paddingHorizontal: '10%',
    color: 'green',
    fontWeight: 'bold',
    letterSpacing: 2,
    fontSize: 12,
  },
});

export default graphql(CreateMovie, {
  props: props => ({
    options: {
      update: (proxy, { data: { createMovie } }) => {
        try {
          const data = proxy.readQuery({ query: ListMovies });
          data.listMovies.items = [
            ...data.listMovies.items.filter(movie => movie.id !== createMovie.id),
            createMovie,
          ];
          proxy.writeQuery({ query: ListMovies, data });
        } catch (error) {
          console.log(error);
        }
      },
    },
    onAddMovie: movie =>
      props.mutate({
        variables: movie,
        optimisticResponse: () => ({
          createMovie: {
            ...movie,
            __typename: 'Movie',
            reviews: { __typename: 'ReviewConnection', items: [] },
          },
        }),
      }),
  }),
})(AddMoviesScreen);

AddMoviesScreen.propTypes = {
  onAddMovie: PropTypes.func.isRequired,
};
